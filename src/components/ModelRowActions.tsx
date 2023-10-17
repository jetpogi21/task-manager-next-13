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
          >
            Delete
          </DropdownMenuItem>
          <Link href={`/${modelConfig.modelPath}/${slug}`}>
            <DropdownMenuItem>
              Edit/View {modelConfig.verboseModelName}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
