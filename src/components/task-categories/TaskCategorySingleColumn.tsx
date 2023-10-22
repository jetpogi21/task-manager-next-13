//Generated by WriteToModelsinglecolumn_tsx - ModelSingleColumn.tsx
import { Badge } from "@/components/ui/Badge";
import { TaskCategoryFormikShape } from "@/interfaces/TaskCategoryInterfaces";
import { CellContext } from "@tanstack/react-table";
import React, { FC } from "react";

interface TaskCategorySingleColumnProps {
  cell: CellContext<TaskCategoryFormikShape, unknown>;
}

const TaskCategorySingleColumn: FC<TaskCategorySingleColumnProps> = ({
  cell,
}) => {
  const taskCategory = cell.row.original;
  return <div className="flex flex-col gap-2">To continue edit this page</div>;
};

export default TaskCategorySingleColumn;
