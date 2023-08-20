//Generated by WriteToModellibs_ts - ModelLibs.ts
import { TagFormikShape } from "@/interfaces/TagInterfaces";
import { Tag } from "@/models/TagModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createTag = async (
  tag: Omit<TagFormikShape, "touched" | "index" | "id">,
  t: Transaction
) => {
  return await Tag.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
name: tag.name ? tag.name! : null
    },
    { transaction: t }
  );
};

export const updateTag = async (
  tag: Omit<TagFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<TagFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await Tag.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
name: tag.name ? tag.name! : null
    },
    {
      where: { [primaryKey]: primaryKeyValue || tag[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteTags = async (
  primaryKey: keyof Omit<TagFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await Tag.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};