//Generated by WriteToModelformarray_tsx - ModelFormArray.tsx
import { TagColumns } from "@/components/tags/TagColumns";
import { TagMultiCreateDeleteDialog } from "@/components/tags/TagMultiCreateDeleteDialog";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { useTagDeleteDialog } from "@/hooks/tags/useTagDeleteDialog";
import { useTagPageParams } from "@/hooks/tags/useTagPageParams";
import { useTagStore } from "@/hooks/tags/useTagStore";
import { TagFormikShape } from "@/interfaces/TagInterfaces";
import {
  DEFAULT_FORM_VALUE,
  FIRST_FIELD_IN_FORM,
  LAST_FIELD_IN_FORM,
  PLURALIZED_MODEL_NAME,
} from "@/utils/constants/TagConstants";
import { getSorting } from "@/utils/utilities";
import { encodeParams, removeItemsByIndexes } from "@/utils/utils";
import {
  useReactTable,
  getCoreRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Form, FormikProps } from "formik";
import { ChevronLast, Plus, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface TagFormArrayProps {
  formik: FormikProps<{ Tags: TagFormikShape[] }>;
}

const TagFormArray: React.FC<TagFormArrayProps> = ({ formik }) => {
  const { query, router, pathname, params } = useTagPageParams();
  const { sort, limit } = params;

  //Local states
  const [willFocus, setWillFocus] = useState(false);
  const ref: React.RefObject<HTMLElement> = useRef(null); //to be attached to the last row in form, first control in that row

  const currentData = useTagStore((state) => state.currentData);
  const queryResponse = useTagStore((state) => state.queryResponse);
  const resetRowSelection = useTagStore((state) => state.resetRowSelection);
  const rowSelection = useTagStore((state) => state.rowSelection);
  const setRowSelection = useTagStore((state) => state.setRowSelection);
  const setRowSelectionToAll = useTagStore(
    (state) => state.setRowSelectionToAll
  );
  const page = useTagStore((state) => state.page);
  const recordCount = useTagStore((state) => state.recordCount);
  const isUpdating = useTagStore((state) => state.isUpdating);
  const setPage = useTagStore((state) => state.setPage);
  const lastFetchedPage = useTagStore((state) => state.lastFetchedPage);

  const setRecordsToDelete = useTagDeleteDialog(
    (state) => state.setRecordsToDelete
  );

  //Page Constants
  const DEFAULT_TAG = DEFAULT_FORM_VALUE;

  //Tanstacks
  const {
    data: tagData,
    isLoading,
    isFetching,
    fetchNextPage,
  } = queryResponse!();

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);
  const dataRowCount = tagData
    ? currentData.length + (page - 1) * parseInt(limit)
    : 0;
  const pageStatus = `Showing ${dataRowCount} of ${recordCount} record(s)`;
  const hasPreviousPage = page > 1;
  const hasNextPage = dataRowCount < recordCount;

  //Client Actions
  const focusOnRef = () => {
    ref && ref.current?.focus();
  };

  const addRow = () => {
    formik.setFieldValue(`Tags`, [
      ...formik.values.Tags.map((item) => ({ ...item })),
      { ...DEFAULT_TAG },
    ]);
    setWillFocus(true);
  };

  const setTouchedRows = (idx: number) => {
    formik.setFieldValue(`Tags[${idx}].touched`, true);
  };

  const deleteRow = (idx: number) => {
    const id = formik.values.Tags[idx].id;

    if (id) {
      setRecordsToDelete([id.toString()]);
    } else {
      formik.setFieldValue(`Tags`, [
        ...formik.values.Tags.slice(0, idx),
        ...formik.values.Tags.slice(idx + 1),
      ]);
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = formik.values.Tags.filter((_, idx) =>
      indexes.includes(idx)
    )
      .filter((item) => !!item.id)
      .map((item) => item.id.toString());

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    } else {
      formik.setFieldValue(
        `Tags`,
        removeItemsByIndexes(formik.values.Tags, indexes)
      );
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const toggleRow = (idx: number) => setRowSelection(idx);
  const toggleSelectAllRow = () => {
    if (Object.keys(rowSelection).length === formik.values.Tags.length) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(formik.values.Tags.length);
    }
  };

  const goToPreviousPage = () => {
    if (tagData) {
      const newPage = page - 1;
      setPage(newPage);
      resetRowSelection();
    }
  };

  const goToNextPage = () => {
    if (tagData) {
      const newPage = page + 1;
      if (newPage <= lastFetchedPage) {
        setPage(newPage);
      } else {
        setPage(newPage);
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

  const tagTable = useReactTable<TagFormikShape>({
    data: formik.values.Tags,
    columns: TagColumns,
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
    meta: {
      name: PLURALIZED_MODEL_NAME,
      setTouchedRows,
      addRow,
      deleteRow,
      toggleRow,
      toggleSelectAllRow,
      firstFieldInForm: FIRST_FIELD_IN_FORM,
      lastFieldInForm: LAST_FIELD_IN_FORM,
      forwardedRef: ref,
      editable: true,
      options: {},
    },
  });

  //useEffects here
  useEffect(() => {
    if (willFocus) {
      focusOnRef();
    }
  }, [formik.values.Tags]);

  return (
    <Form
      className="flex flex-col flex-1 gap-4"
      autoComplete="off"
      noValidate
    >
      <div className="flex items-center gap-4">
        <div className="text-sm">
          {tagTable.getFilteredSelectedRowModel().rows.length} of{" "}
          {tagTable.getFilteredRowModel().rows.length} row(s) selected.
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
          table={tagTable}
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
                type="submit"
                size={"sm"}
                isLoading={isUpdating}
                variant={"secondary"}
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
      <TagMultiCreateDeleteDialog />
    </Form>
  );
};

export default TagFormArray;
