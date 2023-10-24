import { ModelRowActions } from "@/components/ModelRowActions";
import { TaskModel } from "@/interfaces/TaskInterfaces";
import { formatISO } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";

interface GetTaskRowActionsProps {
  currentData: TaskModel[];
  setCurrentData: (item: TaskModel[]) => void;
  mutate: (payload: any) => void;
}

const toggleTask = (
  indexes: number[],
  currentData: TaskModel[],
  isFinished: boolean,
  setCurrentData: (item: TaskModel[]) => void,
  mutate: (payload: any) => void
) => {
  const newCurrentData = [...currentData];
  const payload: Record<string, unknown>[] = [];

  for (const idx of indexes) {
    const task = newCurrentData[idx];
    task.isFinished = isFinished;
    task.finishDateTime = isFinished ? formatISO(new Date()) : "";

    payload.push({
      id: task.id,
      isFinished: task.isFinished,
      finishDateTime: task.finishDateTime,
    });
  }

  setCurrentData(newCurrentData);
  mutate({ Tasks: payload });
};

export const getTaskRowActions = ({
  currentData,
  setCurrentData,
  mutate,
}: GetTaskRowActionsProps): ModelRowActions => {
  return {
    "Finish Task": {
      rowCondition: (rowData: any) => !rowData.isFinished,
      multiSelectCondition: (indexes: number[]) =>
        indexes.some((value) => !currentData[value].isFinished),
      actionFn: (indexes: number[]) =>
        toggleTask(indexes, currentData, true, setCurrentData, mutate),
      /* generateActionLabel: (rowData: any) =>
        rowData.isFinished ? "Unfinish Task" : "Finish Task", */
      generateTexts: (indexes: number[]) => {
        return {
          buttonText: `Finish Task${indexes.length > 1 ? "s" : ""}`,
          dialogTitle: `Finish Task${indexes.length > 1 ? "s" : ""}`,
          dialogMessage: `Finish the selected task${
            indexes.length > 1 ? "s" : ""
          }?`,
        };
      },
      ButtonIcon: CheckCircle,
    },
    "Unfinish Task": {
      rowCondition: (rowData: any) => rowData.isFinished,
      multiSelectCondition: (indexes: number[]) =>
        indexes.some((value) => currentData[value].isFinished),
      actionFn: (indexes: number[]) =>
        toggleTask(indexes, currentData, false, setCurrentData, mutate),
      generateTexts: (indexes: number[]) => {
        return {
          buttonText: `Unfinish Task${indexes.length > 1 ? "s" : ""}`,
          dialogTitle: `Unfinish Task${indexes.length > 1 ? "s" : ""}`,
          dialogMessage: `Unfinish the selected task${
            indexes.length > 1 ? "s" : ""
          }?`,
        };
      },
      ButtonIcon: XCircle,
    },
  };
};
