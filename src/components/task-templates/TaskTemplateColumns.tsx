//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { TaskTemplateModel } from "@/interfaces/TaskTemplateInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
import { Check, X } from "lucide-react";

//Generated by GetModelRowActionsImport - GetModelRowActionsImport
import { TaskTemplateRowActions } from "@/components/task-templates/TaskTemplateRowActions";

export const TaskTemplateColumns: ColumnDef<TaskTemplateModel>[] = [
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
  //Generated by GetAllTableFieldCellInputBySeqModel
  //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      );
    },
    meta: {
      type: "Text",
      label: "Description",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "isSuspended",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Is Suspended"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : //@ts-ignore
      cell.getValue() ? (
        <Check className="w-4 h-4 text-success" />
      ) : (
        <X className="w-4 h-4 text-destructive" />
      );
    },
    meta: {
      type: "Checkbox",
      label: "Is Suspended",
      alignment: "center",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "taskCategoryID",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Task Category"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell
          cell={cell}
          options={cell.table.options.meta?.options?.taskCategoryList || []}
        />
      ) : (
        //@ts-ignore
        cell.row.original.TaskCategory.name
      );
    },
    meta: {
      type: "Select",
      label: "Task Category",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "taskIntervalID",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Task Interval"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell
          cell={cell}
          options={cell.table.options.meta?.options?.taskIntervalList || []}
        />
      ) : (
        //@ts-ignore
        cell.row.original.TaskInterval.name
      );
    },
    meta: {
      type: "Select",
      label: "Task Interval",
    },
    enableSorting: true,
  },
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) => <TaskTemplateRowActions cell={cell} />,
  },
];