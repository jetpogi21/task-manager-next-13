import sequelize from "@/config/db";
import { Task } from "@/models/TaskModel";
import { TaskNote } from "@/models/TaskNoteModel";
import handleSequelizeError from "@/utils/errorHandling";
import { NextResponse } from "next/server";
import path from "path";
import { Op } from "sequelize";
import fs from "fs";

export const POST = async (req: Request) => {
  const t = await sequelize.transaction();

  try {
    await Task.update(
      { finishDateTime: sequelize.fn("NOW") },
      { where: { isFinished: true, finishDateTime: null }, transaction: t }
    );

    await TaskNote.update(
      { file: null },
      { where: { file: "" }, transaction: t }
    );

    const taskNotesWithFiles = await TaskNote.findAll({
      where: {
        file: {
          [Op.ne]: null,
        },
      },
    });

    for (const taskNote of taskNotesWithFiles) {
      let newFile;
      if (taskNote.file!.startsWith("files/")) {
        newFile = taskNote.file!.substring(5);
      } else if (taskNote.file!.startsWith("/")) {
        newFile = taskNote.file!.substring(1);
      }

      if (newFile) {
        await TaskNote.update(
          {
            file: newFile,
          },
          {
            where: {
              id: taskNote.id,
            },
            transaction: t,
          }
        );
      }
    }

    //Start a new transaction
    const taskNotesWithCorrectFiles = await TaskNote.findAll({
      where: {
        file: {
          [Op.ne]: null,
        },
      },
    });

    for (const taskNote of taskNotesWithCorrectFiles) {
      const id = taskNote.id;
      const file = taskNote.file!;
      const filePath = path.join("./public/tmp", file);

      if (!fs.existsSync(filePath)) {
        console.log(`File ${filePath} does not exist.`);
      } else {
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        const fileSize = fileSizeInBytes;

        await TaskNote.update(
          {
            fileName: file,
            fileSize: fileSize,
          },
          {
            where: { id },
            transaction: t,
          }
        );
      }
    }

    t.commit();

    return NextResponse.json({
      status: "success",
    });
  } catch (err) {
    await t.rollback();
    return handleSequelizeError(err);
  }
};
