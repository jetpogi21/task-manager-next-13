"use client";
import { ModelDeleteDialog } from "@/components/ModelDeleteDialog";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import useGlobalDialog from "@/hooks/useGlobalDialog";
import { useModelPageParams } from "@/hooks/useModelPageParams";
import { useUpdateModelsMutation } from "@/hooks/useModelQuery";
import { useTableProps } from "@/hooks/useTableProps";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { createRequiredModelLists } from "@/lib/createRequiredModelLists";
import { generateActionButtons } from "@/lib/generateActionButtons";
import { getInitialValues } from "@/lib/getInitialValues";
import { getModelColumns } from "@/lib/getModelColumns";
import { Slice } from "@/lib/zustand-slice";
import { getSorting } from "@/utils/utilities";
import { encodeParams, removeItemsByIndexes } from "@/utils/utils";
import {
  useReactTable,
  getCoreRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Form, FormikProps } from "formik";
import { ChevronLast, Plus, Trash } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface ModelFormArrayProp<T> {
  formik: FormikProps<T>;
  modelConfig: ModelConfig;
  queryResponse?: Slice<T>["queryResponse"];
  storeStates: Partial<Slice<T>>;
  refetchQuery: (idx: number) => void;
}

const ModelFormArray = <T,>({
  formik,
  modelConfig,
  storeStates,
  queryResponse,
  refetchQuery,
}: ModelFormArrayProp<T>) => {
  const { query, router, pathname, params } = useModelPageParams(modelConfig);
  //@ts-ignore
  const { sort, limit } = params;
  const {
    currentData,
    page,
    recordCount,
    isUpdating,
    setPage,
    lastFetchedPage,
    setRecordCount,
  } = storeStates;

  const { pluralizedModelName } = modelConfig;

  //zustand states
  const { closeDialog, openDialog } = useGlobalDialog((state) => ({
    closeDialog: state.closeDialog,
    openDialog: state.openDialog,
  }));

  const {
    rowSelection,
    setRowSelection,
    setRowSelectionByIndex,
    resetRowSelection,
    setRowSelectionToAll,
    recordsToDelete,
    setRecordsToDelete,
  } = useTableProps(modelConfig);

  //Local states
  const [willFocus, setWillFocus] = useState(false);
  const ref: React.RefObject<HTMLElement> = useRef(null); //to be attached to the last row in form, first control in that row

  const requiredList: Record<string, BasicModel[]> =
    createRequiredModelLists(modelConfig);

  //Page Constants
  const defaultFormValue = getInitialValues(modelConfig, undefined, {
    childMode: true,
    requiredList,
  });

  //Tanstacks
  const { mutate } = useUpdateModelsMutation(modelConfig);
  const rowActions = undefined;
  //@ts-ignore
  const { data, isLoading, isFetching, fetchNextPage } = queryResponse;

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);
  const dataRowCount = data
    ? currentData!.length + (page! - 1) * parseInt(limit)
    : 0;
  const pageStatus = `Showing ${dataRowCount} of ${recordCount} record(s)`;
  const hasPreviousPage = page! > 1;
  const hasNextPage = dataRowCount < recordCount!;
  const indexes = Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((item) => parseInt(item));

  //@ts-ignore
  const rows = formik.values[pluralizedModelName] as Record<string, unknown>[];

  //Client Actions
  const focusOnRef = () => {
    ref && ref.current?.focus();
  };

  const addRow = () => {
    formik.setFieldValue(pluralizedModelName, [
      ...rows.map((item) => ({ ...item })),
      { ...defaultFormValue },
    ]);
    setWillFocus(true);
  };

  const setTouchedRows = (idx: number) => {
    formik.setFieldValue(`${pluralizedModelName}[${idx}].touched`, true);
  };

  const deleteRow = (idx: number) => {
    const id = rows[idx].id;

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
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = rows
      .filter((_, idx) => indexes.includes(idx))
      .filter((item) => !!item.id)
      .map((item: any) => item.id.toString());

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

  const goToPreviousPage = () => {
    if (data) {
      const newPage = page! - 1;
      setPage!(newPage);
      resetRowSelection();
    }
  };

  const goToNextPage = () => {
    if (data) {
      const newPage = page! + 1;
      if (newPage <= lastFetchedPage!) {
        setPage!(newPage);
      } else {
        setPage!(newPage);
        fetchNextPage();
      }
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

    const params = { ...query, sort: sortParams };
    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);

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

  const modelTable = useReactTable({
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
    manualFiltering: true,
    manualSorting: true,
    enableMultiRowSelection: true,
    initialState: {
      columnVisibility,
    },
    meta: {
      name: pluralizedModelName,
      setTouchedRows,
      addRow,
      deleteRow,
      toggleRow,
      toggleSelectAllRow,
      firstFieldInForm: firstFieldInForm,
      lastFieldInForm: lastFieldInForm,
      forwardedRef: ref,
      editable: true,
      rowActions,
      options: {},
    },
  });

  //useEffects here
  useEffect(() => {
    if (willFocus) {
      focusOnRef();
    }
  }, [rows]);

  return (
    <Form
      className="flex flex-col flex-1 gap-4"
      autoComplete="off"
      noValidate
    >
      <div className="flex items-center gap-4">
        <div className="text-sm">
          {modelTable.getFilteredSelectedRowModel().rows.length} of{" "}
          {modelTable.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {hasSelected && (
          <div className="flex gap-4">
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
            {generateActionButtons(
              rowActions,
              indexes,
              openDialog,
              closeDialog,
              resetRowSelection
            )}
          </div>
        )}
        <Button
          className="ml-auto"
          variant={"secondary"}
          type="button"
          size="sm"
          onClick={focusOnRef}
        >
          <ChevronLast className="w-4 h-4 text-foreground" /> Go to last row
        </Button>
      </div>

      <div className="border rounded-md">
        <DataTable
          isLoading={isLoading}
          table={modelTable}
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
                onClick={addRow}
                isLoading={isUpdating}
              >
                <Plus className="w-4 h-4 mr-1 text-foreground" />
                Add Row
              </Button>
              <Button
                type="button"
                size={"sm"}
                isLoading={isUpdating}
                variant={"secondary"}
                onClick={() => formik.submitForm()}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!hasPreviousPage}
                onClick={() => goToPreviousPage()}
                variant={"secondary"}
              >
                Previous
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!hasNextPage}
                onClick={() => goToNextPage()}
                isLoading={isFetching}
                variant={"secondary"}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
      <ModelDeleteDialog
        modelConfig={modelConfig}
        recordsToDelete={recordsToDelete}
        setRecordsToDelete={setRecordsToDelete}
        onSuccess={() => {
          setRecordsToDelete([]);
          setRecordCount!(
            recordCount! -
              currentData!.filter((item) =>
                //@ts-ignore
                recordsToDelete.includes(item.id.toString())
              ).length
          );
          resetRowSelection();
          refetchQuery(page! - 1);
        }}
      />
    </Form>
  );
};

export default ModelFormArray;
