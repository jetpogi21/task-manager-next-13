//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { SubTaskFormikShape } from "@/interfaces/SubTaskInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
import SubTaskSingleColumn from "@/components/sub-tasks/SubTaskSingleColumn";
import { SubTaskConfig } from "@/utils/config/SubTaskConfig";
import { createTableColumns } from "@/lib/table-utils";
import { SubTaskRowActions } from "@/components/sub-tasks/SubTaskRowActions";

const subTaskColumnHelper = createColumnHelper<SubTaskFormikShape>();
const config = SubTaskConfig;

export const SubTaskColumns: ColumnDef<SubTaskFormikShape, unknown>[] = [
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
    cell: (cell) => <SubTaskSingleColumn cell={cell} />,
  },
  ...createTableColumns<SubTaskFormikShape>(config, subTaskColumnHelper),
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) =>
      config.isRowAction ? (
        <SubTaskRowActions cell={cell} />
      ) : (
        <DeleteRowColumn {...cell} />
      ),
  },
];
