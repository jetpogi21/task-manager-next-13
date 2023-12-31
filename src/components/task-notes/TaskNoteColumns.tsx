//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { TaskNoteFormikShape } from "@/interfaces/TaskNoteInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
import { Check, X } from "lucide-react";
import { format } from "date-fns";

export const TaskNoteColumns: ColumnDef<TaskNoteFormikShape>[] = [
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
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Note"
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
      type: "Textarea",
      label: "Note",
    },
    enableSorting: false,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "taskID",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Task ID"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell
          cell={cell}
          options={cell.table.options.meta?.options?.taskList || []}
        />
      ) : (
        //@ts-ignore
        cell.row.original.Task.id?.toString()
      );
    },
    meta: {
      type: "Text",
      label: "Task ID",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "file",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="File"
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
      type: "LocalFileInput",
      label: "File",
      width: 300,
    },
    enableSorting: true,
  },
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) => <DeleteRowColumn {...cell} />,
  },
];
