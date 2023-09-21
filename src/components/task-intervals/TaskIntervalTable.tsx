//Generated by WriteToModeltable_tsx - ModelTable.tsx
"use client";
import React, { useEffect } from "react";
import { useTaskIntervalStore } from "@/hooks/task-intervals/useTaskIntervalStore";
import {
  TaskIntervalFormikInitialValues,
  TaskIntervalUpdatePayload,
  GetTaskIntervalsResponse,
  TaskIntervalFormikShape,
} from "@/interfaces/TaskIntervalInterfaces";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Formik } from "formik";
import { TaskIntervalArraySchema } from "@/schema/TaskIntervalSchema";
import { toast } from "@/hooks/use-toast";
import {
  DEFAULT_FORM_VALUE,
  VARIABLE_PLURAL_NAME,
} from "@/utils/constants/TaskIntervalConstants";
import { useTaskIntervalDeleteDialog } from "@/hooks/task-intervals/useTaskIntervalDeleteDialog";
import TaskIntervalFormArray from "@/components/task-intervals/TaskIntervalFormArray";
import {
  deleteTaskIntervals,
  updateTaskIntervals,
  useTaskIntervalsQuery,
} from "@/hooks/task-intervals/useTaskIntervalQuery";
import { useTaskIntervalPageParams } from "@/hooks/task-intervals/useTaskIntervalPageParams";

const TaskIntervalTable: React.FC = () => {
  const { params: queryParams } = useTaskIntervalPageParams();
  const queryClient = useQueryClient();

  //Page constants
  const DEFAULT_TASKINTERVAL = DEFAULT_FORM_VALUE;

  //Store Variables
  const recordCount = useTaskIntervalStore((state) => state.recordCount);
  const previousData = useTaskIntervalStore((state) => state.currentData);
  const setRecordCount = useTaskIntervalStore((state) => state.setRecordCount);
  const page = useTaskIntervalStore((state) => state.page);
  const fetchCount = useTaskIntervalStore((state) => state.fetchCount);
  const setFetchCount = useTaskIntervalStore((state) => state.setFetchCount);
  const queryResponse = useTaskIntervalStore((state) => state.queryResponse);
  const resetRowSelection = useTaskIntervalStore(
    (state) => state.resetRowSelection
  );
  const setCurrentData = useTaskIntervalStore((state) => state.setCurrentData);
  const setIsUpdating = useTaskIntervalStore((state) => state.setIsUpdating);
  const setQueryResponse = useTaskIntervalStore(
    (state) => state.setQueryResponse
  );
  const setRefetchQuery = useTaskIntervalStore(
    (state) => state.setRefetchQuery
  );

  const [setRecordsToDelete, setIsDialogLoading, setMutate] =
    useTaskIntervalDeleteDialog((state) => [
      state.setRecordsToDelete,
      state.setIsDialogLoading,
      state.setMutate,
    ]);

  //API Functions

  //Tanstacks
  const taskIntervalQuery = () =>
    useTaskIntervalsQuery({
      ...queryParams,
      fetchCount: fetchCount.toString(),
    });

  const { data, refetch, isFetching } = taskIntervalQuery();

  const currentPageData: GetTaskIntervalsResponse | null = data
    ? data.pages[page - (isFetching ? 2 : 1)]
    : null;
  const currentData: TaskIntervalFormikShape[] =
    currentPageData === null
      ? previousData
      : currentPageData?.rows.map((item, index) => ({
          ...item,
          touched: false,
          index,
        })) || [];

  currentData.push({
    ...DEFAULT_TASKINTERVAL,
    touched: false,
    index: currentData.length - 1,
  });

  //Client functions
  const refetchQuery = (idx: number) => {
    queryClient.setQueryData(
      [VARIABLE_PLURAL_NAME, { ...queryParams }],
      (data: InfiniteData<GetTaskIntervalsResponse> | undefined) => {
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

  // Usage for deleteTaskIntervalMutation
  const deleteTaskIntervalMutation = useHandleMutation(
    deleteTaskIntervals,
    (data) => {
      return "Task Interval(s) deleted successfully";
    },
    (recordCount, data) => {
      return recordCount - (data.recordsDeleted || 0);
    }
  );

  // Usage for updateTaskIntervals
  const updateTaskIntervalsMutation = useHandleMutation(
    updateTaskIntervals,
    (data) => {
      return "Task Interval list updated successfully";
    },
    (recordCount, data) => {
      return (
        recordCount + (data.recordsCreated || 0) - (data.recordsDeleted || 0)
      );
    }
  );

  //Client Actions
  const handleSubmit = async (values: TaskIntervalFormikInitialValues) => {
    //The reference is the index of the row
    const TaskIntervalsToBeSubmitted = values.TaskIntervals.filter(
      (item) => item.touched
    );

    if (TaskIntervalsToBeSubmitted.length > 0) {
      const payload: TaskIntervalUpdatePayload = {
        TaskIntervals: TaskIntervalsToBeSubmitted,
      };

      updateTaskIntervalsMutation(payload);
    }
  };

  useEffect(() => {
    setMutate(deleteTaskIntervalMutation);
    setQueryResponse(taskIntervalQuery);
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
          TaskIntervals: currentData,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={TaskIntervalArraySchema}
        validateOnChange={false}
      >
        {(formik) => <TaskIntervalFormArray formik={formik} />}
      </Formik>
    )
  );
};

export default TaskIntervalTable;
