import { ModelRowActions } from "@/components/ModelRowActions";
import { TaskModel } from "@/interfaces/TaskInterfaces";
import { formatISO } from "date-fns";

interface GetTaskRowActionsProps {
  currentData: TaskModel[];
  setCurrentData: (item: TaskModel[]) => void;
  mutate: (payload: any) => void;
}

export const getTaskRowActions = ({
  currentData,
  setCurrentData,
  mutate,
}: GetTaskRowActionsProps): ModelRowActions => {
  const toggleTaskCompletion = (idx: number) => {
    const newCurrentData = [...currentData];
    const task = newCurrentData[idx];

    task.isFinished = !task.isFinished;
    task.finishDateTime = task.isFinished ? formatISO(new Date()) : "";

    setCurrentData(newCurrentData);

    mutate({
      Tasks: [
        {
          id: task.id,
          isFinished: task.isFinished,
          finishDateTime: task.finishDateTime,
        },
      ],
    });
  };

  return {
    "Finish Task": {
      actionFn: toggleTaskCompletion,
      generateActionLabel: (rowData: any) =>
        rowData.isFinished ? "Unfinish Task" : "Finish Task",
    },
  };
};
