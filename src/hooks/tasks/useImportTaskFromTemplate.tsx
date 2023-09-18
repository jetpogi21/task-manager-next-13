import axiosClient from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

interface AddFromTemplatesResponse {
  data: { data: "success" | "error" };
}

type onSuccessProp = (data: AddFromTemplatesResponse["data"]) => void;

const addFromTemplates = async () => {
  const { data } = (await axiosClient({
    url: "tasks/add-from-templates",
    method: "post",
  })) as AddFromTemplatesResponse;

  return data;
};

export const useImportTaskFromTemplate = (onSuccess?: onSuccessProp) => {
  const _ = useMutation({
    mutationFn: addFromTemplates,
    onSuccess: (data) => {
      if (data.data === "success") {
        onSuccess && onSuccess(data);
      }
    },
  });

  return _;
};
