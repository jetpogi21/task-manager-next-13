//Generated by WriteToUsemodelquery_ts - useModelQuery.ts
import {
  TaskTemplateFormUpdatePayload,
  TaskTemplateModel,
} from "@/interfaces/TaskTemplateInterfaces";
import axiosClient from "@/utils/api";
import { PRIMARY_KEY } from "@/utils/constants/TaskTemplateConstants";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = "task-templates";

type IndexAndID = {
  index: number;
  id: number | string;
};

type Response = {
  id?: number | string;
  slug?: string;
  //Generated by GetAllRelatedIndexAndID
  SubTaskTemplates: IndexAndID[];
  Tasks: IndexAndID[];
};

const updateTaskTemplate = async (
  payload: TaskTemplateFormUpdatePayload,
  id: string | number
) => {
  const { data } = await axiosClient({
    url: BASE_URL + "/" + id,
    method: "put",
    data: payload,
  });

  return data as Response;
};

const addTaskTemplate = async (payload: TaskTemplateFormUpdatePayload) => {
  const { data } = await axiosClient({
    url: BASE_URL,
    method: "post",
    data: payload,
  });

  return data as Response;
};

export const getTaskTemplate = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const { data } = await axiosClient.get<TaskTemplateModel>(
    `${BASE_URL}/${queryKey[1]}`
  );
  return data;
};

const addOrUpdateTaskTemplate = (payload: TaskTemplateFormUpdatePayload) => {
  if (payload[PRIMARY_KEY]) {
    return updateTaskTemplate(payload, payload[PRIMARY_KEY]);
  } else {
    return addTaskTemplate(payload);
  }
};

export const useTaskTemplateQuery = (
  slug: string,
  options?: Parameters<typeof useQuery>[2]
) => {
  const taskTemplateMutation = useMutation(addOrUpdateTaskTemplate);

  const taskTemplateQuery = useQuery(
    ["taskTemplate", slug],
    getTaskTemplate,
    //@ts-ignore
    options
  ) as UseQueryResult<TaskTemplateModel, any>;

  return { taskTemplateMutation, taskTemplateQuery };
};
