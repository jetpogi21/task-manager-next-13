export interface BasicModel {
  id: number | string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BreadcrumbLink {
  href: string;
  caption: string | number;
}

export type SortPair = [string, "asc" | "desc"];

export interface NameCaption {
  name: string;
  caption: string;
  asc?: string;
  desc?: string;
}

export interface SortObject {
  [key: string]: {
    caption: string;
    asc?: string;
    desc?: string;
  };
}

export interface SortOptions {
  sortedBy: SortPair;
  list: NameCaption[];
}

export interface SortOptionsAsString {
  sortedBy: string;
  sortObject: SortObject;
}

export interface ControlChoice {
  value: string;
  label: string;
}

export interface ListQuery {
  sort: string;
  page: string;
  limit: string;
}

export interface AxiosResult<T> {
  status: "success";
  data: {
    count: number;
    rows: T[];
  };
}

export interface RowSelection {
  [key: number]: boolean;
}

export type TouchedRows = string[];
