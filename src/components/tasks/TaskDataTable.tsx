//Generated by WriteToModeldatatable_tsx - ModelDataTable.tsx
import { TaskColumns } from "@/components/tasks/TaskColumns";
import { TaskDeleteDialog } from "@/components/tasks/TaskDeleteDialog";
import { Button, buttonVariants } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { useImportTaskFromTemplate } from "@/hooks/tasks/useImportTaskFromTemplate";
import { useTaskDeleteDialog } from "@/hooks/tasks/useTaskDeleteDialog";
import { useTaskPageParams } from "@/hooks/tasks/useTaskPageParams";
import { useTaskStore } from "@/hooks/tasks/useTaskStore";
import { useURL } from "@/hooks/useURL";
import {
  TaskModel,
  TaskSearchParams,
  GetTasksResponse,
} from "@/interfaces/TaskInterfaces";
import { cn } from "@/lib/utils";
import {
  DEFAULT_SORT_BY,
  PLURALIZED_MODEL_NAME,
} from "@/utils/constants/TaskConstants";
import { getSorting } from "@/utils/utilities";
import { encodeParams } from "@/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

const TaskDataTable: React.FC = () => {
  const { pathname, router, params: pageParams } = useTaskPageParams();
  const { sort, limit } = pageParams;

  //Local states

  const {
    resetRowSelection,
    rowSelection,
    setRowSelection,
    setRowSelectionToAll,
    page,
    recordCount,
    setPage,
    lastFetchedPage,
    currentData,
    queryResponse,
    setLastFetchedPage,
    refetchQuery,
  } = useTaskStore((state) => ({
    resetRowSelection: state.resetRowSelection,
    rowSelection: state.rowSelection,
    setRowSelection: state.setRowSelection,
    setRowSelectionToAll: state.setRowSelectionToAll,
    page: state.page,
    recordCount: state.recordCount,
    setPage: state.setPage,
    lastFetchedPage: state.lastFetchedPage,
    currentData: state.currentData,
    queryResponse: state.queryResponse,
    setLastFetchedPage: state.setLastFetchedPage,
    refetchQuery: state.refetchQuery,
  }));
  const { setRecordsToDelete } = useTaskDeleteDialog();

  //Page Constants

  //Tanstacks

  const {
    data: taskData,
    isLoading,
    isFetching,
    fetchNextPage,
  } = queryResponse!();

  const {
    mutate: mutateImportTask,
    isLoading: isImportTaskLoading,
    isError: isImportTaskError,
    error: importTaskError,
  } = useImportTaskFromTemplate(() => {
    refetchQuery && refetchQuery(0);
  });

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);
  const dataRowCount = taskData
    ? currentData.length + (page - 1) * parseInt(limit)
    : 0;
  const pageStatus = `Showing ${dataRowCount} of ${recordCount} record(s)`;
  const hasPreviousPage = page > 1;
  const hasNextPage = dataRowCount < recordCount;

  //Client Actions
  const deleteRow = (idx: number) => {
    const id = currentData[idx].id;

    if (id) {
      setRecordsToDelete([id.toString()]);
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = currentData
      .filter((_, idx) => indexes.includes(idx))
      .filter((item) => !!item.id)
      .map((item) => item.id.toString());

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    }
  };

  const toggleRow = (idx: number) => setRowSelection(idx);
  const toggleSelectAllRow = () => {
    if (Object.keys(rowSelection).length === currentData.length) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(currentData.length);
    }
  };

  const goToPreviousPage = () => {
    if (taskData) {
      const newPage = page - 1;
      setPage(newPage);
      resetRowSelection();
    }
  };

  const goToNextPage = () => {
    if (taskData) {
      const newPage = page + 1;

      if (newPage > lastFetchedPage) {
        fetchNextPage();
        setLastFetchedPage(newPage);
      }

      setPage(newPage);
      resetRowSelection();
    }
  };

  const handleSortChange = (sortingState: SortingState) => {
    const sortParams = sortingState
      .map((item) => {
        if (item.desc) {
          return `-${item.id}`;
        } else {
          return `${item.id}`;
        }
      })
      .join(",");

    setPage(1);
    setLastFetchedPage(1);
    resetRowSelection();
    const params = { ...pageParams, sort: sortParams };
    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);
  };

  const taskTable = useReactTable<TaskModel>({
    data: currentData,
    columns: TaskColumns,
    state: {
      sorting: sorting,
      rowSelection,
    },
    //@ts-ignore
    onRowSelectionChange: (state) => setRowSelection(state()),
    //@ts-ignore
    onSortingChange: (state) => handleSortChange(state()), //since the sort state is getting tracked from the url do handle instead
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    enableMultiRowSelection: true,
    initialState: {
      columnVisibility: {
        //Generated by GetAllHiddenColumns
        taskTemplateID: false, //Generated by GetHiddenColumns - GetHiddenColumns
      },
    },
    meta: {
      name: PLURALIZED_MODEL_NAME,
      deleteRow,
      toggleRow,
      toggleSelectAllRow,
      editable: false,
    },
  });

  return (
    <>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            {taskTable.getFilteredSelectedRowModel().rows.length} of{" "}
            {taskTable.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          {hasSelected && (
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              onClick={() => {
                deleteSelectedRows();
              }}
              className="flex items-center justify-center gap-2"
            >
              Delete Selected
              <Trash className="w-4 h-4 text-foreground" />
            </Button>
          )}
          <Link
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "ml-auto"
            )}
            href="/tasks/new"
          >
            Add New
          </Link>
          <Button
            isLoading={isImportTaskLoading}
            variant={"secondary"}
            size="sm"
            onClick={() => {
              mutateImportTask();
            }}
          >
            Add From Templates
          </Button>
        </div>

        <div className="border rounded-md">
          <DataTable
            table={taskTable}
            isLoading={isLoading}
          />
        </div>
        <div className="flex items-center justify-between mt-auto text-sm select-none text-muted-foreground">
          {!isLoading && (
            <div className="flex items-center justify-between w-full gap-4">
              <p className="hidden md:block">{pageStatus}</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={"secondary"}
                  disabled={!hasPreviousPage}
                  onClick={() => goToPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={"secondary"}
                  disabled={!hasNextPage}
                  onClick={() => goToNextPage()}
                  isLoading={isFetching}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <TaskDeleteDialog />
    </>
  );
};

export default TaskDataTable;
