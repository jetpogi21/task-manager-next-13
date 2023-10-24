import { create } from "zustand";

interface Dialog {
  message: string;
  setMessage: (message: string) => void;
  title: string;
  setTitle: (title: string) => void;
  open: boolean;
  openDialog: ({
    title,
    message,
    secondaryAction,
    isLoading,
    primaryAction,
  }: {
    title: string;
    message: string;
    secondaryAction?: () => void;
    isLoading?: boolean;
    primaryAction: () => void;
  }) => void;
  closeDialog: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  primaryAction?: () => void;
  setPrimaryAction: (primaryAction: () => void) => void;
  secondaryAction?: () => void;
  setSecondaryAction: (secondaryAction: () => void) => void;
}

const useGlobalDialog = create<Dialog>((set) => ({
  message: "",
  title: "",
  open: false,
  primaryAction: undefined,
  isLoading: false,
  secondaryAction: () => set({ open: false }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  closeDialog: () => set({ open: false }),
  setPrimaryAction: (primaryAction: () => void) => set({ primaryAction }),
  setSecondaryAction: (secondaryAction: () => void) => set({ secondaryAction }),
  setMessage: (message: string) => set({ message }),
  setTitle: (title: string) => set({ title }),
  openDialog({ title, message, secondaryAction, isLoading, primaryAction }) {
    return set({
      open: true,
      title,
      message,
      secondaryAction:
        (secondaryAction as () => void) || (() => set({ open: false })),
      primaryAction,
      isLoading: Boolean(isLoading),
    });
  },
}));

export default useGlobalDialog;
