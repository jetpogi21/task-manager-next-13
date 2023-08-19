export interface JSONResponse {
  status: "error" | "success";
  data?: any;
  error?: string;
  errorCode?: number;
  sqlMessage?: string;
  targetField?: string;
}

export interface SQLField {
  name: string;
  tableName?: string;
  alias?: string;
  pluralForm?: string;
  raw?: boolean;
}

export interface SQLTable {
  name: string;
  alias: string;
  isSQL?: boolean;
}

export interface SQLJoin {
  table: string;
  alias?: string;
  connectorRight?: string;
  connectorLeft?: string;
  joinType?: string;
  isSQL?: boolean;
}

export interface QueryResult
  extends Record<string, string | number | boolean | QueryResult> {}

export interface ReplacementObject {
  [key: string]: string | number | number[] | string[];
}

export interface ListQuery {
  cursor: string;
  sort: string;
  limit: string;
  simpleOnly: string;
  fetchCount: string;
}
