//Generated by WriteToLeftmodeldropzone_tsx - LeftModelDropzone.tsx
"use client";
import { useTaskNoteStore } from "@/hooks/task-notes/useTaskNoteStore";
import { TaskFormFormikInitialValues } from "@/interfaces/TaskInterfaces";
import {
  COLUMNS,
  DEFAULT_FORM_VALUE,
  PRIMARY_KEY,
} from "@/utils/constants/TaskNoteConstants";
import { sortData } from "@/utils/sort";
import { getSorting } from "@/utils/utilities";
import { removeItemsByIndexes } from "@/utils/utils";
import { SortingState } from "@tanstack/react-table";
import { FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useTaskStore } from "@/hooks/tasks/useTaskStore";
import { FormikLocalDropZone } from "@/components/formik/FormikLocalDropZone";
import { useTaskNoteFileDeleteDialog } from "@/hooks/task-notes/useTaskNoteFileDeleteDialog";
import { TaskNoteFileDeleteDialog } from "@/components/task-notes/TaskNoteFileDeleteDialog";

interface TaskNoteFileDropzoneProps {
  formik: FormikProps<TaskFormFormikInitialValues>;
}

const TaskNoteFileDropzone: React.FC<TaskNoteFileDropzoneProps> = ({
  formik,
}) => {
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
  const { setRecordsToDelete } = useTaskNoteFileDeleteDialog();

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
  const dataRowCount = formik.values["TaskNoteFiles"].filter(
    (item) => item.id
  ).length;
  const pageStatus = `Showing ${dataRowCount} of ${dataRowCount} record(s)`;

  //Utility Functions

  //Client Actions
  const focusOnRef = () => {
    ref && ref.current?.focus();
  };

  const deleteRow = (idx: number) => {
    const id = formik.values["TaskNoteFiles"][idx].id;

    if (id) {
      setRecordsToDelete([id.toString()]);
    } else {
      formik.setFieldValue(`TaskNotes`, [
        ...formik.values["TaskNoteFiles"].slice(0, idx),
        ...formik.values["TaskNoteFiles"].slice(idx + 1),
      ]);
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = formik.values["TaskNoteFiles"]
      .filter((_, idx) => indexes.includes(idx))
      .filter((item) => !!item.id)
      .map((item) => item.id.toString());

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    } else {
      formik.setFieldValue(
        `TaskNotes`,
        removeItemsByIndexes(formik.values["TaskNoteFiles"], indexes)
      );
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const toggleRow = (idx: number) => setRowSelection(idx);
  const toggleSelectAllRow = () => {
    if (
      Object.keys(rowSelection).length === formik.values["TaskNoteFiles"].length
    ) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(formik.values["TaskNoteFiles"].length);
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
      "TaskNoteFiles",
      formik.values.TaskNoteFiles.filter((item) => item.id).sort((a, b) => {
        const desc = sortParams.includes("-");
        const field = desc ? sortParams.substring(1) : sortParams;

        return sortData(a, b, desc, field, COLUMNS);
      })
    );
    resetRowSelection();
  };

  //useEffects here
  useEffect(() => {
    setCurrentData(formik.values.TaskNoteFiles);
    if (willFocus) {
      focusOnRef();
    }
  }, [formik.values.TaskNoteFiles]);

  return (
    <>
      <FormikLocalDropZone
        setHasUpdate={() => setHasUpdate(true)}
        fieldName="file"
        parent="TaskNoteFiles"
        deleteRow={deleteRow}
        pkField={PRIMARY_KEY}
      />
      <TaskNoteFileDeleteDialog formik={formik} />
    </>
  );
};

export default TaskNoteFileDropzone;
