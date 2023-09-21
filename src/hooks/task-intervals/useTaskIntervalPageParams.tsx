//Generated by WriteToUsemodelpageparams_tsx - useModelPageParams.tsx
import { useURL } from "@/hooks/useURL";
import { TaskIntervalSearchParams } from "@/interfaces/TaskIntervalInterfaces";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { DEFAULT_SORT_BY } from "@/utils/constants/TaskIntervalConstants";

export const useTaskIntervalPageParams = () => {
  const { query, pathname, router } = useURL<TaskIntervalSearchParams>();

  //Generated by GetAllSearchParamsBySeqModel
  const q = query["q"] || "";
  const sort = query["sort"] || DEFAULT_SORT_BY;
  const limit = query["limit"] || DEFAULT_LIMIT;

  return {
    query,
    pathname,
    router,
    params: {
      //Generated by GetAllFilterQueryNameBySeqModel
      q,
      sort,
      limit,
    },
  };
};