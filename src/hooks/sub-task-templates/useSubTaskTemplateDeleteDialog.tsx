//Generated by WriteToUsemodeldeletedialog_ts - useModelDeleteDialog.ts
import { SubTaskTemplateDeletePayload } from "@/interfaces/SubTaskTemplateInterfaces";
import { create } from "zustand";

type State = {
  recordsToDelete: string[];
  setRecordsToDelete: (recordsToDelete: string[]) => void;
  isDialogLoading: boolean;
  setIsDialogLoading: (isDialogLoading: boolean) => void;
  mutate?: (payload: SubTaskTemplateDeletePayload) => void;
  setMutate: (mutate: (payload: SubTaskTemplateDeletePayload) => void) => void;
};

// Create your store, which includes both state and (optionally) actions
const useSubTaskTemplateDeleteDialog = create<State>((set) => ({
  recordsToDelete: [],
  setRecordsToDelete: (recordsToDelete) => set({ recordsToDelete }),
  isDialogLoading: false,
  setIsDialogLoading: (isDialogLoading) => set({ isDialogLoading }),
  setMutate: (mutate) => set({ mutate }),
}));

export { useSubTaskTemplateDeleteDialog };
