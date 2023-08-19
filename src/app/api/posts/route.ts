//Generated by Generate_getModelsAPIRouteNext13
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/models/PostModel";
import { FindOptions } from "sequelize";
import { cloneDeep } from "lodash";
import { PostBody, PostQuery } from "@/interfaces/PostInterfaces";
import {
  formatSortAsSequelize,
  getSort,
  isValidPage,
  returnJSONResponse,
  validateRequiredFields,
} from "@/utils/utils";
import { genericGetAll, genericGetAndCountAll } from "@/utils/generic";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";

//Generated by GenerateImportRelatedModels
import TUser, { User } from "@/models/UserModel"; //Generated by ImportAsRelatedModelBackend

const ModelObject = Post;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof Post> = {
  //Generated by GenerateIncludeOption

  include: [
    {
      model: User,
      //Generated by GenerateAttributesOption

      attributes: ["password"],
    },
  ],
  //Generated by GenerateAttributesOption

  attributes: ["postId", "userId", "title", "body"],
};

//Generated by Generate_getModelsSimpleFilterNext13
export const GET = async (req: Request) => {
  //Generated by Generate_findOptionsCopy
  const findOptionsCopy: FindOptions<typeof Post> = cloneDeep(findOptions);

  const query = new URL(req.url).searchParams as unknown as PostQuery;

  if (!query.simpleOnly) {
    const where: Record<string | symbol, unknown> = {};

    findOptionsCopy.where = where;
    const limit = query.limit ? parseInt(query.limit) : 20;
    findOptionsCopy.limit = limit;

    if (query.page) {
      const { status, num } = isValidPage(query.page);
      if (status && num) {
        findOptionsCopy.offset = limit * (num - 1);
      } else {
        findOptionsCopy.offset = undefined;
      }
    }

    //@ts-ignore
    const sort = formatSortAsSequelize(getSort(query.get("sort"), "post_id"));
    findOptionsCopy.order = sort;

    return genericGetAndCountAll(ModelObject, findOptionsCopy);
  } else {
    return genericGetAll(ModelObject, findOptionsCopy);
  }
};

//Generated by Generate_GetAddFunctionWithRelationshipNext13
export const POST = async (req: Request) => {
  const res = (await req.json()) as Partial<PostBody>;

  //Generated by getRelationshipBodyDeclarationForAdd
  const { userId, title, body } = res;

  //Generated by GetBackendModelRequiredSnippets
  validateRequiredFields(
    { userId: "User ID", title: "Title", body: "Body" },
    res
  );

  //Generated by GenerateEnumValidation

  //Generated by getChildrenUniquenessValidationForAdd

  //Generated by getChildrenUniquenessValidationWithDatabaseForAdd

  const transaction = await sequelize.transaction();

  try {
    const post = await Post.create(
      {
        //Generated by getModelFieldsValue
        userId: userId!, //Generated by GenerateCreateUpdateField
        title: title!, //Generated by GenerateCreateUpdateField
        body: body!,
      },
      { transaction }
    );

    //Generated by GetChildrenInsertsForAdd

    await transaction.commit();

    return returnJSONResponse({ status: "success", data: post });
  } catch (err) {
    return handleSequelizeError(err);
  }
};
