//Generated by WriteToModelsRouteApi - models route next 13
import { Tag } from "@/models/TagModel";
import { FindOptions, Transaction } from "sequelize";
import { cloneDeep } from "lodash";
import {
  checkDuplicateCombinations,
  formatSortAsSequelize,
  getSort,
  parseParams,
  returnJSONResponse,
} from "@/utils/utils";
import { genericGetAll } from "@/utils/generic";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { Op } from "sequelize";
import {
  TagDeletePayload,
  TagFormUpdatePayload,
  TagFormikShape,
  TagSearchParams,
  TagUpdatePayload,
} from "@/interfaces/TagInterfaces";
import { NextResponse } from "next/server";
import { DEFAULT_LIMIT } from "@/utils/constants";
import {
  DEFAULT_SORT_BY,
  PRIMARY_KEY,
  REQUIRED_FIELDS,
  UNIQUE_FIELDS,
} from "@/utils/constants/TagConstants";
import { TagSchema } from "@/schema/TagSchema";
import { appendAndFilters, getCursor } from "@/utils/api/utils";
import { createTag, deleteTags, updateTag } from "@/utils/api/TagLibs";

//Generated by GetAllRelatedLeftModelImportRoute
//Generated by GetRelatedLeftModelImportRoute - GetRelatedLeftModelImportRoute
import { createTaskTag, updateTaskTag } from "@/utils/api/TaskTagLibs";
import { TaskTagSchema } from "@/schema/TaskTagSchema";
import { PRIMARY_KEY as TASKTAG_PRIMARY_KEY } from "@/utils/constants/TaskTagConstants";

const ModelObject = Tag;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof Tag> = {
  //Generated by GenerateIncludeOption
  include: [],
  //Generated by GenerateAttributesOption
  attributes: [
    //Generated by GetAllModelAttributesBySeqModel
    "id",
    "name",
  ],
};

//Generated by Generate_getModelsSimpleFilterNext13
export const GET = async (req: Request) => {
  //Generated by Generate_findOptionsCopy
  const findOptionsCopy: FindOptions<typeof Tag> = cloneDeep(findOptions);
  const tagAttributes = Object.keys(Tag.getAttributes()).map(
    (attribute) => attribute
  );

  const searchParams = new URL(req.url).searchParams;

  const query = parseParams(searchParams) as Partial<TagSearchParams>;
  const primaryKey = PRIMARY_KEY;

  const simpleOnly = query["simpleOnly"];
  const cursor = query["cursor"];
  const fetchCount = query["fetchCount"] === "true";

  let limit = query["limit"];
  const sort = query["sort"]
    ? tagAttributes.includes(query["sort"]) ||
      tagAttributes.includes(query["sort"].substring(1))
      ? query["sort"]
      : DEFAULT_SORT_BY
    : DEFAULT_SORT_BY;

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  if (!simpleOnly) {
    const where: Record<string | symbol, unknown> = { [Op.and]: [] };
    const andFilters = [];

    //@ts-ignore
    const q = query["q"];

    if (q) {
      andFilters.push({
        [Op.or]: [
          //Generated by GetAllQFilterFieldBySeqModel
          //Generated by GenerateAQFilterField - GenerateAQFilterField
          { name: { [Op.like]: `%${q}%` } },
        ],
      });
    }

    //Generated by GetAllBackendFiltersBySeqModel

    //get all the count here first
    let recordCount = 0;
    if (fetchCount) {
      recordCount = await Tag.count({
        where: { [Op.and]: andFilters },
      });
    }

    if (cursor) {
      appendAndFilters(andFilters, sort, sortField, primaryKey, cursor);
    }

    where[Op.and] = andFilters;
    findOptionsCopy.where = where;
    limit = limit || DEFAULT_LIMIT;
    findOptionsCopy.limit = parseInt(limit);

    //@ts-ignore
    findOptionsCopy.order = formatSortAsSequelize(
      getSort(sort, DEFAULT_SORT_BY, primaryKey)
    );

    try {
      const data = await Tag.findAll(findOptionsCopy);

      const cursor = getCursor(data, sortField, primaryKey);

      return NextResponse.json({
        rows: data,
        cursor,
        ...(fetchCount && { count: recordCount }),
      });
    } catch (err) {
      return handleSequelizeError(err);
    }
  } else {
    return genericGetAll(ModelObject, findOptionsCopy);
  }
};

//Generated by GetMultiCreateModelPOSTRoute - GetMultiCreateModelPOSTRoute
export const POST = async (req: Request) => {
  const body = (await req.json()) as TagUpdatePayload;
  const { Tags } = body;

  //Generated by GenerateUniquenessValidation
  //Validate record uniqueness

  UNIQUE_FIELDS.forEach((item) => {
    const uniquenessError = checkDuplicateCombinations(item, Tags);

    if (uniquenessError) {
      return returnJSONResponse({
        status: "error",
        error: uniquenessError,
        errorCode: 422,
      });
    }
  });

  const t = await sequelize.transaction();
  let recordsCreated = 0;

  for (const item of Tags) {
    try {
      await TagSchema.validate(item);
    } catch (error) {
      return handleSequelizeError(error);
    }
  }

  try {
    for (const item of Tags) {
      if (item[PRIMARY_KEY] === "") {
        await createTag(item, t);
        recordsCreated++;
      } else {
        await updateTag(item, PRIMARY_KEY, t);
      }
    }

    await t.commit();

    return NextResponse.json({
      recordsCreated,
    });
  } catch (err) {
    await t.rollback();
    return handleSequelizeError(err);
  }
};

export const DELETE = async (req: Request) => {
  const body = (await req.json()) as TagDeletePayload;
  const { deletedTags } = body;

  if (deletedTags.length > 0) {
    const t = await sequelize.transaction();
    try {
      await deleteTags(PRIMARY_KEY, deletedTags, t);
      t.commit();
      return NextResponse.json({
        status: "success",
        recordsDeleted: deletedTags.length,
      });
    } catch (error) {
      t.rollback();
      return handleSequelizeError(error);
    }
  }
};
