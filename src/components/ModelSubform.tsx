"use client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  findLeftForeignKeyField,
  findModelPrimaryKeyField,
  findRelationshipModelConfig,
  getSorting,
  replaceHighestOrder,
} from "@/utils/utilities";
import { removeItemsByIndexes } from "@/utils/utils";
import {
  useReactTable,
  getCoreRowModel,
  SortingState,
} from "@tanstack/react-table";
import { FormikProps } from "formik";
import { ChevronLast, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Decimal from "decimal.js";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { createRequiredModelLists } from "@/lib/createRequiredModelLists";
import { AppConfig } from "@/lib/app-config";
import { getModelColumns } from "@/lib/getModelColumns";
import { getInitialValues } from "@/lib/getInitialValues";
import { ModelDeleteDialog } from "@/components/ModelDeleteDialog";
import { DataTable } from "@/components/ui/DataTable";
import { useTableProps } from "@/hooks/useTableProps";
import { sortFunction } from "@/lib/sortFunction";

interface ModelSubformProps<T> {
  formik: FormikProps<T>;
  setHasUpdate: () => void;
  relationshipConfig: (typeof AppConfig)["relationships"][number];
  filterFunction?: (item: Record<string, unknown>) => boolean;
}

type ArrayOfObject = Record<string, unknown>[];

const ModelSubform = <T,>({
  formik,
  setHasUpdate,
  relationshipConfig,
  filterFunction,
}: ModelSubformProps<T>) => {
  const [willFocus, setWillFocus] = useState(false);
  const ref: React.RefObject<HTMLElement> = useRef(null); //to be attached to the last row in form, first control in that row

  const modelConfig = findRelationshipModelConfig(
    relationshipConfig.seqModelRelationshipID,
    "LEFT"
  );
  const primaryKeyField = findModelPrimaryKeyField(modelConfig).fieldName;
  const leftFieldName = findLeftForeignKeyField(
    relationshipConfig.seqModelRelationshipID
  );
  const parentModelConfig = findRelationshipModelConfig(
    relationshipConfig.seqModelRelationshipID,
    "RIGHT"
  );
  const parentPrimaryKeyField =
    findModelPrimaryKeyField(parentModelConfig).fieldName;
  const pluralizedModelName = modelConfig.pluralizedModelName;

  const rows = useMemo(
    () =>
      (formik.values[pluralizedModelName as keyof T] as ArrayOfObject).filter(
        filterFunction || Boolean
      ) as ArrayOfObject,
    []
  );

  /* const rows = formik.values[pluralizedModelName as keyof T] as ArrayOfObject; */
  const {
    rowSelection,
    setRowSelection,
    setRowSelectionByIndex,
    resetRowSelection,
    setRowSelectionToAll,
    sort,
    setSort,
    recordsToDelete,
    setRecordsToDelete,
  } = useTableProps(modelConfig);

  const requiredList: Record<string, BasicModel[]> =
    createRequiredModelLists(modelConfig);

  //Page Constants
  const defaultFormValue = getInitialValues(modelConfig, undefined, {
    childMode: true,
    requiredList,
    leftFieldName: leftFieldName.fieldName,
  });

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);

  const dataRowCount = rows.filter((item) => item[primaryKeyField]).length;
  const pageStatus = `Showing ${dataRowCount} of ${dataRowCount} record(s)`;

  //Client Actions
  const focusOnRef = () => {
    ref && ref.current?.focus();
  };

  const draggableField = modelConfig.fields.find((field) => field.orderField);

  const addRow = () => {
    const newRowValue: Record<string, unknown> = {
      ...defaultFormValue,
      [leftFieldName.fieldName]:
        formik.values[parentPrimaryKeyField as keyof T],
    };

    if (draggableField) {
      newRowValue[draggableField.fieldName] = replaceHighestOrder(
        rows,
        draggableField.fieldName
      );
    }
    formik.setFieldValue(`${pluralizedModelName}`, [
      ...rows.map((item) => ({
        ...item,
      })),
      newRowValue,
    ]);
    setWillFocus(true);
  };

  const setTouchedRows = (idx: number) => {
    formik.setFieldValue(`${pluralizedModelName}[${idx}].touched`, true);
  };

  const deleteRow = (idx: number) => {
    const id = rows[idx][primaryKeyField];

    if (id) {
      setRecordsToDelete([id.toString()]);
    } else {
      formik.setFieldValue(pluralizedModelName, [
        ...rows.slice(0, idx),
        ...rows.slice(idx + 1),
      ]);
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection)
      .filter((item) => rowSelection[item])
      .map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = rows
      .filter((_, idx) => indexes.includes(idx))
      .filter((item) => !!item[primaryKeyField])
      .map((item) => (item[primaryKeyField] as string).toString()) as string[];

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    } else {
      formik.setFieldValue(
        pluralizedModelName,
        removeItemsByIndexes(rows, indexes)
      );
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const toggleRow = (idx: number) => setRowSelectionByIndex(idx);
  const toggleSelectAllRow = () => {
    if (Object.keys(rowSelection).length === rows.length) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(rows.length);
    }
  };

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    if (draggableField) {
      const { values, setFieldValue } = formik;
      const Models = values[pluralizedModelName as keyof T] as ArrayOfObject;

      // Clone the SubTasks array
      const newArray = [
        ...Models.map((item, idx) => ({
          ...item,
          touched:
            idx === targetRowIndex || idx === draggedRowIndex
              ? true
              : item.touched,
        })),
      ] as ArrayOfObject;

      const rowOrder = Models[targetRowIndex].priority as string;
      // Remove the item from its original position
      const [draggedItem] = newArray.splice(draggedRowIndex, 1);

      const draggedItemOrder = new Decimal(rowOrder).minus(new Decimal("0.01"));
      draggedItem[draggableField.fieldName] = draggedItemOrder.toString();

      // Insert the item at the target position
      newArray.splice(targetRowIndex, 0, draggedItem);

      // Update the priority field based on the index
      const updatedArray = newArray.map((item, idx) => ({
        ...item,
      }));

      // Update the formik field value
      setFieldValue(pluralizedModelName, updatedArray);
      setHasUpdate();
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
      pluralizedModelName,
      rows.filter((item) => item.id).sort(sortFunction(sortParams, modelConfig))
    );
    resetRowSelection();
  };

  const columnVisibility: Record<string, boolean> = modelConfig.fields.reduce(
    (acc: Record<string, boolean>, field) => {
      if (field.hideInTable) {
        acc[field.fieldName] = false;
      }
      return acc;
    },
    {}
  );

  let firstFieldInForm: string = "";
  let lastFieldInForm: string = "";
  modelConfig.fields
    .filter((field) => !field.hideInTable)
    .sort((a, b) => {
      return a.fieldOrder - b.fieldOrder;
    })
    .forEach((field, index) => {
      if (index === 0) {
        firstFieldInForm = field.fieldName;
      }
      lastFieldInForm = field.fieldName;
    });

  const modelColumns = useMemo(
    () => getModelColumns<Record<string, unknown>, unknown>({ modelConfig }),
    [modelConfig]
  );

  const modelTable = useReactTable<Record<string, unknown>>({
    data: rows,
    columns: modelColumns,
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
      columnVisibility: columnVisibility,
    },
    meta: {
      name: modelConfig.pluralizedModelName,
      setHasUpdate,
      setTouchedRows,
      addRow,
      deleteRow,
      toggleRow,
      toggleSelectAllRow,
      firstFieldInForm: firstFieldInForm,
      lastFieldInForm: lastFieldInForm,
      forwardedRef: ref,
      editable: true,
      options: {},
      rowActions: {},
    },
  });

  //useEffects here
  useEffect(() => {
    if (willFocus) {
      focusOnRef();
    }
  }, [rows]);

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
    <div
      className="flex flex-col gap-2"
      style={{ gridArea: pluralizedModelName }}
    >
      <h3 className="text-xl font-bold">
        {modelConfig.pluralizedVerboseModelName}
      </h3>
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
            {modelTable.getFilteredSelectedRowModel().rows.length} of{" "}
            {modelTable.getFilteredRowModel().rows.length} row(s) selected.
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
        <DataTable
          table={modelTable}
          isLoading={false}
          draggableField={draggableField}
          reorderRow={reorderRow}
        />
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
      <ModelDeleteDialog
        formik={formik}
        modelConfig={modelConfig}
        recordsToDelete={recordsToDelete}
        setRecordsToDelete={setRecordsToDelete}
        resetRowSelection={resetRowSelection}
      />
    </div>
  );
};

export default ModelSubform;
