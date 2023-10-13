//Generated by WriteToUsemodelstore_ts - useModelStore.ts
import { TaskModel } from "@/interfaces/TaskInterfaces";
import { Slice, modelSlice } from "@/lib/zustand-slice";
import { TaskConfig } from "@/utils/config/TaskConfig";
import { create } from "zustand";

const useTaskStore = create<Slice<TaskModel>>((set) =>
  modelSlice<TaskModel>(set, TaskConfig.sortString)
);

export { useTaskStore };
