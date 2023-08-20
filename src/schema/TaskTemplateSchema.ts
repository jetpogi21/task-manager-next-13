//Generated by WriteToModelschema_ts - ModelSchema.ts
import * as Yup from "yup";

const TaskTemplateSchema = Yup.object().shape({
  //Generated by GetAllFieldValidationBySeqModel
  description: Yup.string().required("Description is a required field."),
  isSuspended: Yup.boolean(),
  taskCategoryID: Yup.number().required("Task Category is a required field."),
  taskIntervalID: Yup.number().required("Task Interval is a required field."),
  //Generated by GetAllRelatedLeftArrayValidation
  //Generated by GetRelatedLeftArrayValidation - GetRelatedLeftArrayValidation
  SubTaskTemplates: Yup.array().of(
    Yup.object().shape({
      //Generated by GetAllArrayFieldValidationBySeqModel
      description: Yup.string().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Description is a required field.")
          : schema.notRequired()
      ),
      priority: Yup.string().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Priority is a required field.")
          : schema.notRequired()
      ),
    })
  ),
});

const TaskTemplateArraySchema = Yup.object().shape({
  TaskTemplates: Yup.array().of(
    Yup.object().shape({
      //Generated by GetAllArrayFieldValidationBySeqModel
      description: Yup.string().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Description is a required field.")
          : schema.notRequired()
      ),
      isSuspended: Yup.boolean().when("touched", ([touched], schema) =>
        touched ? schema : schema.notRequired()
      ),
      taskCategoryID: Yup.number().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Task Category is a required field.")
          : schema.notRequired()
      ),
      taskIntervalID: Yup.number().when("touched", ([touched], schema) =>
        touched
          ? schema.required("Task Interval is a required field.")
          : schema.notRequired()
      ),
    })
  ),
});

export { TaskTemplateSchema, TaskTemplateArraySchema };
