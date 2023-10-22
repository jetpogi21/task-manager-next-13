import { GetModelsResponse } from "@/interfaces/GeneralInterfaces";

export const getCurrentData = <T>(
  currentPageData: GetModelsResponse<T> | null,
  previousData: Record<string, unknown>[],
  defaultFormValue?: any
): Record<string, unknown>[] => {
  let currentData: Record<string, unknown>[] = [];

  if (currentPageData === null) {
    currentData = previousData;
  } else if (defaultFormValue) {
    currentData =
      currentPageData?.rows.map((item, index) => ({
        ...item,
        touched: false,
        index,
      })) || [];
  } else {
    //@ts-ignore
    currentData = currentPageData?.rows || [];
  }

  if (defaultFormValue) {
    currentData.push({
      ...defaultFormValue,
      touched: false,
      index: currentData.length - 1,
    });
  }

  return currentData;
};
