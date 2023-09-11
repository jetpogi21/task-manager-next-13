//Generated by WriteToModelfilterform_tsx - ModelFilterForm.tsx
"use client";
import { useTaskTemplateStore } from "@/hooks/task-templates/useTaskTemplateStore";
import {
  TaskTemplateFormikFilter,
  TaskTemplateSearchParams,
} from "@/interfaces/TaskTemplateInterfaces";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { getFilterValueFromURL, getParamsObject } from "@/utils/utilities";
import { encodeParams } from "@/utils/utils";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { MouseEventHandler } from "react";
import {
  DEFAULT_FILTERS,
  CONTROL_OPTIONS,
} from "@/utils/constants/TaskTemplateConstants";
import LimitSelector from "@/components/form/LimitSelector";
import { useURL } from "@/hooks/useURL";
import FormikControl from "@/components/form/FormikControl";
import { Button } from "@/components/ui/Button";
import { isEqual } from "lodash";
//Generated by ImportAllUseModelListHookBySeqModel
import useTaskCategoryList from "@/hooks/task-categories/useTaskCategoryList"; //Generated by ImportUseModelListHook - ImportUseModelListHook
import useTaskIntervalList from "@/hooks/task-intervals/useTaskIntervalList"; //Generated by ImportUseModelListHook - ImportUseModelListHook

const TaskTemplateFilterForm: React.FC = () => {
  const { router, query, pathname } = useURL<TaskTemplateSearchParams>();

  //SearchParams Variables
  const limit = query["limit"] || DEFAULT_LIMIT;

  const defaultFilters = DEFAULT_FILTERS;
  const initialValues: TaskTemplateFormikFilter = getFilterValueFromURL(
    query,
    defaultFilters
  );

  //Tanstack queries
  //Generated by GetRequiredQueryFromTanstackBySeqModel
  //Generated by GetRequiredQueryFromTanstack
  const { data: taskCategoryList } = useTaskCategoryList();
  //Generated by GetRequiredQueryFromTanstack
  const { data: taskIntervalList } = useTaskIntervalList();

  //Zustand stores
  const [setPage, setLastPage, setFetchCount, resetRowSelection, setCursor] =
    useTaskTemplateStore((state) => [
      state.setPage,
      state.setLastPage,
      state.setFetchCount,
      state.resetRowSelection,
      state.setCursor,
    ]);

  const handleFormikSubmit = (
    values: Partial<TaskTemplateFormikFilter>,
    formik: FormikHelpers<TaskTemplateFormikFilter>
  ) => {
    const params = {
      ...query,
      ...(getParamsObject(
        values,
        defaultFilters
      ) as Partial<TaskTemplateSearchParams>),
    };

    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);
    setFetchCount(true);
    resetRowSelection();
  };

  const handleLimitChange = (value: string) => {
    const params = { ...query, limit: value };
    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);
    resetRowSelection();
  };

  const renderFormik = (formik: FormikProps<TaskTemplateFormikFilter>) => {
    const filtered = isEqual(defaultFilters, formik.values);

    const handleSubmitClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.submitForm();
    };

    const handleClearClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.setValues(defaultFilters as TaskTemplateFormikFilter);
      formik.submitForm();
    };

    return (
      <Form
        className="flex gap-2 w-[750px]"
        autoComplete="off"
      >
        {/* Generated by GetFormikFilterQControl - GetFormikFilterQControl */}
        <FormikControl
          name="q"
          placeholder="Filter Task Templates..."
          type="Text"
          containerClassNames={["w-[250px]"]}
        />
        {/* Generated by GetAllFormikFilterControlBySeqModel */}
        {/* Generated by GetSelectFilter */}
        <FormikControl
          name="taskCategory"
          options={taskCategoryList || []}
          label="Task Category"
          type="Select"
          showLabel={false}
          allowBlank={true}
        />
        {/* Generated by GetSelectFilter */}
        <FormikControl
          name="taskInterval"
          options={taskIntervalList || []}
          label="Task Interval"
          type="Select"
          showLabel={false}
          allowBlank={true}
        />
        <Button
          type="button"
          onClick={handleSubmitClick}
          size={"sm"}
          variant={"secondary"}
        >
          Search
        </Button>
        <Button
          type="button"
          size={"sm"}
          variant={"ghost"}
          disabled={filtered}
          onClick={handleClearClick}
        >
          Clear
        </Button>
      </Form>
    );
  };

  return (
    <div className="flex justify-between w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
      >
        {renderFormik}
      </Formik>
      <LimitSelector
        handleLimitChange={handleLimitChange}
        value={limit}
      />
    </div>
  );
};

export default TaskTemplateFilterForm;
