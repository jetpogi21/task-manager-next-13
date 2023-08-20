//Generated by GetuseModelListts - useModelList.ts
"use client";
import { GetTaskIntervalsResponse } from "@/interfaces/TaskIntervalInterfaces";
import { TaskIntervalSearchParams } from "@/interfaces/TaskIntervalInterfaces";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import axiosClient from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getTaskIntervals = async () => {
  const { data } = await axiosClient.get<GetTaskIntervalsResponse>(
    `task-intervals`,
    {
      params: {
        fetchCount: "false",
        simpleOnly: "true",
      } as Partial<TaskIntervalSearchParams>,
    }
  );

  return data.rows.map((item) => ({
    id: item.id,
    name: item.name,
  }));
};

interface UseListProps {
  placeholderData?: BasicModel[];
}

const useTaskIntervalList = (prop?: UseListProps) => {
  //local states
  const [mounted, setMounted] = useState(false);

  const _ = useQuery({
    queryKey: ["taskInterval-list"],
    queryFn: getTaskIntervals,
    enabled: mounted,
    placeholderData: prop?.placeholderData,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return _;
};

export default useTaskIntervalList;
