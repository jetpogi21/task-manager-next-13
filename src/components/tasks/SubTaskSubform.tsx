//Generated by WriteToLeftModelSubform_tsx - LeftModelSubform.tsx
"use client";
import { SubTaskColumns } from "@/components/sub-tasks/SubTaskColumns";
import { SubTaskDeleteDialog } from "@/components/sub-tasks/SubTaskDeleteDialog";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { useSubTaskDeleteDialog } from "@/hooks/sub-tasks/useSubTaskDeleteDialog";
import { useSubTaskStore } from "@/hooks/sub-tasks/useSubTaskStore";
import { TaskFormFormikInitialValues } from "@/interfaces/TaskInterfaces";
import { SubTaskFormikShape } from "@/interfaces/SubTaskInterfaces";
import { cn } from "@/lib/utils";
import {
  COLUMNS,
  DEFAULT_FORM_VALUE,
  FIRST_FIELD_IN_FORM,
  PLURALIZED_MODEL_NAME,
} from "@/utils/constants/SubTaskConstants";
import { sortData } from "@/utils/sort";
import { getSorting, replaceHighestOrder } from "@/utils/utilities";
import { removeItemsByIndexes } from "@/utils/utils";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { FormikProps } from "formik";
import { CheckCircle, ChevronLast, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTaskStore } from "@/hooks/tasks/useTaskStore";
import { DraggableRow } from "@/components/ui/DataTable/DraggableRow";
import Decimal from "decimal.js";
import { DataTable } from "@/components/ui/DataTable";

interface SubTaskSubformProps {
  formik: FormikProps<TaskFormFormikInitialValues>;
}

const SubTaskSubform: React.FC<SubTaskSubformProps> = ({ formik }) => {
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
  } = useSubTaskStore((state) => ({
    resetRowSelection: state.resetRowSelection,
    rowSelection: state.rowSelection,
    setRowSelection: state.setRowSelection,
    setRowSelectionToAll: state.setRowSelectionToAll,
    sort: state.sort,
    setSort: state.setSort,
    setCurrentData: state.setCurrentData,
  }));
  const { setRecordsToDelete } = useSubTaskDeleteDialog();

  //Zustand
  const { setHasUpdate } = useTaskStore((state) => ({
    setHasUpdate: state.setHasUpdate,
  }));

  //Tanstack queries

  //Page Constants
  const DEFAULT_SUBTASK = DEFAULT_FORM_VALUE;

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);
  const dataRowCount = formik.values.SubTasks.filter((item) => item.id).length;
  const pageStatus = `Showing ${dataRowCount} of ${dataRowCount} record(s)`;

  //Utility Functions

  //Client Actions
  const focusOnRef = () => {
    ref && ref.current?.focus();
  };

  const toggleSubTaskFinishDateTime = (idx: number) => {
    const { SubTasks } = formik.values;
    const currentFinishDateTime = SubTasks[idx].finishDateTime;

    formik.setFieldValue(
      `SubTasks[${idx}].finishDateTime`,
      currentFinishDateTime ? null : new Date()
    );
    setTouchedRows(idx);
    setHasUpdate(true);
  };

  const finishSelectedRows = () => {
    Object.keys(rowSelection)
      .map((item) => parseInt(item))
      .forEach((i) => {
        if (formik.values.SubTasks[i].finishDateTime) {
          formik.setFieldValue(`SubTasks[${i}].finishDateTime`, new Date());
          setTouchedRows(i);
        }
      });
    setHasUpdate(true);
  };

  const addRow = () => {
    formik.setFieldValue(`SubTasks`, [
      ...formik.values.SubTasks.map((item) => ({ ...item })),
      {
        ...DEFAULT_SUBTASK,
        taskID: formik.values.id,
        //@ts-ignore
        priority: replaceHighestOrder(formik.values.SubTasks, "priority"),
      },
    ]);
    setWillFocus(true);
  };

  const setTouchedRows = (idx: number) => {
    formik.setFieldValue(`SubTasks[${idx}].touched`, true);
  };

  const deleteRow = (idx: number) => {
    const id = formik.values.SubTasks[idx].id;

    if (id) {
      setRecordsToDelete([id.toString()]);
    } else {
      formik.setFieldValue(`SubTasks`, [
        ...formik.values.SubTasks.slice(0, idx),
        ...formik.values.SubTasks.slice(idx + 1),
      ]);
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = formik.values.SubTasks.filter((_, idx) =>
      indexes.includes(idx)
    )
      .filter((item) => !!item.id)
      .map((item) => item.id.toString());

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    } else {
      formik.setFieldValue(
        `SubTasks`,
        removeItemsByIndexes(formik.values.SubTasks, indexes)
      );
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const toggleRow = (idx: number) => setRowSelection(idx);
  const toggleSelectAllRow = () => {
    if (Object.keys(rowSelection).length === formik.values.SubTasks.length) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(formik.values.SubTasks.length);
    }
  };

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    const { values, setFieldValue } = formik;
    const { SubTasks } = values;

    // Clone the SubTasks array
    const newArray = [
      ...SubTasks.map((item, idx) => ({
        ...item,
        touched:
          idx === targetRowIndex || idx === draggedRowIndex
            ? true
            : item.touched,
      })),
    ];

    const rowOrder = SubTasks[targetRowIndex].priority;
    // Remove the item from its original position
    const [draggedItem] = newArray.splice(draggedRowIndex, 1);

    const draggedItemOrder = new Decimal(rowOrder).minus(new Decimal("0.01"));
    draggedItem.priority = draggedItemOrder.toString();

    // Insert the item at the target position
    newArray.splice(targetRowIndex, 0, draggedItem);

    // Update the priority field based on the index
    const updatedArray = newArray.map((item, idx) => ({
      ...item,
    }));

    // Update the formik field value
    setFieldValue("SubTasks", updatedArray);
    setHasUpdate(true);
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
      "SubTasks",
      formik.values.SubTasks.filter((item) => item.id).sort((a, b) => {
        const desc = sortParams.includes("-");
        const field = desc ? sortParams.substring(1) : sortParams;

        return sortData(a, b, desc, field, COLUMNS);
      })
    );
    resetRowSelection();
  };

  const subTaskTable = useReactTable<SubTaskFormikShape>({
    data: formik.values.SubTasks,
    columns: SubTaskColumns,
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
        priority: false,
        finishDateTime: false,
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
      lastFieldInForm: "finishDateTime",
      forwardedRef: ref,
      editable: true,
      options: {},
      rowActions: {
        toggleSubTaskFinishDateTime,
      },
    },
  });

  //useEffects here
  useEffect(() => {
    setCurrentData(formik.values.SubTasks);
    if (willFocus) {
      focusOnRef();
    }
  }, [formik.values.SubTasks]);

  const toolRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    if (toolRef.current) {
      observer.observe(toolRef.current);
    }

    return () => {
      if (toolRef.current) {
        observer.unobserve(toolRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">Sub Tasks</h3>
      <div
        className="flex items-center gap-4"
        ref={toolRef}
      >
        <div
          className={cn(
            "flex items-center gap-4",
            !isVisible &&
              hasSelected &&
              "fixed left-0 right-0 m-auto bottom-5 border-2 border-border w-3/4 bg-background h-[50px] p-4 z-10 rounded-lg shadow-sm"
          )}
        >
          <div className="text-sm">
            {subTaskTable.getFilteredSelectedRowModel().rows.length} of{" "}
            {subTaskTable.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          {hasSelected && (
            <>
              {!isVisible && (
                <Button
                  type="button"
                  size={"sm"}
                  variant={"secondary"}
                  onClick={resetRowSelection}
                  className="flex items-center justify-center gap-1"
                >
                  Clear Selection
                </Button>
              )}
              <Button
                type="button"
                size={"sm"}
                variant={"destructive"}
                onClick={deleteSelectedRows}
                className="flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </Button>
              <Button
                type="button"
                size={"sm"}
                variant={"secondary"}
                onClick={finishSelectedRows}
                className="flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Finish sub-tasks
              </Button>
            </>
          )}
        </div>
        <Button
          className="ml-auto"
          variant={"secondary"}
          type="button"
          size="sm"
          onClick={focusOnRef}
        >
          <ChevronLast className="w-4 h-4 text-foreground" />
          Go to last row
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {subTaskTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="w-[50px]"></TableHead>
                {headerGroup.headers.map((header) => {
                  //@ts-ignore
                  const customWidth = header.column.columnDef.meta?.width;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn({
                        "w-[50px] p-0": ["select", "actions"].includes(
                          header.id
                        ),
                      })}
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
            {subTaskTable.getRowModel().rows?.length ? (
              subTaskTable.getRowModel().rows.map((row) => (
                <DraggableRow
                  key={row.id}
                  row={row}
                  reorderRow={reorderRow}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={SubTaskColumns.length}
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
                <Plus className="w-4 h-4 text-foreground" /> Add Row
              </Button>
            </div>
          </div>
        }
      </div>
      <SubTaskDeleteDialog formik={formik} />
    </div>
  );
};

export default SubTaskSubform;
