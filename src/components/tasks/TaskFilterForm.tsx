//Generated by WriteToModelfilterform_tsx - ModelFilterForm.tsx
"use client";
import { useTaskStore } from "@/hooks/tasks/useTaskStore";
import {
  TaskFormikFilter,
  TaskSearchParams,
} from "@/interfaces/TaskInterfaces";
import {
  getDefaultFilters,
  getFilterValueFromURL,
  getParamsObject,
  getSortItems,
  getSorting,
} from "@/utils/utilities";
import { encodeParams } from "@/utils/utils";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { MouseEventHandler } from "react";
import LimitSelector from "@/components/form/LimitSelector";
import FormikControl from "@/components/form/FormikControl";
import { Button } from "@/components/ui/Button";
import { isEqual } from "lodash";
import { useTaskPageParams } from "@/hooks/tasks/useTaskPageParams";
import useScreenSize from "@/hooks/useScreenSize";
import { Search, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortingState } from "@tanstack/react-table";
import SortSelector from "@/components/form/SortSelector";
import { center } from "@/lib/tailwind-combo";
import useModelList from "@/hooks/useModelList";
import { TaskConfig } from "@/utils/config/TaskConfig";
import FilterControls from "@/components/FilterControls";
import FilterDialog from "@/components/FilterDialog";
import { AppConfig } from "@/lib/app-config";
import { BasicModel } from "@/interfaces/GeneralInterfaces";

const TaskFilterForm: React.FC = () => {
  const { query, router, pathname, params } = useTaskPageParams();
  const { limit } = params;
  const config = TaskConfig;

  const defaultFilters = getDefaultFilters(config.filters);

  const initialValues: TaskFormikFilter = getFilterValueFromURL(
    query,
    defaultFilters
  );

  const requiredList: Record<string, BasicModel[]> = {};

  config.fields
    .filter(({ relatedModelID }) => relatedModelID)
    .forEach(({ relatedModelID }) => {
      const relatedModel = AppConfig.models.find(
        (model) => model.seqModelID === relatedModelID
      );
      if (!relatedModel) return;
      requiredList[`${relatedModel.variableName}List`] = useModelList(
        relatedModel.modelPath
      );
    });

  //Sort related
  const sorting = getSorting(params.sort);
  const sortItems = getSortItems(config);

  const isLarge = useScreenSize("lg");

  const [mounted, setMounted] = React.useState(false);

  //Zustand stores
  const [setPage, setLastFetchedPage, setFetchCount, resetRowSelection] =
    useTaskStore((state) => [
      state.setPage,
      state.setLastFetchedPage,
      state.setFetchCount,
      state.resetRowSelection,
    ]);

  const handleFormikSubmit = (
    values: Partial<TaskFormikFilter>,
    formik: FormikHelpers<TaskFormikFilter>
  ) => {
    const params = {
      ...query,
      ...(getParamsObject(values, defaultFilters) as Partial<TaskSearchParams>),
    };

    setFetchCount(true);
    setPage(1);
    setLastFetchedPage(1);
    resetRowSelection();
    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);
  };

  const handleLimitChange = (value: string) => {
    const params = { ...query, limit: value };
    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);
    resetRowSelection();
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
    const pageParams = { ...params, sort: sortParams };
    const newURL = `${pathname}?${encodeParams(pageParams)}`;
    router.push(newURL);
  };

  const renderFormik = (formik: FormikProps<TaskFormikFilter>) => {
    const filtered = isEqual(defaultFilters, formik.values);

    const handleSubmitClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.submitForm();
    };

    const handleClearClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.setValues(defaultFilters as TaskFormikFilter);
      formik.submitForm();
    };

    return (
      <Form
        className="flex gap-2"
        autoComplete="off"
      >
        <div className={cn("flex w-full gap-2", isLarge && "flex-row-reverse")}>
          {config.filters.some((filter) => filter.filterQueryName === "q") && (
            <FormikControl
              name="q"
              placeholder={`Filter ${config.pluralizedVerboseModelName}...`}
              type="Text"
            />
          )}

          {!isLarge ? (
            <FilterControls
              config={config}
              requiredList={requiredList}
            />
          ) : (
            <FilterDialog
              onClearClick={handleClearClick}
              onSubmitClick={handleSubmitClick}
              config={config}
              requiredList={requiredList}
            />
          )}
        </div>
        <Button
          type="button"
          onClick={handleSubmitClick}
          size={"sm"}
          variant={"secondary"}
          className="flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span className="hidden lg:inline-block">Search</span>
        </Button>
        <Button
          type="button"
          size={"sm"}
          variant={"ghost"}
          disabled={filtered}
          onClick={handleClearClick}
          className="flex items-center gap-2"
        >
          <XCircle className="w-4 h-4" />
          <span className="hidden lg:inline-block">Clear</span>
        </Button>
      </Form>
    );
  };

  React.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    mounted && (
      <div className="flex flex-col justify-between w-full gap-4 lg:flex-row">
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormikSubmit}
        >
          {renderFormik}
        </Formik>
        <div className={cn(center, "gap-2", "justify-between w-auto")}>
          <div className="lg:hidden">
            <SortSelector
              onSortChange={handleSortChange}
              sortItems={sortItems}
              sorting={sorting}
            />
          </div>
          <LimitSelector
            handleLimitChange={handleLimitChange}
            value={limit}
          />
        </div>
      </div>
    )
  );
};

export default TaskFilterForm;
