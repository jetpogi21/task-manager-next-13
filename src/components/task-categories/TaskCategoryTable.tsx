//Generated by WriteToModeltable_tsx - ModelTable.tsx
"use client";
import React, { useEffect } from "react";
import { useTaskCategoryStore } from "@/hooks/task-categories/useTaskCategoryStore";
import {
  TaskCategoryFormikInitialValues,
  TaskCategoryUpdatePayload,
  GetTaskCategoriesResponse,
  TaskCategoryFormikShape,
} from "@/interfaces/TaskCategoryInterfaces";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Formik } from "formik";
import { TaskCategoryArraySchema } from "@/schema/TaskCategorySchema";
import { toast } from "@/hooks/use-toast";
import {
  DEFAULT_FORM_VALUE,
  VARIABLE_PLURAL_NAME,
} from "@/utils/constants/TaskCategoryConstants";
import { useTaskCategoryDeleteDialog } from "@/hooks/task-categories/useTaskCategoryDeleteDialog";
import TaskCategoryFormArray from "@/components/task-categories/TaskCategoryFormArray";
import {
  deleteTaskCategories,
  updateTaskCategories,
  useTaskCategoriesQuery,
} from "@/hooks/task-categories/useTaskCategoryQuery";
import { useTaskCategoryPageParams } from "@/hooks/task-categories/useTaskCategoryPageParams";

const TaskCategoryTable: React.FC = () => {
  const { params: queryParams } = useTaskCategoryPageParams();
  const queryClient = useQueryClient();

  //Page constants
  const DEFAULT_TASKCATEGORY = DEFAULT_FORM_VALUE;

  //Store Variables
  const recordCount = useTaskCategoryStore((state) => state.recordCount);
  const previousData = useTaskCategoryStore((state) => state.currentData);
  const setRecordCount = useTaskCategoryStore((state) => state.setRecordCount);
  const page = useTaskCategoryStore((state) => state.page);
  const fetchCount = useTaskCategoryStore((state) => state.fetchCount);
  const setFetchCount = useTaskCategoryStore((state) => state.setFetchCount);
  const queryResponse = useTaskCategoryStore((state) => state.queryResponse);
  const resetRowSelection = useTaskCategoryStore(
    (state) => state.resetRowSelection
  );
  const setCurrentData = useTaskCategoryStore((state) => state.setCurrentData);
  const setIsUpdating = useTaskCategoryStore((state) => state.setIsUpdating);
  const setQueryResponse = useTaskCategoryStore(
    (state) => state.setQueryResponse
  );
  const setRefetchQuery = useTaskCategoryStore(
    (state) => state.setRefetchQuery
  );

  const [setRecordsToDelete, setIsDialogLoading, setMutate] =
    useTaskCategoryDeleteDialog((state) => [
      state.setRecordsToDelete,
      state.setIsDialogLoading,
      state.setMutate,
    ]);

  //API Functions

  //Tanstacks
  const taskCategoryQuery = () =>
    useTaskCategoriesQuery({
      ...queryParams,
      fetchCount: fetchCount.toString(),
    });

  const { data, refetch, isFetching } = taskCategoryQuery();

  const currentPageData: GetTaskCategoriesResponse | null = data
    ? data.pages[page - (isFetching ? 2 : 1)]
    : null;
  const currentData: TaskCategoryFormikShape[] =
    currentPageData === null
      ? previousData
      : currentPageData?.rows.map((item, index) => ({
          ...item,
          touched: false,
          index,
        })) || [];

  currentData.push({
    ...DEFAULT_TASKCATEGORY,
    touched: false,
    index: currentData.length - 1,
  });

  //Client functions
  const refetchQuery = (idx: number) => {
    queryClient.setQueryData(
      [VARIABLE_PLURAL_NAME, { ...queryParams }],
      (data: InfiniteData<GetTaskCategoriesResponse> | undefined) => {
        return data
          ? {
              pages: data.pages.slice(0, idx + 1),
              pageParams: data.pageParams.slice(0, idx + 1),
            }
          : undefined;
      }
    );
    refetch();
  };

  //Generated by GetMutationSnippets
  type MutationData = { recordsCreated?: number; recordsDeleted?: number };
  const useHandleMutation = (
    mutationFunction: (payload: any) => Promise<MutationData>,
    successCallback: (data: MutationData) => string,
    updateRecordCountCallback: (
      recordCount: number,
      data: MutationData
    ) => number
  ) => {
    const { mutate } = useMutation(mutationFunction, {
      onMutate: () => {
        setIsDialogLoading(true);
        setIsUpdating(true);
      },
      onSuccess: (data) => {
        toast({
          description: successCallback(data),
          variant: "success",
          duration: 2000,
        });
        resetRowSelection();
        setRecordCount(updateRecordCountCallback(recordCount, data));
        refetchQuery(page);
      },
      onError: (error) => {
        const responseText =
          //@ts-ignore
          error?.response?.statusText || "Something went wrong with the app";
        toast({
          description: responseText,
          variant: "destructive",
          duration: 2000,
        });
      },
      onSettled: () => {
        setIsDialogLoading(false);
        setIsUpdating(false);
        setRecordsToDelete([]);
      },
    });

    return mutate;
  };

  // Usage for deleteTaskCategoryMutation
  const deleteTaskCategoryMutation = useHandleMutation(
    deleteTaskCategories,
    (data) => {
      return "Task Category(s) deleted successfully";
    },
    (recordCount, data) => {
      return recordCount - (data.recordsDeleted || 0);
    }
  );

  // Usage for updateTaskCategories
  const updateTaskCategoriesMutation = useHandleMutation(
    updateTaskCategories,
    (data) => {
      return "Task Category list updated successfully";
    },
    (recordCount, data) => {
      return (
        recordCount + (data.recordsCreated || 0) - (data.recordsDeleted || 0)
      );
    }
  );

  //Client Actions
  const handleSubmit = async (values: TaskCategoryFormikInitialValues) => {
    //The reference is the index of the row
    const TaskCategoriesToBeSubmitted = values.TaskCategories.filter(
      (item) => item.touched
    );

    if (TaskCategoriesToBeSubmitted.length > 0) {
      const payload: TaskCategoryUpdatePayload = {
        TaskCategories: TaskCategoriesToBeSubmitted,
      };

      updateTaskCategoriesMutation(payload);
    }
  };

  useEffect(() => {
    setMutate(deleteTaskCategoryMutation);
    setQueryResponse(taskCategoryQuery);
    if (currentPageData?.count !== undefined) {
      setRecordCount(currentPageData?.count || 0);
    }
    setFetchCount(!fetchCount);
    setCurrentData(currentData);
    setRefetchQuery(refetchQuery);
  }, [currentPageData?.count, data, page]);

  return (
    queryResponse && (
      <Formik
        initialValues={{
          TaskCategories: currentData,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={TaskCategoryArraySchema}
        validateOnChange={false}
      >
        {(formik) => <TaskCategoryFormArray formik={formik} />}
      </Formik>
    )
  );
};

export default TaskCategoryTable;
