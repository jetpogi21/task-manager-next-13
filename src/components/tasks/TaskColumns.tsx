//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { TaskModel } from "@/interfaces/TaskInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
//Generated by GetModelRowActionsImport - GetModelRowActionsImport
import { TaskRowActions } from "@/components/tasks/TaskRowActions";
import TaskSingleColumn from "@/components/tasks/TaskSingleColumn";
import { TaskConfig } from "@/utils/config/TaskConfig";
import { createTableColumns } from "@/lib/table-utils";

const taskColumnHelper = createColumnHelper<TaskModel>();
const config = TaskConfig;

export const TaskColumns: ColumnDef<TaskModel, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const toggleSelectAllRow = table.options.meta?.toggleSelectAllRow;
      return (
        <div className="flex justify-center w-full">
          <Checkbox
            tabIndex={-1}
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={() => {
              toggleSelectAllRow && toggleSelectAllRow();
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row, table }) => {
      const toggleRow = table.options.meta?.toggleRow;
      return (
        <div className="flex justify-center">
          <Checkbox
            tabIndex={-1}
            checked={row.getIsSelected()}
            onCheckedChange={() => {
              toggleRow && toggleRow(row.index);
            }}
            aria-label="Select row"
          />
        </div>
      );
    },
  },
  {
    id: "singleColumn",
    header: () => (
      <div className="flex justify-center w-full">
        {config.pluralizedVerboseModelName}
      </div>
    ),
    cell: (cell) => <TaskSingleColumn cell={cell} />,
  },
  ...createTableColumns<TaskModel>(config, taskColumnHelper),
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) =>
      config.isRowAction ? (
        <TaskRowActions cell={cell} />
      ) : (
        <DeleteRowColumn {...cell} />
      ),
  },
];
