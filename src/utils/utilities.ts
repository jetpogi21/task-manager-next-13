//Generated by CopyUtilsFolder
import { ParsedUrlQuery, ParsedUrlQueryInput } from "querystring";
import {
  BasicModel,
  ColumnAttrs,
  ControlChoice,
  SortItem,
  SortObject,
  SortOptions,
  SortOptionsAsString,
  SortPair,
} from "../interfaces/GeneralInterfaces";
import { NextRouter } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { encodeParams } from "@/utils/utils";
import Decimal from "decimal.js";
import { DataType, ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";

//expected: year,month or -year,-month
export const getSortedBy = (
  params: Record<string, string>,
  defaultValue: string
): string => {
  let sort = params.sort;

  if (sort !== undefined) {
    if (Array.isArray(sort)) {
      return sort.join(",");
    } else {
      return sort;
    }
  } else {
    return defaultValue;
  }
};

export const getSorting = (sortParam: string) => {
  const desc = sortParam.includes("-");
  const id = desc ? sortParam.slice(1) : sortParam;
  return [{ id, desc }];
};

export function setQueryStringParam(
  params: Record<string, unknown>,
  name: string,
  value: string | string[]
): void {
  params[name] = value;
}

export const getFirstItem = (
  value: string | string[] | undefined,
  defaultValue: string
) => {
  if (!value) {
    return defaultValue;
  }
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value.length > 1) {
    return value[0];
  }
  return defaultValue;
};

export const getFiltersFromParams = (params: URLSearchParams) => {
  const filtersToKeep = new Set(["sort", "asc"]);
  const newFilters: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(params)) {
    if (!filtersToKeep.has(key)) {
      newFilters[key] = value;
    }
  }
  return newFilters;
};

export const getSortFromParams = (
  params: URLSearchParams,
  acceptedNames: string[]
) => {
  const acceptedNamesSet = new Set(acceptedNames);
  const sort: { name?: string; asc?: boolean } = {};

  for (let [key, value] of Object.entries(params)) {
    if (key === "sort") {
      if (acceptedNamesSet.has(value)) {
        sort["name"] = value;
      }
    } else if (key === "asc") {
      sort["asc"] = value === "1";
    }
  }

  return sort;
};

export const getFilterValueFromURL = (
  searchParams: Record<string, unknown>,
  defaultValue: Record<string, unknown>
) => {
  const newValue = JSON.parse(JSON.stringify(defaultValue));
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) {
        if (Array.isArray(defaultValue[key])) {
          if (Array.isArray(value)) {
            newValue[key] = value.map((item) => ({ id: item }));
          } else if (typeof value === "string") {
            newValue[key] = value.split(",").map((item) => {
              return item.trim();
            });
          } else {
            newValue[key] = [{ id: value }];
          }
        } else if (typeof defaultValue[key] === "boolean") {
          newValue[key] = value === "true";
        } else {
          newValue[key] = value;
        }
      }
    }
  }

  return newValue;
};

//This will convert the date to current timezone
export const toValidDateTime = (date: Date) => {
  const padZeroes = (str: number) => {
    return ("00" + str).slice(-2);
  };

  const month = padZeroes(date.getMonth() + 1);
  const day = padZeroes(date.getDate());
  const fullYear = date.getFullYear();
  const hours = padZeroes(date.getHours());
  const minutes = padZeroes(date.getMinutes());
  const seconds = padZeroes(date.getSeconds());

  return `${fullYear}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const convertDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const convertStringToLocaleString = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

export const convertStringToDate = (dateStr: string) => {
  const date = new Date(Date.parse(dateStr));
  const adjustedDate = new Date(date.toLocaleString());
  return adjustedDate;
};

interface GenericObject {
  [key: string]: unknown;
}

//Produces the object that will be passed to the axios API.
export const getAxiosParams = (
  searchParams: Record<string, string>,
  defaultValue: Record<string, unknown>,
  additionalParams: Record<string, string>
) => {
  // This line creates a copy of the defaultValue object using the Object.assign method
  const result: Record<string, unknown> = Object.assign({}, defaultValue);

  for (const [key, value] of Object.entries(searchParams)) {
    // Use a type guard to check if key is one of the properties of result
    if (key in result) {
      if (value) {
        switch (typeof value) {
          case "object":
            // If the value is not null, it means it is an array
            if (value !== null) {
              // This line assigns the result object at the key property a new array that contains either the value itself if it is an array or a single-element array with the value
              result[key] = Array.isArray(value) ? [...value] : [value];
            }
            break;
          // If the value is a boolean, it means it is either true or false
          case "boolean":
            // This line assigns the result object at the key property the value itself
            result[key] = value;
            break;
          // If the value is a string, it means it is anything else
          case "string":
            // This line assigns the result object at the key property the value itself
            result[key] = value;
            break;
        }
      }
    }
  }

  for (const [key, value] of Object.entries(additionalParams)) {
    if (value) {
      result[key] = value;
    }
  }

  // This line creates a new object from the entries of the result object that pass a filter function using the Object.fromEntries method
  return Object.fromEntries(
    // This line filters out the entries that have falsy or "all" values using the Array.filter method
    Object.entries(result).filter(([key, value]) => value && value !== "all")
  );
};

export const getParamsObject = (
  values: Record<string, unknown>,
  defaultValue: Record<string, unknown>
): Record<string, string> => {
  // Create a new object to store the transformed values
  console.log(values);

  const result: Record<string, string> = {};

  // Loop through the entries of the values object
  for (const [key, value] of Object.entries(values)) {
    // Skip the entry if the key is "page" or the value is "all"
    if (key === "page" || value === "all") {
      continue;
    }

    // Check if the default value for the key is an array
    if (Array.isArray(defaultValue[key])) {
      // Check if the value is also an array and not empty
      if (Array.isArray(value) && value.length > 0) {
        // Map the value to an array of ids or items
        result[key] = value
          .map((item) => (item.hasOwnProperty("id") ? item.id : item))
          .join(",");
      } else {
        result[key] = "";
      }
    } else if (typeof defaultValue[key] === "boolean" && value) {
      result[key] = "true";
    } else if (typeof value === "object" && value !== null && "id" in value) {
      result[key] = value.id as string;
    } else if (typeof value === "number") {
      result[key] = value.toString();
    } else if (value instanceof Date) {
      result[key] = encodeURIComponent(convertDateToYYYYMMDD(value));
    } else {
      // Check if the value is a string and not empty
      if (typeof value === "string" && value) {
        // Keep the value as a string
        result[key] = value;
      } else {
        result[key] = "";
      }
    }
  }

  // Return the result object
  return result;
};

//Lookup Ids from object
export function supplyMissingNames(array1: BasicModel[], array2: BasicModel[]) {
  // Create a map from id to name for the first array
  const nameMap = new Map(array1.map((obj) => [obj.id, obj.name]));

  // Loop through the second array and update the name property with the map value if it exists
  if (array2) {
    array2.forEach((obj) => {
      const name =
        typeof obj.id === "string"
          ? nameMap.get(parseInt(obj.id))
          : nameMap.get(obj.id);
      if (name) {
        obj.name = name;
      }
    });
  }
}

// append an array of objects to another array of objects in JavaScript and also change the keys of the objects.
//Produces this shape for the MUI Controls
/* [
  { value: 'all', label: 'all' },
  { value: 'character', label: 'character' },
  { value: 'Weapon', label: 'Weapon' },
  { value: 'Power', label: 'Power' },
  { value: 'Tactic', label: 'Tactic' }
] */
export function ConvertBasicModelToControlChoice(
  arr1: ControlChoice[],
  arr2: BasicModel[]
) {
  // Loop through the second array and push each object to the first array
  for (let i = 0; i < arr2.length; i++) {
    //@ts-ignore
    arr1.push(arr2[i]);
  }

  const newArr = arr1.map((obj) => {
    return {
      //@ts-ignore
      value: obj.id || obj.value,
      //@ts-ignore
      label: obj.name || obj.label,
    };
  });

  return newArr;
}

/* [{ value: "all", label: "all" }, { value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }, { value: "6", label: "6" }] */
export function ConvertNumberArrToControlChoice(
  arr1: ControlChoice[],
  arr2: number[]
) {
  //@ts-ignore
  let arr3 = arr1.concat(arr2);

  // Add extra properties to the elements of the second array
  let arr4 = arr3.map(function (item) {
    // Check if the item is a number
    if (typeof item === "number") {
      // Convert it to a string and set as value and label
      //@ts-ignore
      return { value: item.toString(), label: item.toString() };
    } else {
      // Return the item unchanged
      return item;
    }
  });

  return arr4;
}

export function modifySort(
  name: string,
  sortOptions: SortOptions,
  router: NextRouter,
  query: Record<string, unknown>
) {
  if (name === sortOptions.sortedBy[0]) {
    const value = sortOptions.sortedBy[1] === "desc" ? name : `-${name}`;
    setQueryStringParam(query, "sort", value);
  } else {
    setQueryStringParam(query, "sort", name);
  }
  // You can use the updated params object to update the URL or perform other actions
  const queryAsURLInput = query as ParsedUrlQueryInput;
  router.push({ pathname: router.pathname, query: queryAsURLInput });
}

export function modifySortAsString(
  name: string,
  sortOptions: SortOptionsAsString,
  router: AppRouterInstance,
  query: Record<string, unknown>,
  pathname: string
) {
  const sortObject = sortOptions.sortObject;

  if (sortObject[name].asc === query.sort) {
    setQueryStringParam(query, "sort", sortObject[name].desc || `-${name}`);
  } else if (sortObject[name].desc === query.sort || query.sort === undefined) {
    setQueryStringParam(query, "sort", sortObject[name].asc || name);
  }

  console.log({ sort: query.sort });

  const queryAsURLInput = query as Record<string, string>;
  router.push(`${pathname}?${encodeParams(queryAsURLInput)}`);
}

export function modifyLimit(
  value: string,
  router: AppRouterInstance,
  query: Record<string, unknown>,
  pathname: string
) {
  setQueryStringParam(query, "limit", value);
  delete query["page"];
  // You can use the updated params object to update the URL or perform other actions
  const queryAsURLInput = query as Record<string, string>;
  router.push(`${pathname}?${encodeParams(queryAsURLInput)}`);
}

export function findNameById(value: string, array: BasicModel[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == value) {
      return array[i].name;
    }
  }
  return null; // Return null if no matching id is found
}

export function truncateString(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + "...";
  } else {
    return text;
  }
}

export function formatCurrency(amount: number | string): string {
  const parsedAmount: number =
    typeof amount === "string" ? parseFloat(amount.replace(",", "")) : amount;
  return parsedAmount.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });
}

export function formatCurrencyFromString(amountStr: string): string {
  return parseFloat(amountStr.replace(",", "")).toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });
}

export function parseAsValidFloat(amount: string | undefined): number | null {
  const strippedAmount = amount?.replaceAll(",", "");
  const parsedAmount = strippedAmount ? parseFloat(strippedAmount) : NaN;

  return Number.isFinite(parsedAmount) ? parsedAmount : null;
}

export function isValidCurrency(amountStr: string): boolean {
  // Remove any unnecessary characters from the amount string
  const strippedAmountStr = amountStr.replace(/[^0-9.,]/g, "");

  // Try to convert the string to a float
  const amount = parseFloat(strippedAmountStr);

  // Check if the conversion was successful and the amount is a number greater than 0
  if (!isNaN(amount)) {
    return true;
  } else {
    return false;
  }
}

export function getCurrentMonthBeginningDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month.toString();
  const beginningDate = `${year}-${formattedMonth}-01`;

  return beginningDate;
}

export const isValidDate = (dateString?: string): boolean => {
  return !!dateString && !isNaN(Date.parse(dateString));
};

export const getCurrentMonthNumber = () => {
  return new Date().getMonth() + 1;
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export function formatFileSize(size: number): string {
  if (size < 0) {
    throw new Error("Size must be a non-negative number.");
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export function getHighestOrder<T extends Record<string, unknown>>(
  list: T[],
  field: keyof T
) {
  return list.reduce<Decimal | null>((highest, item) => {
    const fieldValue = item[field];

    // Handle null, undefined, and NaN values by setting them to 0
    const numericValue =
      fieldValue != null && !Number.isNaN(fieldValue) ? fieldValue : 0;

    const orderAsNumber = new Decimal(numericValue as number);

    if (highest === null || orderAsNumber.greaterThan(highest)) {
      return orderAsNumber;
    } else {
      return highest;
    }
  }, null);
}

export function replaceHighestOrder<T extends Record<string, unknown>>(
  list: T[],
  field: keyof T
) {
  const highestOrder = getHighestOrder(list, field) || 0;
  return new Decimal(highestOrder).add("0.01");
}

export function forceCastToNumber(input: number | string): number {
  // Remove any commas from the string and trim whitespace
  const cleanedInput =
    typeof input === "string"
      ? input.replace(/,/g, "").trim()
      : input.toString();

  // Parse the cleaned input as a number
  const result = parseFloat(cleanedInput);

  // Check if the result is a valid number (not NaN)
  if (!isNaN(result)) {
    return result;
  } else {
    throw new Error("An error has occurred");
  }
}

export function chunkArray<T>(array: T[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export const getCursor = (
  data: any[],
  sortField: string,
  primaryKey: string
) => {
  if (data && data.length > 0) {
    //The cursor will have 2 items since there will be 2 cursors to be made
    if (sortField !== primaryKey) {
      if (data[data.length - 1][sortField] === null) {
        return `-${data[data.length - 1][primaryKey].toString()}`;
      } else {
        return `${data[data.length - 1][sortField].toString()}-${data[
          data.length - 1
        ][primaryKey].toString()}`;
      }
    } else {
      return `${data[data.length - 1][sortField].toString()}`;
    }
  }
};

export const getSortItems = <T extends ModelConfig>(config: T): SortItem[] =>
  config.sorts
    .filter(({ modelSortOrder }) => modelSortOrder)
    .sort(
      ({ modelSortOrder: sortOrderA }, { modelSortOrder: sortOrderB }) =>
        sortOrderA - sortOrderB
    )
    .map(({ modelFieldCaption, seqModelFieldID }) => {
      const fieldName = findConfigItem(
        config.fields,
        "seqModelFieldID",
        seqModelFieldID,
        "fieldName"
      ) as string;

      return {
        caption: modelFieldCaption,
        value: fieldName,
      };
    });

export const findConfigItem = <T, K extends keyof T>(
  configField: T[],
  key: K,
  valueToMatch: T[K],
  fieldToFetch: K
): T[K] | undefined => {
  const found = configField.find((fld) => fld[key] === valueToMatch);

  if (!found) {
    return undefined;
  }

  return found[fieldToFetch];
};

export const getColumnAlignment = (
  dataType: DataType,
  relatedModelID: number | null,
  dataTypeInterface: string
) => {
  if (dataType === "BOOLEAN") {
    return "center";
  }

  if (dataTypeInterface === "number" && !relatedModelID) {
    return "right";
  }

  return "left";
};

export const getDefaultFilters = <T>(filters: ModelConfig["filters"]) => {
  const defaultFilters: Partial<T> = {};
  filters
    .filter((item) => item.filterOrder)
    .sort((item_A, item_B) => item_A.filterOrder - item_B.filterOrder)
    .forEach((item) => {
      if (item.controlType === "DateRangePicker") {
        //@ts-ignore
        defaultFilters[item.filterQueryName + "From"] = "";
        //@ts-ignore
        defaultFilters[item.filterQueryName + "To"] = "";
      } else if (item.controlType === "Switch") {
        //@ts-ignore
        defaultFilters[item.filterQueryName] = false;
      } else {
        //@ts-ignore
        defaultFilters[item.filterQueryName] = "";
      }
    });

  return defaultFilters;
};

export const isValidSortField = (
  sortField: string,
  config: ModelConfig
): boolean => {
  return config.sorts.some(({ seqModelFieldID }) => {
    const fieldName = findConfigItem(
      config.fields,
      "seqModelFieldID",
      seqModelFieldID,
      "fieldName"
    );
    return fieldName === sortField;
  });
};

export function getInitials(input: string): string {
  return input
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}
