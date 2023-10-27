import { ModelRowActions } from "@/components/ModelRowActions";
import { formatISO } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";

interface GetTaskRowActionsProps<T> {
  currentData: T[];
  setCurrentData: (item: T[]) => void;
  mutate: (payload: any) => void;
}

const toggleTask = <T,>(
  indexes: number[],
  currentData: T[],
  isFinished: boolean,
  setCurrentData: (item: T[]) => void,
  mutate: (payload: any) => void
) => {
  const newCurrentData = [...currentData];
  const payload: Record<string, unknown>[] = [];

  for (const idx of indexes) {
    const task = newCurrentData[idx] as any;
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

export const getTaskRowActions = <T,>({
  currentData,
  setCurrentData,
  mutate,
}: GetTaskRowActionsProps<T>): ModelRowActions => {
  return {
    "Finish Task": {
      rowCondition: (rowData: any) => !rowData.isFinished,
      multiSelectCondition: (indexes: number[]) =>
        //@ts-ignore
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
        //@ts-ignore
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
