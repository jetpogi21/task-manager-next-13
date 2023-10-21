import { ModelConfig } from "@/interfaces/ModelConfig";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export const useTableProps = (modelConfig: ModelConfig) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const setRowSelectionByIndex = (idx: number) => {
    setRowSelection((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const resetRowSelection = () => setRowSelection({});
  const setRowSelectionToAll = (idx: number) => {
    const rowSelection: Record<number, boolean> = {};
    for (let index = 0; index < idx; index++) {
      rowSelection[index] = true;
    }
    setRowSelection(rowSelection);
  };

  const [sort, setSort] = useState<string>(modelConfig.sortString);

  const [recordsToDelete, setRecordsToDelete] = useState<string[]>([]);

  return {
    rowSelection,
    setRowSelection,
    setRowSelectionByIndex,
    resetRowSelection,
    setRowSelectionToAll,
    sort,
    setSort,
    recordsToDelete,
    setRecordsToDelete,
  };
};
