//Generated by WriteToUsemodelpageparams_tsx - useModelPageParams.tsx
import { useURL } from "@/hooks/useURL";
import { TaskSearchParams } from "@/interfaces/TaskInterfaces";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { DEFAULT_SORT_BY } from "@/utils/constants/TaskConstants";

export const useTaskPageParams = () => {
  const { query, pathname, router } = useURL<TaskSearchParams>();

  //Generated by GetAllSearchParamsBySeqModel
  const q = query["q"] || "";
  const taskCategory = query["taskCategory"] || "";
  const taskInterval = query["taskInterval"] || "";
  const isFinished = query["isFinished"] || "";
  const sort = query["sort"] || DEFAULT_SORT_BY;
  const limit = query["limit"] || DEFAULT_LIMIT;

  return {
    query,
    pathname,
    router,
    params: {
      //Generated by GetAllFilterQueryNameBySeqModel
      q,
      taskCategory,
      taskInterval,
      isFinished,
      sort,
      limit,
    },
  };
};