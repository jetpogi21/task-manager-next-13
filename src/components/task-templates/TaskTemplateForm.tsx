//Generated by WriteToModelform_tsx - ModelForm.tsx
"use client";
import {
  TaskTemplateFormFormikInitialValues,
  TaskTemplateModel,
  TaskTemplateSearchParams,
} from "@/interfaces/TaskTemplateInterfaces";
import {
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
  useFormikContext,
} from "formik";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import {
  DEFAULT_FORM_VALUE,
  CONTROL_OPTIONS,
  PRIMARY_KEY,
} from "@/utils/constants/TaskTemplateConstants";
import { useURL } from "@/hooks/useURL";
import FormikControl from "@/components/form/FormikControl";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { sortData } from "@/utils/sort";
import { useTaskTemplateStore } from "@/hooks/task-templates/useTaskTemplateStore";
import { toast } from "@/hooks/use-toast";
import { useTaskTemplateQuery } from "@/hooks/task-templates/useTaskTemplateQuery";
import { convertArrayItemsToStrings } from "@/utils/utils";
import { TaskTemplateSchema } from "@/schema/TaskTemplateSchema";
import { Trash } from "lucide-react";
import { useTaskTemplateDeleteDialog } from "@/hooks/task-templates/useTaskTemplateDeleteDialog";
import { TaskTemplateDeleteDialog } from "@/components/task-templates/TaskTemplateDeleteDialog";
//Generated by GetAllModelFormRelatedConstantsImport
//Generated by GetModelFormRelatedConstantsImport - GetAllModelFormRelatedConstantsImport
import {
  COLUMNS as SUBTASKTEMPLATE_COLUMNS,
  DEFAULT_FORM_VALUE as DEFAULT_SUBTASKTEMPLATE_FORM_VALUE,
  DEFAULT_SORT_BY as DEFAULT_SUBTASKTEMPLATE_SORT_BY,
} from "@/utils/constants/SubTaskTemplateConstants";
import { useSubTaskTemplateStore } from "@/hooks/sub-task-templates/useSubTaskTemplateStore";
import SubTaskTemplateSubform from "@/components/task-templates/SubTaskTemplateSubform";
//Generated by GetAllModelFormRequiredListImport

//Generated by GetAllModelFormRequiredRightModelListImport
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useTaskCategoryList from "@/hooks/task-categories/useTaskCategoryList";
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useTaskIntervalList from "@/hooks/task-intervals/useTaskIntervalList";

interface TaskTemplateFormProps {
  data: TaskTemplateModel | null;
  id: string;
}

const TaskTemplateForm: React.FC<TaskTemplateFormProps> = (prop) => {
  const { id } = prop;
  const { router, query, pathname } = useURL<TaskTemplateSearchParams>();

  //Local states
  const [mounted, setMounted] = useState(false);
  const [recordName, setRecordName] = useState(
    prop.data ? prop.data.id.toString() : "New Task Template"
  );

  const ref = useRef<any>(null);

  //Zustand variables
  const { isUpdating, setIsUpdating, hasUpdate, setHasUpdate } =
    useTaskTemplateStore((state) => ({
      isUpdating: state.isUpdating,
      setIsUpdating: state.setIsUpdating,
      hasUpdate: state.hasUpdate,
      setHasUpdate: state.setHasUpdate,
    }));

  const { setRecordsToDelete } = useTaskTemplateDeleteDialog((state) => ({
    setRecordsToDelete: state.setRecordsToDelete,
  }));

  //Generated by GetAllRelatedModelSortFromStore
  const { sort: subTaskTemplateSort } = useSubTaskTemplateStore((state) => ({
    sort: state.sort,
  }));

  //Tanstack queries

  //Generated by GetAllRelatedRightModelListFromRelatedModel
  //Generated by GetRelatedRightModelListFromRelatedModel - GetRelatedRightModelListFromRelatedModel
  const { data: taskCategoryList } = useTaskCategoryList({
    placeholderData: prop.data
      ? [
          {
            id: prop.data.taskCategoryID,
            name: prop.data.TaskCategory.name,
          },
        ]
      : [],
  });
  //Generated by GetRelatedRightModelListFromRelatedModel - GetRelatedRightModelListFromRelatedModel
  const { data: taskIntervalList } = useTaskIntervalList({
    placeholderData: prop.data
      ? [
          {
            id: prop.data.taskIntervalID,
            name: prop.data.TaskInterval.name,
          },
        ]
      : [],
  });
  //Generated by GetAllRelatedListFromRightRelatedModel

  const { taskTemplateMutation, taskTemplateQuery } = useTaskTemplateQuery(id, {
    enabled: mounted && id !== "new",
    initialData: prop.data,
  });

  const taskTemplate = taskTemplateQuery.data;

  const initialValues: TaskTemplateFormFormikInitialValues = {
    ...DEFAULT_FORM_VALUE,
    //Generated by GetAllRightModelDefaultList
    //Generated by GetRightModelDefaultList - GetRightModelDefaultList
    taskCategoryID:
      taskCategoryList && taskCategoryList.length > 0
        ? taskCategoryList[0].id
        : "",
    //Generated by GetRightModelDefaultList - GetRightModelDefaultList
    taskIntervalID:
      taskIntervalList && taskIntervalList.length > 0
        ? taskIntervalList[0].id
        : "",

    //Generated by GetAllRelatedModelEmptyArray
    //Generated by GetRelatedModelEmptyArray - GetRelatedModelEmptyArray
    SubTaskTemplates: [{ ...DEFAULT_SUBTASKTEMPLATE_FORM_VALUE, index: 0 }],
  };

  if (taskTemplate) {
    for (const key in initialValues) {
      if (
        taskTemplate.hasOwnProperty(key) &&
        initialValues.hasOwnProperty(key)
      ) {
        //@ts-ignore
        //prettier-ignore
        initialValues[key] = taskTemplate[key] === null ? "" : taskTemplate[key];
      }
    }

    //Generated by GetAllRelatedModelMapToInitialValue
    //Generated by GetRelatedModelMapToInitialValue - RelatedModelMapToInitialValue
    initialValues.SubTaskTemplates = taskTemplate.SubTaskTemplates.map(
      (item, index) => ({
        ...item,
        touched: false,
        index,
      })
    );
  }

  //Generated by GetAllRelatedModelSortInitialValue
  //Generated by GetRelatedModelSortInitialValue - GetRelatedModelSortInitialValue
  //Sort the SubTaskTemplates array value
  initialValues.SubTaskTemplates.sort((a, b) => {
    const desc = DEFAULT_SUBTASKTEMPLATE_SORT_BY.includes("-");
    const field = desc
      ? DEFAULT_SUBTASKTEMPLATE_SORT_BY.substring(1)
      : DEFAULT_SUBTASKTEMPLATE_SORT_BY;
    return sortData(a, b, desc, field, SUBTASKTEMPLATE_COLUMNS);
  });

  initialValues.SubTaskTemplates.push({
    ...DEFAULT_SUBTASKTEMPLATE_FORM_VALUE,
    index: initialValues.SubTaskTemplates.length + 1,
    taskTemplateID: taskTemplate ? taskTemplate.id : "",
  });

  const handleFocus = () => {
    ref && ref.current.focus();
  };

  const handleHasUdpate = () => {
    setHasUpdate(true);
  };

  const handleFormikSubmit = (
    values: TaskTemplateFormFormikInitialValues,
    formik: FormikHelpers<TaskTemplateFormFormikInitialValues>
  ) => {
    //@ts-ignore
    const addNew: boolean = values.addNew;

    const goToNewRecord = () => {
      formik.setValues({
        ...DEFAULT_FORM_VALUE,

        //Generated by GetAllRelatedModelEmptyArray
        //Generated by GetRelatedModelEmptyArray - GetRelatedModelEmptyArray
        SubTaskTemplates: [{ ...DEFAULT_SUBTASKTEMPLATE_FORM_VALUE, index: 0 }],
      });
      window.history.pushState(
        {},
        "",
        `${window.location.origin}/task-templates/new`
      );
      setRecordName("New Task Template");

      handleFocus();
    };

    if (hasUpdate) {
      const payload = {
        ...values,
        //Generated by GetAllRelatedPayloadAssignment
        //Generated by GetRelatedPayloadAssignment - GetRelatedPayloadAssignment
        SubTaskTemplates: values.SubTaskTemplates.map((item, index) => ({
          ...item,
          index,
        })).filter((item) => item.touched),
      };

      taskTemplateMutation
        .mutateAsync(payload)
        .then((data) => {
          if (addNew) {
            goToNewRecord();
          } else {
            if (data.id) {
              formik.setFieldValue("id", data.id);
            }

            if (data.id) {
              window.history.pushState(
                {},
                "",
                `${window.location.origin}/task-templates/${data.id}`
              );
            }

            setRecordName(values.id.toString());

            //Generated by GetAllReplaceEmptyRelatedModel
            //Generated by GetReplaceEmptyRelatedModel - GetReplaceEmptyRelatedModel
            //Replace the id fields of the indexes from the SubTaskTemplates
            const newSubTaskTemplates = values.SubTaskTemplates.map(
              (item, index) => ({
                ...item,
                id:
                  data.SubTaskTemplates.find((item) => item.index === index)
                    ?.id || item.id,
              })
            ).sort((a, b) => {
              const desc = subTaskTemplateSort.includes("-");
              const field = desc
                ? subTaskTemplateSort.substring(1)
                : subTaskTemplateSort;

              return sortData(a, b, desc, field, SUBTASKTEMPLATE_COLUMNS);
            });

            formik.setFieldValue("SubTaskTemplates", newSubTaskTemplates);
          }

          toast({
            description: "Task Template list updated successfully",
            variant: "success",
            duration: 2000,
          });
        })
        .catch((err) => console.log(err));
    } else {
      if (addNew) {
        goToNewRecord();
      }
    }
  };

  const renderFormik = (
    formik: FormikProps<TaskTemplateFormFormikInitialValues>
  ) => {
    const handleSubmitClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.submitForm();
    };

    return (
      <Form
        className="flex flex-col flex-1 h-full gap-4"
        autoComplete="off"
      >
        {/* Generated by GetSelectFormControl - Select Form Control */}
        <FormikControl
          name="taskCategoryID"
          options={taskCategoryList || []}
          label="Task Category"
          type="Select"
          showLabel={true}
          allowBlank={false}
          containerClassNames={["w-full"]}
          setHasUpdate={handleHasUdpate}
        />
        {/* Generated by GetSelectFormControl - Select Form Control */}
        <FormikControl
          name="taskIntervalID"
          options={taskIntervalList || []}
          label="Task Interval"
          type="Select"
          showLabel={true}
          allowBlank={false}
          containerClassNames={["w-full"]}
          setHasUpdate={handleHasUdpate}
        />
        {/* Generated by GetInputFormControl - Input Form Control */}
        <FormikControl
          name="description"
          type="Text"
          label="Description"
          containerClassNames={["w-full"]}
          inputRef={ref}
          setFocusOnLoad={true}
          setHasUpdate={handleHasUdpate}
        />
        {/* Generated by GetInputFormControl - Input Form Control */}
        <FormikControl
          name="isSuspended"
          type="Checkbox"
          label="Is Suspended"
          containerClassNames={["w-full"]}
          setHasUpdate={handleHasUdpate}
        />
        {/* Generated by GetAllRelatedSubforms */}
        {/* Generated by GetRelatedSubform - GetRelatedSubform */}
        <SubTaskTemplateSubform formik={formik} />

        <div className="flex gap-2 mt-auto">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={(e) => {
              formik.setFieldValue("addNew", true);
              handleSubmitClick(e);
            }}
          >
            Save & Add New
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={(e) => {
              formik.setFieldValue("addNew", false);
              handleSubmitClick(e);
            }}
          >
            Save
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"ghost"}
            onClick={(e) => {
              router.back();
            }}
          >
            Cancel
          </Button>
          {id !== "new" && (
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              onClick={(e) => {
                setRecordsToDelete([formik.values[PRIMARY_KEY].toString()]);
              }}
              className={"ml-auto"}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </Form>
    );
  };

  useEffect(() => {
    setMounted(true);
    handleFocus();
  }, []);

  return (
    <>
      <Breadcrumb
        links={[
          { name: "Task Templates", href: "/task-templates" },
          { name: recordName, href: "" },
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        validationSchema={TaskTemplateSchema}
      >
        {renderFormik}
      </Formik>
      <TaskTemplateDeleteDialog
        onSuccess={() => {
          toast({
            description: "Task Template successfully deleted.",
            variant: "success",
            duration: 4000,
          });
          router.back();
        }}
      />
    </>
  );
};

export default TaskTemplateForm;