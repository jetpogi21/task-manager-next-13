//Generated by GetuseModelListts - useModelList.ts
"use client";
import { GetTagsResponse } from "@/interfaces/TagInterfaces";
import { TagSearchParams } from "@/interfaces/TagInterfaces";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import axiosClient from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getTags = async () => {
  const { data } = await axiosClient.get<GetTagsResponse>(`tags`, {
    params: {
      fetchCount: "false",
      simpleOnly: "true",
    } as Partial<TagSearchParams>,
  });

  return data.rows.map((item) => ({
    id: item.id,
    name: item.id,
  }));
};

interface UseListProps {
  placeholderData?: BasicModel[];
}

const useTagList = (prop?: UseListProps) => {
  //local states
  const [mounted, setMounted] = useState(false);

  const _ = useQuery({
    queryKey: ["tag-list"],
    queryFn: getTags,
    enabled: mounted,
    placeholderData: prop?.placeholderData,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return _;
};

export default useTagList;