import clsSQL from "@/utils/clsSQL";
import { splitWordByLastHyphen } from "@/utils/utils";
import { Op } from "sequelize";

export function getSortedValue(
  sort: string | undefined,
  deckAttributes: string[],
  DEFAULT_SORT_BY: string
): string {
  if (sort) {
    const isSortValid =
      deckAttributes.includes(sort) ||
      deckAttributes.includes(sort.substring(1));

    return isSortValid ? sort : DEFAULT_SORT_BY;
  } else {
    return DEFAULT_SORT_BY;
  }
}

type DataItem = {
  [key: string]: any;
};

export function getCursorString(
  sortField: string,
  PRIMARY_KEY: string,
  data: DataItem[]
): string {
  if (data && data.length > 0) {
    if (sortField !== PRIMARY_KEY) {
      if (data[data.length - 1][sortField] === null) {
        return `-${data[data.length - 1][PRIMARY_KEY].toString()}`;
      } else {
        return `${data[data.length - 1][sortField].toString()}-${data[
          data.length - 1
        ][PRIMARY_KEY].toString()}`;
      }
    } else {
      return `${data[data.length - 1][sortField].toString()}`;
    }
  }

  return "";
}

export function addCursorFilterToQuery(
  cursor: string,
  sort: string,
  sortField: string,
  PRIMARY_KEY: string,
  replacements: Record<string, any>,
  filters: string[],
  tableName?: string
): void {
  const cursorCondition = sort.includes("-") ? "<" : ">";
  const [cursorArray0, cursorArray1] = splitWordByLastHyphen(cursor);

  const realPrimaryKey = tableName
    ? `${tableName}.${PRIMARY_KEY}`
    : PRIMARY_KEY;

  const realSortField = tableName ? `${tableName}.${sortField}` : sortField;

  const addFilter = (
    condition: string,
    clause?: string,
    clauseReplacements?: Record<string, any>
  ) => {
    filters.push(clause ? `(${clause})` : condition);
    if (clauseReplacements) {
      Object.assign(replacements, clauseReplacements);
    }
  };

  if (sortField !== PRIMARY_KEY) {
    if (!cursorArray0) {
      addFilter(
        `${realSortField} IS NULL AND ${realPrimaryKey} > :cursorArray1`,
        cursorCondition === "<"
          ? `(${realSortField} IS NULL AND ${realPrimaryKey} > :cursorArray1)`
          : `NOT ${realSortField} IS NULL OR (${realSortField} IS NULL AND ${realPrimaryKey} > :cursorArray1)`,
        { cursorArray1 }
      );
    } else {
      addFilter(
        `(${realSortField} ${cursorCondition} :cursorArray0 OR (${realSortField} = :cursorArray0 AND ${realPrimaryKey} > :cursorArray1))`,
        undefined,
        { cursorArray0, cursorArray1 }
      );
    }
  } else {
    addFilter(`${realSortField} ${cursorCondition} :cursor`, undefined, {
      cursor,
    });
  }
}

type Field = string | [string, string];

export function appendFieldsToSQL(
  fields: Field[],
  sql: clsSQL,
  table: string
): void {
  fields.forEach((field) => {
    let fieldName, fieldAlias;
    if (Array.isArray(field)) {
      fieldAlias = `\`${field[1]}\``;
      fieldName = `\`${field[0]}\``;
    } else {
      fieldAlias = `\`${field}\``;
      fieldName = `\`${field}\``;
    }

    sql.fields.push(`${table}.${fieldName} AS ${fieldAlias}`);
  });
}

export function resetSQL(sql: clsSQL) {
  sql.limit = 0;
  sql.orderBy = [];
  sql.filter = "";
  sql.groupBy = [];
}

export function processFields(
  fields: (string | [string, string])[],
  modelName: string,
  table: string,
  fieldAliases: string[],
  sql: clsSQL
): void {
  fields.forEach((field) => {
    let fieldAlias, fieldName;
    if (Array.isArray(field)) {
      fieldAlias = `\`${modelName}.${field[1]}\``;
      fieldName = field[0];
    } else {
      fieldAlias = `\`${modelName}.${field}\``;
      fieldName = field;
    }

    fieldAliases.push(fieldAlias);
    sql.fields.push(`${table}.${fieldName} AS ${fieldAlias}`);
  });
}

export function buildOrConditions(
  sortField: string,
  cursorCondition: symbol,
  cursorArray: [string, string],
  primaryKey: string
) {
  return {
    [Op.or]: {
      [sortField]: {
        [Op.or]: {
          [Op.is]: null,
          [cursorCondition]: cursorArray[0],
        },
      },
      [Op.and]: {
        [sortField]: cursorArray[0],
        [primaryKey]: {
          [Op.gt]: cursorArray[1],
        },
      },
    },
  };
}

export function buildAndConditions(
  sortField: string,
  cursorCondition: symbol,
  cursorArray: [string, string],
  primaryKey: string
) {
  return {
    [Op.and]: {
      [sortField]: {
        [cursorCondition]: cursorArray[0],
      },
      [primaryKey]: {
        [Op.gt]: cursorArray[1],
      },
    },
  };
}

export const appendAndFilters = (
  andFilters: any[],
  sort: string,
  sortField: string,
  primaryKey: string,
  cursor: string
) => {
  //Use less than if the sort is descending
  const cursorCondition = sort.includes("-") ? Op.lt : Op.gt;
  //If sortField is not primary key then do dual cursor
  if (sortField !== primaryKey) {
    const cursorArray = splitWordByLastHyphen(cursor);

    if (cursorArray[0] === "") {
      if (cursorCondition === Op.gt) {
        andFilters.push({
          [Op.or]: {
            [sortField]: {
              [Op.not]: null,
            },
            [Op.and]: {
              [sortField]: { [Op.is]: null },
              [primaryKey]: {
                [Op.gt]: cursorArray[1],
              },
            },
          },
        });
      } else {
        andFilters.push({
          [Op.or]: {
            [Op.and]: {
              [sortField]: { [Op.is]: null },
              [primaryKey]: {
                [Op.gt]: cursorArray[1],
              },
            },
          },
        });
      }
    } else {
      if (cursorCondition === Op.gt) {
        andFilters.push({
          [Op.or]: {
            [sortField]: {
              [cursorCondition]: cursorArray[0],
            },
            [Op.and]: {
              [sortField]: cursorArray[0],
              [primaryKey]: {
                [Op.gt]: cursorArray[1],
              },
            },
          },
        });
      } else {
        andFilters.push({
          [Op.or]: {
            [sortField]: {
              [Op.or]: {
                [Op.is]: null,
                [cursorCondition]: cursorArray[0],
              },
            },
            [Op.and]: {
              [sortField]: cursorArray[0],
              [primaryKey]: {
                [Op.gt]: cursorArray[1],
              },
            },
          },
        });
      }
    }
  } else {
    andFilters.push({
      [sortField]: {
        [cursorCondition]: cursor,
      },
    });
  }
};

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

export function getDatabaseFieldName(key: string, COLUMNS: any): string {
  let sortField = key.includes("-") ? key.substring(1) : key;
  const column = COLUMNS[sortField];

  if (column?.db_name) {
    return column.db_name;
  }
  return sortField;
}

export function getColumnKeyByDbName(fieldName: string, COLUMNS: any) {
  for (const key in COLUMNS) {
    if (COLUMNS[key].db_name === fieldName) {
      return key;
    }
  }
  return fieldName;
}

export function getMappedKeys(columns: {
  [key: string]: { type: string; db_name?: string };
}): string[] {
  const mappedKeys: string[] = [];

  for (const key in columns) {
    if (columns.hasOwnProperty(key)) {
      const column = columns[key];
      const columnName = column.db_name || key;
      mappedKeys.push(columnName);
    }
  }

  return mappedKeys;
}
