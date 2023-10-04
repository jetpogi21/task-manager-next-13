//Generated by WriteToModeltable_tsx - ModelTable.tsx
"use client";
import React, { useEffect } from "react";
import { useTagStore } from "@/hooks/tags/useTagStore";
import {
  TagFormikInitialValues,
  TagUpdatePayload,
  GetTagsResponse,
  TagFormikShape,
} from "@/interfaces/TagInterfaces";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Formik } from "formik";
import { TagArraySchema } from "@/schema/TagSchema";
import { toast } from "@/hooks/use-toast";
import {
  DEFAULT_FORM_VALUE,
  VARIABLE_PLURAL_NAME,
} from "@/utils/constants/TagConstants";
import { useTagDeleteDialog } from "@/hooks/tags/useTagDeleteDialog";
import TagFormArray from "@/components/tags/TagFormArray";
import { deleteTags, updateTags, useTagsQuery } from "@/hooks/tags/useTagQuery";
import { useTagPageParams } from "@/hooks/tags/useTagPageParams";

const TagTable: React.FC = () => {
  const { params: queryParams } = useTagPageParams();
  const queryClient = useQueryClient();

  //Page constants
  const DEFAULT_TAG = DEFAULT_FORM_VALUE;

  //Store Variables
  const recordCount = useTagStore((state) => state.recordCount);
  const previousData = useTagStore((state) => state.currentData);
  const setRecordCount = useTagStore((state) => state.setRecordCount);
  const page = useTagStore((state) => state.page);
  const fetchCount = useTagStore((state) => state.fetchCount);
  const setFetchCount = useTagStore((state) => state.setFetchCount);
  const queryResponse = useTagStore((state) => state.queryResponse);
  const resetRowSelection = useTagStore((state) => state.resetRowSelection);
  const setCurrentData = useTagStore((state) => state.setCurrentData);
  const setIsUpdating = useTagStore((state) => state.setIsUpdating);
  const setQueryResponse = useTagStore((state) => state.setQueryResponse);
  const setRefetchQuery = useTagStore((state) => state.setRefetchQuery);

  const [setRecordsToDelete, setIsDialogLoading, setMutate] =
    useTagDeleteDialog((state) => [
      state.setRecordsToDelete,
      state.setIsDialogLoading,
      state.setMutate,
    ]);

  //API Functions

  //Tanstacks
  const useTagSearchQuery = () =>
    useTagsQuery({
      ...queryParams,
      fetchCount: fetchCount.toString(),
    });

  const { data, refetch, isFetching } = useTagSearchQuery();

  const currentPageData: GetTagsResponse | null = data
    ? data.pages[page - (isFetching ? 2 : 1)]
    : null;
  const currentData: TagFormikShape[] =
    currentPageData === null
      ? previousData
      : currentPageData?.rows.map((item, index) => ({
          ...item,
          touched: false,
          index,
        })) || [];

  currentData.push({
    ...DEFAULT_TAG,
    touched: false,
    index: currentData.length - 1,
  });

  //Client functions
  const refetchQuery = (idx: number) => {
    queryClient.setQueryData(
      [VARIABLE_PLURAL_NAME, { ...queryParams }],
      (data: InfiniteData<GetTagsResponse> | undefined) => {
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

  // Usage for deleteTagMutation
  const deleteTagMutation = useHandleMutation(
    deleteTags,
    (data) => {
      return "Tag(s) deleted successfully";
    },
    (recordCount, data) => {
      return recordCount - (data.recordsDeleted || 0);
    }
  );

  // Usage for updateTags
  const updateTagsMutation = useHandleMutation(
    updateTags,
    (data) => {
      return "Tag list updated successfully";
    },
    (recordCount, data) => {
      return (
        recordCount + (data.recordsCreated || 0) - (data.recordsDeleted || 0)
      );
    }
  );

  //Client Actions
  const handleSubmit = async (values: TagFormikInitialValues) => {
    //The reference is the index of the row
    const TagsToBeSubmitted = values.Tags.filter((item) => item.touched);

    if (TagsToBeSubmitted.length > 0) {
      const payload: TagUpdatePayload = {
        Tags: TagsToBeSubmitted,
      };

      updateTagsMutation(payload);
    }
  };

  useEffect(() => {
    setMutate(deleteTagMutation);
    setQueryResponse(useTagSearchQuery);
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
          Tags: currentData,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={TagArraySchema}
        validateOnChange={false}
      >
        {(formik) => <TagFormArray formik={formik} />}
      </Formik>
    )
  );
};

export default TagTable;
