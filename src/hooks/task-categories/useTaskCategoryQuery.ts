//Generated by WriteToUsemodelquery_ts - useModelQuery.ts
import {
  GetTaskCategoriesResponse,
  TaskCategoryFormUpdatePayload,
  TaskCategoryModel,
  TaskCategorySearchParams,
} from "@/interfaces/TaskCategoryInterfaces";
import axiosClient from "@/utils/api";
import {
  DEFAULT_FILTERS,
  PRIMARY_KEY,
} from "@/utils/constants/TaskCategoryConstants";
import { getAxiosParams } from "@/utils/utilities";
import {
  QueryMeta,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

const BASE_URL = "task-categories";

type IndexAndID = {
  index: number;
  id: number | string;
};

type Response = {
  id?: number | string;
  slug?: string;
  //Generated by GetAllRelatedIndexAndID
  Tasks: IndexAndID[];
  TaskTemplates: IndexAndID[];
};

const updateTaskCategory = async (
  payload: TaskCategoryFormUpdatePayload,
  id: string | number
) => {
  const { data } = await axiosClient({
    url: BASE_URL + "/" + id,
    method: "put",
    data: payload,
  });

  return data as Response;
};

const addTaskCategory = async (payload: TaskCategoryFormUpdatePayload) => {
  const { data } = await axiosClient({
    url: BASE_URL,
    method: "post",
    data: payload,
  });

  return data as Response;
};

export const getTaskCategory = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const { data } = await axiosClient.get<TaskCategoryModel>(
    `${BASE_URL}/${queryKey[1]}`
  );
  return data;
};

const addOrUpdateTaskCategory = (payload: TaskCategoryFormUpdatePayload) => {
  if (payload[PRIMARY_KEY]) {
    return updateTaskCategory(payload, payload[PRIMARY_KEY]);
  } else {
    return addTaskCategory(payload);
  }
};

export const useTaskCategoryQuery = (
  slug: string,
  options?: Parameters<typeof useQuery>[2]
) => {
  const taskCategoryMutation = useMutation(addOrUpdateTaskCategory);

  const taskCategoryQuery = useQuery(
    ["taskCategory", slug],
    getTaskCategory,
    //@ts-ignore
    options
  ) as UseQueryResult<TaskCategoryModel, any>;

  return { taskCategoryMutation, taskCategoryQuery };
};

//Generated by GetCodeOriginallyFromModelTable - GetCodeOriginallyFromModelTable
interface GetTaskCategoriesProps {
  pageParam?: string;
  queryKey: [string, Partial<TaskCategorySearchParams>];
  meta: QueryMeta | undefined;
}
const getTaskCategories = async ({
  pageParam = "",
  queryKey,
  meta,
}: GetTaskCategoriesProps) => {
  const [
    _,
    {
      //Generated by GetAllQueryKeyValueOfGetPluralizedModelName
      q = "", //Generated by GetQueryKeyValueOfGetPluralizedModelName - GetQueryKeyValueOfGetPluralizedModelName
      limit = "",
      sort = "",
    },
  ] = queryKey;

  const { fetchCount } = meta!;

  const axiosParams = getAxiosParams(
    {
      //Generated by GetAllFilterQueryNameBySeqModel
      q,
    },
    DEFAULT_FILTERS,
    {
      cursor: pageParam,
      limit,
      sort,
      //@ts-ignore
      fetchCount: fetchCount.toString(),
    }
  ) as Partial<TaskCategorySearchParams>;

  const { data } = await axiosClient.get<GetTaskCategoriesResponse>(
    `taskCategories`,
    {
      params: axiosParams,
    }
  );

  return data;
};

interface UseTaskCategoriesQueryProps
  extends Partial<TaskCategorySearchParams> {}

export const useTaskCategoriesQuery = ({
  //Generated by GetAllFilterQueryNameBySeqModel
  q,
  limit,
  sort,
  fetchCount,
}: UseTaskCategoriesQueryProps) => {
  const _ = useInfiniteQuery(
    [
      "taskCategories",
      {
        //Generated by GetAllFilterQueryNameBySeqModel
        q,
        limit,
        sort,
      },
    ],
    getTaskCategories,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
      meta: {
        fetchCount,
      },
    }
  );
  return _;
};
