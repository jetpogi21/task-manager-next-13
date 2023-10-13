"use client";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import axiosClient from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface GetResponse<T extends BasicModel> {
  count: number;
  rows: T[];
  cursor: string;
}

const fetchModelList = async <U extends BasicModel>(
  endpoint: string,
  useName: boolean = false
) => {
  const { data } = await axiosClient.get<GetResponse<U>>(endpoint, {
    params: {
      fetchCount: "false",
      simpleOnly: "true",
    },
  });

  return data.rows.map((item) => ({
    ...item,
    id: !useName ? item.id : item.name,
    name: item.name,
  }));
};

interface UseListProps {
  placeholderData?: BasicModel[];
  useName?: boolean;
}

const useModelList = <T extends BasicModel>(
  endpoint: string,
  prop?: UseListProps
) => {
  //local states
  const [mounted, setMounted] = useState(false);

  const [storedData, setStoredData] = useLocalStorage<T[]>(endpoint, []);

  const { data } = useQuery({
    queryKey: [`${endpoint}-list`],
    queryFn: () => fetchModelList<T>(endpoint, prop?.useName),
    enabled: mounted && storedData.length === 0,
    placeholderData: prop?.placeholderData,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data) {
      setStoredData(data as T[]);
    }
  }, [data]);

  return storedData;
};

export default useModelList;
