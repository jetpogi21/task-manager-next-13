import sequelize from "@/config/db";
import { FinishTasksPayload } from "@/interfaces/TaskInterfaces";
import { JSONResponse } from "@/interfaces/interface";
import { Task } from "@/models/TaskModel";
import handleSequelizeError from "@/utils/errorHandling";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export const POST = async (req: Request) => {
  const body = (await req.json()) as FinishTasksPayload;
  const { selectedTasks, finishDateTime } = body;

  let jsonResponse: JSONResponse<undefined> = {
    status: "success",
  };

  // Validate finishDateTime
  if (isNaN(Date.parse(finishDateTime))) {
    jsonResponse = {
      status: "error",
      error: "Invalid finishDateTime. Please provide a valid date.",
      errorCode: 400,
    };
    return NextResponse.json(jsonResponse);
  }

  if (selectedTasks.length > 0) {
    const t = await sequelize.transaction();

    await Task.update(
      { isFinished: true, finishDateTime: finishDateTime },
      {
        where: {
          id: {
            [Op.in]: selectedTasks,
          },
        },
        transaction: t,
      }
    );

    try {
      t.commit();
      return NextResponse.json(jsonResponse);
    } catch (error) {
      t.rollback();
      return handleSequelizeError(error);
    }
  }
};
