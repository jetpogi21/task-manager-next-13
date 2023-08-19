//Generated by WriteToModelschema_ts - ModelSchema.ts
import * as Yup from "yup";

const TaskCategorySchema = Yup.object().shape({
  //Generated by GetAllFieldValidationBySeqModel
  name: Yup.string().required("Name is a required field."),
});

const TaskCategoryArraySchema = Yup.object().shape({
  TaskCategories: Yup.array().of(
    Yup.object().shape({
      //Generated by GetAllArrayFieldValidationBySeqModel
      name: Yup.string().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Name is a required field.")
          : schema.notRequired()
      ),
    })
  ),
});

export { TaskCategorySchema, TaskCategoryArraySchema };