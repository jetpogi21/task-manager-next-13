import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";
import { getColumnAlignment } from "@/utils/utilities";
import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

export const createTableColumns = <T,>(
  config: ModelConfig,
  modelColumnHelper: ColumnHelper<T>
): ColumnDef<T, unknown>[] => {
  return config.fields
    .sort(({ fieldOrder: sortA }, { fieldOrder: sortB }) => sortA - sortB)
    .map(
      ({
        fieldName,
        verboseFieldName,
        controlType,
        seqModelFieldID,
        relatedModelID,
        dataType,
        dataTypeInterface,
      }) => {
        const relatedModel = AppConfig.models.find(
          (model) => model.seqModelID === relatedModelID
        );

        //@ts-ignore
        return modelColumnHelper.accessor(fieldName, {
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title={verboseFieldName}
            />
          ),
          cell: (cell) => {
            if (cell.table.options.meta?.editable) {
              let options: BasicModel[] | undefined = [];

              if (relatedModel) {
                const opt = cell.table.options.meta?.options;
                options = opt ? opt[relatedModel.variableName + "List"] : [];
              } else {
                options = [];
              }

              return (
                <EditableTableCell
                  cell={cell}
                  options={options}
                />
              );
            }

            if (relatedModel) {
              //@ts-ignore
              return cell.row.original[relatedModel.modelName].name;
            }

            const cellValue = cell.getValue();

            if (dataType === "BOOLEAN") {
              return cellValue ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-destructive" />
              );
            }

            if (cellValue) {
              if (dataType === "DATEONLY") {
                return format(
                  new Date(cell.getValue() as string),
                  "MM/dd/yyyy, EEE"
                );
              }

              if (dataType === "DATE") {
                return format(
                  new Date(cell.getValue() as string),
                  "M/d/yyyy hh:mm a"
                );
              }
            }

            return cellValue;
          },
          meta: {
            type: controlType,
            label: verboseFieldName,
            alignment: getColumnAlignment(
              dataType,
              relatedModelID,
              dataTypeInterface
            ),
          },
          enableSorting: config.sorts.some(
            (sort) => sort.seqModelFieldID === seqModelFieldID
          ),
        });
      }
    );
};
