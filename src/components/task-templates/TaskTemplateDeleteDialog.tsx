//Generated by WriteToModeldeletedialog_tsx - ModelDeleteDialog.tsx
"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useTaskTemplateDeleteDialog } from "@/hooks/task-templates/useTaskTemplateDeleteDialog";
import {
  PLURALIZED_VERBOSE_MODEL_NAME,
  VERBOSE_MODEL_NAME,
} from "@/utils/constants/TaskTemplateConstants";
import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { TaskTemplateDeletePayload } from "@/interfaces/TaskTemplateInterfaces";
import axiosClient from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useTaskTemplateStore } from "@/hooks/task-templates/useTaskTemplateStore";

interface TaskTemplateDeleteDialogProps {
  onSuccess?: () => void;
  formik?: any;
}

export function TaskTemplateDeleteDialog(props: TaskTemplateDeleteDialogProps) {
  const [mounted, setMounted] = useState(false);

  const [
    isDialogLoading,
    recordsToDelete,
    setRecordsToDelete,
    setIsDialogLoading,
  ] = useTaskTemplateDeleteDialog((state) => [
    state.isDialogLoading,
    state.recordsToDelete,
    state.setRecordsToDelete,
    state.setIsDialogLoading,
  ]);

  const { fetchCount, setFetchCount } = useTaskTemplateStore((state) => ({
    fetchCount: state.fetchCount,
    setFetchCount: state.setFetchCount,
  }));

  const { page, setPage } = useTaskTemplateStore((state) => ({
    page: state.page,
    setPage: state.setPage,
  }));

  const queryResponse = useTaskTemplateStore((state) => state.queryResponse);
  const refetchQuery = useTaskTemplateStore((state) => state.refetchQuery);
  const { recordCount, setRecordCount } = useTaskTemplateStore((state) => ({
    recordCount: state.recordCount,
    setRecordCount: state.setRecordCount,
  }));

  const [currentData, resetRowSelection, setCurrentData] = useTaskTemplateStore(
    (state) => [
      state.currentData,
      state.resetRowSelection,
      state.setCurrentData,
    ]
  );

  const deleteTaskTemplates = async (payload: TaskTemplateDeletePayload) => {
    const { data } = (await axiosClient({
      url: "task-templates",
      method: "delete",
      data: payload,
    })) as { data: { recordsDeleted: number } };

    return data;
  };

  const { mutate } = useMutation({
    mutationFn: deleteTaskTemplates,
    onMutate: () => {
      setIsDialogLoading(true);
    },
    onSuccess: () => {
      setRecordCount(
        recordCount -
          currentData.filter((item) =>
            recordsToDelete.includes(item.id.toString())
          ).length
      );
      resetRowSelection();
      refetchQuery && refetchQuery(page - 1);
      props.onSuccess && props.onSuccess();
    },
    onSettled: () => {
      setRecordsToDelete([]);
      setIsDialogLoading(false);
      resetRowSelection();
    },
  });

  //state transformation
  const open = recordsToDelete.length > 0;
  const s = recordsToDelete.length > 1 ? "s" : "";
  const caption =
    recordsToDelete.length > 1
      ? PLURALIZED_VERBOSE_MODEL_NAME
      : VERBOSE_MODEL_NAME;

  const mutateTaskTemplate = () => {
    mutate && mutate({ deletedTaskTemplates: recordsToDelete });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => setRecordsToDelete([])}
            disabled={isDialogLoading}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <DialogHeader>
            <DialogTitle>{`Delete ${caption}`}</DialogTitle>
            <DialogDescription>
              {`This will permanently delete the selected record${s}.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              size="sm"
              variant={"destructive"}
              isLoading={isDialogLoading}
              onClick={() => {
                mutateTaskTemplate();
              }}
            >
              Proceed
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setRecordsToDelete([]);
              }}
              disabled={isDialogLoading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
