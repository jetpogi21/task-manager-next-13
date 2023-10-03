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
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import axiosClient from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { FinishTasksPayload, TaskModel } from "@/interfaces/TaskInterfaces";
import { JSONResponse } from "@/interfaces/interface";
import { Dispatch, SetStateAction } from "react";
import { useTaskStore } from "@/hooks/tasks/useTaskStore";
import { convertDateToYYYYMMDD, forceCastToNumber } from "@/utils/utilities";

interface FinishTasksDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function FinishTasksDialog(props: FinishTasksDialogProps) {
  const { open, setOpen } = props;

  const rowSelection = useTaskStore((state) => state.rowSelection);
  const resetRowSelection = useTaskStore((state) => state.resetRowSelection);
  const currentData = useTaskStore((state) => state.currentData);
  const refetchQuery = useTaskStore((state) => state.refetchQuery);
  const page = useTaskStore((state) => state.page);

  const indexes = rowSelection
    ? Object.keys(rowSelection).map((item) => parseInt(item))
    : [];

  //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
  const selectedIds = currentData
    ? currentData
        .filter((_, idx) => indexes.includes(idx))
        .filter((item) => !!item.id)
        .map((item) => forceCastToNumber(item.id))
    : [];

  const finishSelectedTasks = async (payload: FinishTasksPayload) => {
    const { data } = (await axiosClient({
      url: "tasks/finish-tasks",
      method: "post",
      data: payload,
    })) as { data: JSONResponse<undefined> };

    return data;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: finishSelectedTasks,
    onSuccess: (data) => {
      if (data.status === "success") {
        refetchQuery && refetchQuery(page - 1);
      }
    },
    onSettled: () => {
      setOpen(false);
      resetRowSelection();
    },
  });

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setOpen(false)}
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <DialogHeader>
          <DialogTitle>{`Finish Tasks`}</DialogTitle>
          <DialogDescription>
            {`This will mark the selected record${
              finishSelectedTasks.length > 0 && "s"
            } as finished.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            size="sm"
            variant={"destructive"}
            isLoading={isLoading}
            onClick={() => {
              mutate({
                selectedTasks: selectedIds,
                finishDateTime: convertDateToYYYYMMDD(new Date()),
              });
            }}
          >
            Proceed
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={resetRowSelection}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
