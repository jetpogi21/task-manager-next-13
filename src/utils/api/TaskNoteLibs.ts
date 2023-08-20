//Generated by WriteToModellibs_ts - ModelLibs.ts
import { TaskNoteFormikShape } from "@/interfaces/TaskNoteInterfaces";
import { TaskNote } from "@/models/TaskNoteModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createTaskNote = async (
  taskNote: Omit<TaskNoteFormikShape, "touched" | "index" | "id">,
  t: Transaction
) => {
  return await TaskNote.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      note: taskNote.note!,
      taskID: parseInt(taskNote.taskID as string),
      file: taskNote.file!,
    },
    { transaction: t }
  );
};

export const updateTaskNote = async (
  taskNote: Omit<TaskNoteFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<TaskNoteFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await TaskNote.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      note: taskNote.note!,
      taskID: parseInt(taskNote.taskID as string),
      file: taskNote.file!,
    },
    {
      where: { [primaryKey]: primaryKeyValue || taskNote[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteTaskNotes = async (
  primaryKey: keyof Omit<TaskNoteFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await TaskNote.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
