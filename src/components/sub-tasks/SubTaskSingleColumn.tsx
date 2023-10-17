//Generated by WriteToModelsinglecolumn_tsx - ModelSingleColumn.tsx
import { Badge } from "@/components/ui/Badge";
import { SubTaskFormikShape } from "@/interfaces/SubTaskInterfaces";
import { CellContext } from "@tanstack/react-table";
import React, { FC } from "react";

interface SubTaskSingleColumnProps {
  cell: CellContext<SubTaskFormikShape, unknown>;
}

const SubTaskSingleColumn: FC<SubTaskSingleColumnProps> = ({ cell }) => {
  const subTask = cell.row.original;
  return (
    <div className="flex flex-col gap-2">
         To continue edit this page
    </div>
  );
};

export default SubTaskSingleColumn;
