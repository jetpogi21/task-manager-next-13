//Generated by WriteToUsemodelnametable_tsx - useModelNameTable.tsx
import { useTaskCategoriesQuery } from "@/hooks/task-categories/useTaskCategoryQuery";
import { useTaskCategoryStore } from "@/hooks/task-categories/useTaskCategoryStore";
import { useURL } from "@/hooks/useURL";
import {
  GetTaskCategoriesResponse,
  TaskCategorySearchParams,
} from "@/interfaces/TaskCategoryInterfaces";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { DEFAULT_SORT_BY } from "@/utils/constants/TagConstants";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useTaskCategoryTable = () => {
  const { query } = useURL<TaskCategorySearchParams>();
  const queryClient = useQueryClient();

  ///Local States

  //SearchParams Variables
  //Generated by GetAllSearchParamsBySeqModel
  const q = query["q"] || "";
  const sort = query["sort"] || DEFAULT_SORT_BY;
  const limit = query["limit"] || DEFAULT_LIMIT;

  //Page constants

  //Store Variables
  const page = useTaskCategoryStore((state) => state.page);
  const recordCount = useTaskCategoryStore((state) => state.recordCount);
  const setRecordCount = useTaskCategoryStore((state) => state.setRecordCount);
  const lastPage = useTaskCategoryStore((state) => state.lastPage);
  const setLastPage = useTaskCategoryStore((state) => state.setLastPage);
  const setPage = useTaskCategoryStore((state) => state.setPage);
  const fetchCount = useTaskCategoryStore((state) => state.fetchCount);
  const setFetchCount = useTaskCategoryStore((state) => state.setFetchCount);
  const setCurrentData = useTaskCategoryStore((state) => state.setCurrentData);
  const setQueryResponse = useTaskCategoryStore(
    (state) => state.setQueryResponse
  );
  const setRefetchQuery = useTaskCategoryStore(
    (state) => state.setRefetchQuery
  );

  const taskCategoryQuery = () =>
    useTaskCategoriesQuery({
      //Generated by GetAllFilterQueryNameBySeqModel
      q,
      sort,
      limit,
      fetchCount: fetchCount.toString(),
    });

  const { data, refetch } = taskCategoryQuery();

  //Client functions
  const refetchQuery = (idx: number) => {
    queryClient.setQueryData(
      [
        "taskCategories",
        {
          //Generated by GetAllFilterQueryNameBySeqModel
          q,
          sort,
          limit,
        },
      ],
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

  useEffect(() => {
    setQueryResponse(taskCategoryQuery);
    if (data) {
      const newPage = page === 0 ? 1 : page;
      const newLastPage = lastPage === 0 ? 1 : lastPage;
      setPage(newPage);
      setLastPage(newLastPage);

      const newPageArray = data.pages[newPage - 1];

      if (newPageArray) {
        const count = newPageArray.count;
        if (count) {
          setRecordCount(count);
        }

        if (fetchCount && count !== recordCount) {
          setFetchCount(false);
        }

        if (data.pages.length >= newPage) {
          setCurrentData(newPageArray.rows);
        }
      }

      setRefetchQuery(refetchQuery);
    }
  }, [data]);

  return null;
};