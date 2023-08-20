//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { SubTaskTemplateFormikShape } from "@/interfaces/SubTaskTemplateInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
import { Check, X } from "lucide-react";

export const SubTaskTemplateColumns: ColumnDef<SubTaskTemplateFormikShape>[] = [
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
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Priority"
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
      type: "Decimal",
      label: "Priority",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "taskTemplateID",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Task Template ID"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell
          cell={cell}
          options={cell.table.options.meta?.options?.taskTemplateList || []}
        />
      ) : (
        //@ts-ignore
        cell.row.original.TaskTemplate.id.toString()
      );
    },
    meta: {
      type: "WholeNumber",
      label: "Task Template ID",
    },
    enableSorting: true,
  },
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) => <DeleteRowColumn {...cell} />,
  },
];
