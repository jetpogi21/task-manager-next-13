import { Badge } from "@/components/ui/Badge";
import { TaskModel } from "@/interfaces/TaskInterfaces";
import { convertStringToDate } from "@/utils/utilities";
import { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { FC } from "react";

interface TaskSingleColumnProps {
  cell: CellContext<TaskModel, unknown>;
}

const TaskSingleColumn: FC<TaskSingleColumnProps> = ({ cell }) => {
  const task = cell.row.original;
  return (
    <div className="flex flex-col gap-2">
      <div>{task.description}</div>
      <div className="flex flex-wrap gap-2">
        <Badge className="whitespace-nowrap">{task.TaskCategory.name}</Badge>
        <Badge className="whitespace-nowrap">{task.TaskInterval.name}</Badge>
        <Badge variant={task.isFinished ? "success" : "destructive"}>
          {task.isFinished ? "Finished" : "Pending"}
        </Badge>
      </div>
      <div className="text-sm text-slate-300">
        {format(convertStringToDate(task.date), "PPPP")}
      </div>
    </div>
  );
};

export default TaskSingleColumn;
