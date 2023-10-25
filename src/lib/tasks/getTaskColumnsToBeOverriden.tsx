import { Badge } from "@/components/ui/Badge";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { UnknownObject } from "@/interfaces/GeneralInterfaces";
import { ColumnsToBeOverriden } from "@/lib/table-utils";
import { HeaderContext, CellContext } from "@tanstack/react-table";

export const getTaskColumnsToBeOverriden = <TData, TValue>() => {
  return {
    isFinished: {
      header: (header: HeaderContext<TData, TValue>) => (
        <DataTableColumnHeader
          column={header.column}
          title={"Status"}
        />
      ),
      cell: (cell: CellContext<TData, TValue>) => {
        const row = cell.row.original as UnknownObject;
        return (
          <Badge variant={row.isFinished ? "success" : "destructive"}>
            {row.isFinished ? "Finished" : "Unfinished"}
          </Badge>
        );
      },
    },
  } as ColumnsToBeOverriden<TData, TValue>;
};
