"use client";

import { CellContext } from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { findModelPrimaryKeyField } from "@/utils/utilities";

interface ModelRowActionsProps<TData, TValue> {
  cell: CellContext<TData, TValue>;
  modelConfig: ModelConfig;
}

type RowActionFunction = (idx: number) => void;
type GetActionLabelFunction = (rowData: any) => string;
interface ModelRowAction {
  actionFn: RowActionFunction;
  generateActionLabel?: GetActionLabelFunction;
}

export interface ModelRowActions {
  [key: string]: ModelRowAction;
}

export function ModelRowActions<TData, TValue>({
  cell,
  modelConfig,
}: ModelRowActionsProps<TData, TValue>) {
  const primaryKeyField = findModelPrimaryKeyField(modelConfig).fieldName;
  //local state
  const [open, setOpen] = useState(false);

  //Variables from cell
  const rowData = cell.row.original;

  const id = rowData[primaryKeyField as keyof TData] as string;
  const slug = modelConfig.slugField
    ? rowData[modelConfig.slugField as keyof TData]
    : id;

  const index = cell.row.index;

  //Variables from table meta
  const deleteRow = cell.table.options.meta?.deleteRow;

  const rowActions = cell.table.options.meta?.rowActions as
    | ModelRowActions
    | undefined;

  //Transformations
  const isHidden = !Boolean(id);

  return (
    !isHidden && (
      <DropdownMenu open={open}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-8 h-8 p-0"
            type="button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[160px]"
          onPointerDownOutside={() => {
            setOpen(false);
          }}
        >
          <DropdownMenuItem
            onSelect={() => {
              setOpen(false);
              deleteRow && deleteRow(index);
            }}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
          <Link href={`/${modelConfig.modelPath}/${slug}`}>
            <DropdownMenuItem className="cursor-pointer">
              Edit/View {modelConfig.verboseModelName}
            </DropdownMenuItem>
          </Link>
          {rowActions
            ? Object.keys(rowActions).map((key) => {
                const generateActionLabel = rowActions[key].generateActionLabel;
                return (
                  <DropdownMenuItem
                    key={key}
                    onSelect={() => {
                      setOpen(false);
                      rowActions[key].actionFn(index);
                    }}
                    className="cursor-pointer"
                  >
                    {generateActionLabel ? generateActionLabel(rowData) : key}
                  </DropdownMenuItem>
                );
              })
            : null}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
