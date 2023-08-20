//Generated by WriteToUsemodeldeletedialog_ts - useModelDeleteDialog.ts
import { SubTaskDeletePayload } from "@/interfaces/SubTaskInterfaces";
import { create } from "zustand";

type State = {
  recordsToDelete: string[];
  setRecordsToDelete: (recordsToDelete: string[]) => void;
  isDialogLoading: boolean;
  setIsDialogLoading: (isDialogLoading: boolean) => void;
  mutate?: (payload: SubTaskDeletePayload) => void;
  setMutate: (mutate: (payload: SubTaskDeletePayload) => void) => void;
};

// Create your store, which includes both state and (optionally) actions
const useSubTaskDeleteDialog = create<State>((set) => ({
  recordsToDelete: [],
  setRecordsToDelete: (recordsToDelete) => set({ recordsToDelete }),
  isDialogLoading: false,
  setIsDialogLoading: (isDialogLoading) => set({ isDialogLoading }),
  setMutate: (mutate) => set({ mutate }),
}));

export { useSubTaskDeleteDialog };