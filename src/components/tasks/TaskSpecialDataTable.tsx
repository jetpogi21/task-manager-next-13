"use client";

import { Table as TTable, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import { TaskModel } from "@/interfaces/TaskInterfaces";

interface DataTableProps<T> {
  table: TTable<T>;
  isLoading: boolean;
}

export function TaskSpecialDataTable<T>(props: DataTableProps<TaskModel>) {
  const { table, isLoading } = props;
  const rowData = table.getRowModel().rows;
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              //@ts-ignore
              const customWidth = header.column.columnDef.meta?.width;
              return (
                <TableHead
                  key={header.id}
                  className={cn({
                    "w-[50px]": ["select", "actions"].includes(header.id),
                  })}
                  style={{
                    width: `${customWidth}px`,
                  }}
                  align={
                    (header.column.columnDef.meta as any)?.alignment || "left"
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell
              colSpan={table.getVisibleFlatColumns().length}
              className="h-24 text-center"
            >
              Fetching data.
            </TableCell>
          </TableRow>
        ) : rowData.length > 0 ? (
          rowData.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(
                !row.original.isFinished &&
                  "dark:bg-rose-800 dark:hover:bg-rose-700 bg-rose-300 hover:bg-rose-400"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  align={(cell.column.columnDef.meta as any)?.alignment}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getVisibleFlatColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
