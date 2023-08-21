//Generated by WriteToLeftModelSubform_tsx - LeftModelSubform.tsx
"use client";
import { TaskNoteColumns } from "@/components/task-notes/TaskNoteColumns";
import { TaskNoteDeleteDialog } from "@/components/task-notes/TaskNoteDeleteDialog";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { useTaskNoteDeleteDialog } from "@/hooks/task-notes/useTaskNoteDeleteDialog";
import { useTaskNoteStore } from "@/hooks/task-notes/useTaskNoteStore";
import { TaskFormFormikInitialValues } from "@/interfaces/TaskInterfaces";
import { TaskNoteFormikShape } from "@/interfaces/TaskNoteInterfaces";
import { cn } from "@/lib/utils";
import {
  COLUMNS,
  DEFAULT_FORM_VALUE,
  FIRST_FIELD_IN_FORM,
  PLURALIZED_MODEL_NAME,
} from "@/utils/constants/TaskNoteConstants";
import { sortData } from "@/utils/sort";
import { getSorting } from "@/utils/utilities";
import { removeItemsByIndexes } from "@/utils/utils";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { FormikProps } from "formik";
import { ChevronLast, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTaskStore } from "@/hooks/tasks/useTaskStore";

interface TaskNoteSubformProps {
  formik: FormikProps<TaskFormFormikInitialValues>;
}

const TaskNoteSubform: React.FC<TaskNoteSubformProps> = ({ formik }) => {
  //URL States
  //Local states
  const [willFocus, setWillFocus] = useState(false);
  const ref: React.RefObject<HTMLElement> = useRef(null); //to be attached to the last row in form, first control in that row

  const {
    resetRowSelection,
    rowSelection,
    setRowSelection,
    setRowSelectionToAll,
    sort,
    setSort,
    setCurrentData,
  } = useTaskNoteStore((state) => ({
    resetRowSelection: state.resetRowSelection,
    rowSelection: state.rowSelection,
    setRowSelection: state.setRowSelection,
    setRowSelectionToAll: state.setRowSelectionToAll,
    sort: state.sort,
    setSort: state.setSort,
    setCurrentData: state.setCurrentData,
  }));
  const { setRecordsToDelete } = useTaskNoteDeleteDialog();

  //Zustand
  const { setHasUpdate } = useTaskStore((state) => ({
    setHasUpdate: state.setHasUpdate,
  }));

  //Tanstack queries

  //Page Constants
  const DEFAULT_TASKNOTE = DEFAULT_FORM_VALUE;

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);
  const dataRowCount = formik.values.TaskNotes.filter((item) => item.id).length;
  const pageStatus = `Showing ${dataRowCount} of ${dataRowCount} record(s)`;

  //Utility Functions

  //Client Actions
  const focusOnRef = () => {
    ref && ref.current?.focus();
  };

  const addRow = () => {
    formik.setFieldValue(`TaskNotes`, [
      ...formik.values.TaskNotes.map((item) => ({ ...item })),
      { ...DEFAULT_TASKNOTE, taskID: formik.values.id },
    ]);
    setWillFocus(true);
  };

  const setTouchedRows = (idx: number) => {
    formik.setFieldValue(`TaskNotes[${idx}].touched`, true);
  };

  const deleteRow = (idx: number) => {
    const id = formik.values.TaskNotes[idx].id;

    if (id) {
      setRecordsToDelete([id.toString()]);
    } else {
      formik.setFieldValue(`TaskNotes`, [
        ...formik.values.TaskNotes.slice(0, idx),
        ...formik.values.TaskNotes.slice(idx + 1),
      ]);
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = formik.values.TaskNotes.filter((_, idx) =>
      indexes.includes(idx)
    )
      .filter((item) => !!item.id)
      .map((item) => item.id.toString());

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    } else {
      formik.setFieldValue(
        `TaskNotes`,
        removeItemsByIndexes(formik.values.TaskNotes, indexes)
      );
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const toggleRow = (idx: number) => setRowSelection(idx);
  const toggleSelectAllRow = () => {
    if (Object.keys(rowSelection).length === formik.values.TaskNotes.length) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(formik.values.TaskNotes.length);
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

    setSort(sortParams);

    formik.setFieldValue(
      "TaskNotes",
      formik.values.TaskNotes.filter((item) => item.id).sort((a, b) => {
        const desc = sortParams.includes("-");
        const field = desc ? sortParams.substring(1) : sortParams;

        return sortData(a, b, desc, field, COLUMNS);
      })
    );
    resetRowSelection();
  };

  const taskNoteTable = useReactTable<TaskNoteFormikShape>({
    data: formik.values.TaskNotes,
    columns: TaskNoteColumns,
    state: {
      sorting: sorting,
      rowSelection,
    },
    //@ts-ignore
    onRowSelectionChange: (state) => setRowSelection(state()),
    //@ts-ignore
    onSortingChange: (state) => handleSortChange(state()), //since the sort state is getting tracked from the url do handle instead
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: true,
    initialState: {
      columnVisibility: {
        taskID: false,
      },
    },
    meta: {
      name: PLURALIZED_MODEL_NAME,
      setHasUpdate: () => setHasUpdate(true),
      setTouchedRows,
      addRow,
      deleteRow,
      toggleRow,
      toggleSelectAllRow,
      firstFieldInForm: FIRST_FIELD_IN_FORM,
      lastFieldInForm: "file",
      forwardedRef: ref,
      editable: true,
      options: {},
    },
  });

  //useEffects here
  useEffect(() => {
    setCurrentData(formik.values.TaskNotes);
    if (willFocus) {
      focusOnRef();
    }
  }, [formik.values.TaskNotes]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">Task Notes</h3>
      <div className="flex items-center gap-4">
        <div className="text-sm">
          {taskNoteTable.getFilteredSelectedRowModel().rows.length} of{" "}
          {taskNoteTable.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {hasSelected && (
          <Button
            type="button"
            size={"sm"}
            variant={"destructive"}
            onClick={() => {
              deleteSelectedRows();
            }}
          >
            Delete Selected
          </Button>
        )}
        <Button
          className="ml-auto"
          variant={"secondary"}
          type="button"
          size="sm"
          onClick={focusOnRef}
        >
          <ChevronLast className="w-4 h-4 text-green-800" />
          Go to last row
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {taskNoteTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  //@ts-ignore
                  const customWidth = header.column.columnDef.meta?.width;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        {
                          "w-[50px]": ["select", "actions"].includes(header.id),
                        },
                        "p-2"
                      )}
                      style={{
                        width: `${customWidth}px`,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {taskNoteTable.getRowModel().rows?.length ? (
              taskNoteTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p-2"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={TaskNoteColumns.length}
                  className="h-24 text-center"
                >
                  {"No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between flex-1 text-sm select-none text-muted-foreground">
        {
          <div className="flex items-center justify-between w-full gap-4">
            <p className="hidden md:block">{pageStatus}</p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={"secondary"}
                onClick={addRow}
              >
                <Plus className="w-4 h-4 text-green-800" /> Add Row
              </Button>
            </div>
          </div>
        }
      </div>
      <TaskNoteDeleteDialog formik={formik} />
    </div>
  );
};

export default TaskNoteSubform;
