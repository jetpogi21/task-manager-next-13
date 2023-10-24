//Generated by WriteToModeltable_tsx - ModelTable.tsx for Table 9/18
"use client";
import React, { useEffect } from "react";
import {
  TaskFormikInitialValues,
  TaskModel,
  TaskSearchParams,
} from "@/interfaces/TaskInterfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useModelsQuery, useUpdateModelsMutation } from "@/hooks/useModelQuery";
import { TaskConfig } from "@/utils/config/TaskConfig";
import { BasicModel, GetModelsResponse } from "@/interfaces/GeneralInterfaces";
import { useModelPageParams } from "@/hooks/useModelPageParams";
import { getCurrentData } from "@/lib/getCurrentData";
import { getRefetchQueryFunction } from "@/lib/refetchQuery";
import { useTableProps } from "@/hooks/useTableProps";
import ModelDataTable from "@/components/ModelDataTable";
import { getTaskRowActions } from "@/lib/tasks/getTaskRowActions";
import { useImportTaskFromTemplate } from "@/hooks/tasks/useImportTaskFromTemplate";
import TaskSingleColumn from "@/components/tasks/TaskSingleColumn";
import { createRequiredModelLists } from "@/lib/createRequiredModelLists";
import { getInitialValues } from "@/lib/getInitialValues";
import { toast } from "@/hooks/use-toast";
import { Formik, FormikProps } from "formik";
import { ModelSchema } from "@/schema/ModelSchema";

const TaskTable: React.FC = () => {
  const modelConfig = TaskConfig;
  const { pluralizedModelName } = modelConfig;
  const pageParams = useModelPageParams<TaskSearchParams>(modelConfig);
  const { params } = pageParams;
  const queryClient = useQueryClient();

  const [mounted, setMounted] = React.useState(false);

  //For Editable Tables
  const requiredList: Record<string, BasicModel[]> =
    createRequiredModelLists(modelConfig);

  //For Editable Tables
  const defaultFormValue = getInitialValues<TaskModel>(modelConfig, undefined, {
    childMode: true,
    requiredList,
  });

  //Store Variables
  const tableStates = useTableProps<TaskModel>(modelConfig);
  const {
    page,
    setRecordCount,
    fetchCount,
    setFetchCount,
    currentData: previousData,
    setCurrentData,
    setIsUpdating,
  } = tableStates;

  const queryParams = params;

  const useTaskSearchQuery = () =>
    useModelsQuery<TaskModel>(modelConfig, {
      ...queryParams,
      fetchCount: fetchCount.toString(),
    });

  const queryResponse = useTaskSearchQuery();
  const { data, refetch, isFetching } = queryResponse;

  const currentPageData: GetModelsResponse<TaskModel> | null = data
    ? data.pages[page - (isFetching ? 2 : 1)]
    : null;
  const currentData = getCurrentData(currentPageData, previousData);

  //Client functions
  const refetchQuery = getRefetchQueryFunction(
    modelConfig,
    params,
    refetch,
    queryClient
  );

  //Add any required mutations here
  const addTasksFromTemplateMutation = useImportTaskFromTemplate((data) => {
    refetchQuery(0);
  });
  const modelActions = {
    "Add Form Templates": addTasksFromTemplateMutation,
  };

  const { mutate: updateRecords } = useUpdateModelsMutation(modelConfig);
  const rowActions = getTaskRowActions({
    currentData,
    setCurrentData,
    mutate: updateRecords,
  });

  const handleSubmit = async (values: TaskFormikInitialValues) => {
    //The reference is the index of the row
    const rowsToBeSubmitted = (
      values[
        pluralizedModelName as keyof TaskFormikInitialValues
      ] as TaskFormikInitialValues["Tasks"]
    ).filter((item) => item.touched);

    if (rowsToBeSubmitted.length > 0) {
      setIsUpdating(true);
      const payload = {
        [pluralizedModelName]: rowsToBeSubmitted,
      };

      //@ts-ignore
      updateModelsMutation.mutateAsync(payload).then((data) => {
        console.log(data);
        setIsUpdating(false);
        toast({
          variant: "success",
          description: `${modelConfig.pluralizedVerboseModelName} successfully updated`,
        });
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (currentPageData?.count !== undefined) {
      setRecordCount(currentPageData?.count || 0);
    }
    setFetchCount(!fetchCount);
    setCurrentData(currentData);
  }, [currentPageData?.count, data, page]);

  const commonProps = {
    modelConfig,
    tableStates,
    refetchQuery,
    queryResponse,
    pageParams,
    rowActions,
    modelActions,
    SingleColumnComponent: TaskSingleColumn,
    requiredList,
    defaultFormValue,
  };

  return (
    mounted &&
    (modelConfig.isTable ? (
      <ModelDataTable {...commonProps} />
    ) : (
      <Formik
        initialValues={
          {
            [pluralizedModelName]: currentData,
          } as unknown as TaskFormikInitialValues
        }
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={ModelSchema(modelConfig, true)}
        validateOnChange={false}
      >
        {(formik) => (
          <ModelDataTable
            {...commonProps}
            formik={formik as unknown as FormikProps<TaskModel>}
          />
        )}
      </Formik>
    ))
  );
};

export default TaskTable;
