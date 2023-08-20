//Generated by WriteToModelform_tsx - ModelForm.tsx
"use client";
import {
  TaskFormFormikInitialValues,
  TaskModel,
  TaskSearchParams,
} from "@/interfaces/TaskInterfaces";
import { Form, Formik, FormikHelpers, FormikProps, useFormikContext, } from "formik";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { DEFAULT_FORM_VALUE, CONTROL_OPTIONS, PRIMARY_KEY,
 } from "@/utils/constants/TaskConstants";
import { useURL } from "@/hooks/useURL";
import FormikControl from "@/components/form/FormikControl";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { sortData } from "@/utils/sort";
import { useTaskStore } from "@/hooks/tasks/useTaskStore";
import { toast } from "@/hooks/use-toast";
import { useTaskQuery } from "@/hooks/tasks/useTaskQuery";
import { convertArrayItemsToStrings } from "@/utils/utils";
import { TaskSchema } from "@/schema/TaskSchema";
import { Trash } from "lucide-react";
import { useTaskDeleteDialog } from "@/hooks/tasks/useTaskDeleteDialog";
import { TaskDeleteDialog } from "@/components/tasks/TaskDeleteDialog";
//Generated by GetAllModelFormRelatedConstantsImport
//Generated by GetModelFormRelatedConstantsImport - GetAllModelFormRelatedConstantsImport
import {
  COLUMNS as SUBTASK_COLUMNS,
  DEFAULT_FORM_VALUE as DEFAULT_SUBTASK_FORM_VALUE,
  DEFAULT_SORT_BY as DEFAULT_SUBTASK_SORT_BY,
} from "@/utils/constants/SubTaskConstants";
import { useSubTaskStore } from "@/hooks/sub-tasks/useSubTaskStore";
import SubTaskSubform from "@/components/tasks/SubTaskSubform";
//Generated by GetModelFormRelatedConstantsImport - GetAllModelFormRelatedConstantsImport
import {
  COLUMNS as TASKNOTE_COLUMNS,
  DEFAULT_FORM_VALUE as DEFAULT_TASKNOTE_FORM_VALUE,
  DEFAULT_SORT_BY as DEFAULT_TASKNOTE_SORT_BY,
} from "@/utils/constants/TaskNoteConstants";
import { useTaskNoteStore } from "@/hooks/task-notes/useTaskNoteStore";
import TaskNoteSubform from "@/components/tasks/TaskNoteSubform";
//Generated by GetAllModelFormRequiredListImport

//Generated by GetModelFormRequiredListImport - GetModelFormRequiredListImport
import useTagList from "@/hooks/tags/useTagList";

//Generated by GetAllModelFormRequiredRightModelListImport
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useTaskTemplateList from "@/hooks/task-templates/useTaskTemplateList";
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useTaskCategoryList from "@/hooks/task-categories/useTaskCategoryList";
//Generated by GetModelFormRequiredRightModelListImport - GetModelFormRequiredRightModelListImport
import useTaskIntervalList from "@/hooks/task-intervals/useTaskIntervalList";

interface TaskFormProps {
  data: TaskModel | null;
  id: string;
}

const TaskForm: React.FC<TaskFormProps> = (prop) => {
  const { id } = prop;
  const { router, query, pathname } = useURL<TaskSearchParams>();

  //Local states
  const [mounted, setMounted] = useState(false);
  const [recordName, setRecordName] = useState(
    prop.data ? prop.data.id.toString() : "New Task"
  );
  //Generated by GetAllSimpleOriginalModelState
//Generated by GetSimpleOriginalModelState - GetSimpleOriginalModelState
const [originalTaskTags, setOriginalTaskTags] = useState(
    prop.data
      ? prop.data.TaskTags.map((item) => ({
          id: item.id,
          tagID: item.tagID,
        }))
      : []
  );
  const ref = useRef<any>(null);

  //Zustand variables
  const { isUpdating, setIsUpdating, hasUpdate, setHasUpdate } = useTaskStore((state) => ({
    isUpdating: state.isUpdating,
    setIsUpdating: state.setIsUpdating,
    hasUpdate: state.hasUpdate,
    setHasUpdate: state.setHasUpdate,
  }));

  const { setRecordsToDelete } = useTaskDeleteDialog((state) => ({
    setRecordsToDelete: state.setRecordsToDelete,
  }));

  //Generated by GetAllRelatedModelSortFromStore
const { sort: subTaskSort } = useSubTaskStore((state) => ({
    sort: state.sort,
  }));
const { sort: taskNoteSort } = useTaskNoteStore((state) => ({
    sort: state.sort,
  }));

  //Tanstack queries
  //Generated by GetAllRelatedListFromRelatedModel
//Generated by GetAllRelatedListFromModel - GetRelatedListFromRelatedModel
const { data: tagList } = useTagList({
    placeholderData: prop.data
      ? prop.data.TaskTags.map((item) => ({
          id: item.tagID,
          name: item.Tag.name,
        }))
      : [],
  });
  //Generated by GetAllRelatedRightModelListFromRelatedModel
//Generated by GetRelatedRightModelListFromRelatedModel - GetRelatedRightModelListFromRelatedModel
const { data: taskTemplateList } = useTaskTemplateList({
    placeholderData: prop.data
      ? [
          {
            id: prop.data.taskTemplateID,
            name: prop.data.TaskTemplate.name,
          },
        ]
      : [],
  });
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



  const { taskMutation, taskQuery } = useTaskQuery(id, {
    enabled: mounted && id !== "new",
    initialData: prop.data,
  });

  const task = taskQuery.data;
  

  const initialValues: TaskFormFormikInitialValues = {
    ...DEFAULT_FORM_VALUE,
    //Generated by GetAllRightModelDefaultList
//Generated by GetRightModelDefaultList - GetRightModelDefaultList
taskTemplateID: taskTemplateList && taskTemplateList.length > 0 ? taskTemplateList[0].id : "",
//Generated by GetRightModelDefaultList - GetRightModelDefaultList
taskCategoryID: taskCategoryList && taskCategoryList.length > 0 ? taskCategoryList[0].id : "",
//Generated by GetRightModelDefaultList - GetRightModelDefaultList
taskIntervalID: taskIntervalList && taskIntervalList.length > 0 ? taskIntervalList[0].id : "",
    //Generated by GetAllRelatedModelEmptyArraySimpleOnly
TaskTags: [],//Generated by GetRelatedModelEmptyArraySimpleOnly - GetRelatedModelEmptyArraySimpleOnly
    //Generated by GetAllRelatedModelEmptyArray
//Generated by GetRelatedModelEmptyArray - GetRelatedModelEmptyArray
SubTasks: [{ ...DEFAULT_SUBTASK_FORM_VALUE, index: 0 }],
//Generated by GetRelatedModelEmptyArray - GetRelatedModelEmptyArray
TaskNotes: [{ ...DEFAULT_TASKNOTE_FORM_VALUE, index: 0 }],
  };

  if (task) {
    for (const key in initialValues) {
      if (task.hasOwnProperty(key) && initialValues.hasOwnProperty(key)) {
        //@ts-ignore
        //prettier-ignore
        initialValues[key] = task[key] === null ? "" : task[key];
      }
    }

    //Generated by GetAllRelatedModelMapToInitialValue
//Generated by GetRelatedModelMapToInitialValue - RelatedModelMapToInitialValue
initialValues.SubTasks = task.SubTasks.map(
      (
        item,
        index
      ) => ({
        ...item,
        touched: false,
        index,
      })
    );
//Generated by GetRelatedModelMapToInitialValue - RelatedModelMapToInitialValue
initialValues.TaskNotes = task.TaskNotes.map(
      (
        item,
        index
      ) => ({
        ...item,
        touched: false,
        index,
      })
    );
    
    //Generated by GetAllRelatedSimpleModelMapToInitialValue
//Generated by GetRelatedSimpleModelMapToInitialValue - GetRelatedSimpleModelMapToInitialValue
initialValues.TaskTags = task.TaskTags.map((item, index) =>
      item.tagID.toString()
    );
  }

  //Generated by GetAllRelatedModelSortInitialValue
//Generated by GetRelatedModelSortInitialValue - GetRelatedModelSortInitialValue
//Sort the SubTasks array value
  initialValues.SubTasks.sort((a, b) => {
    const desc = DEFAULT_SUBTASK_SORT_BY.includes("-");
    const field = desc
      ? DEFAULT_SUBTASK_SORT_BY.substring(1)
      : DEFAULT_SUBTASK_SORT_BY;
    return sortData(a, b, desc, field, SUBTASK_COLUMNS);
  });

  initialValues.SubTasks.push({
    ...DEFAULT_SUBTASK_FORM_VALUE,
    index: initialValues.SubTasks.length + 1,
    taskID: task ? task.id : "",
  });
//Generated by GetRelatedModelSortInitialValue - GetRelatedModelSortInitialValue
//Sort the TaskNotes array value
  initialValues.TaskNotes.sort((a, b) => {
    const desc = DEFAULT_TASKNOTE_SORT_BY.includes("-");
    const field = desc
      ? DEFAULT_TASKNOTE_SORT_BY.substring(1)
      : DEFAULT_TASKNOTE_SORT_BY;
    return sortData(a, b, desc, field, TASKNOTE_COLUMNS);
  });

  initialValues.TaskNotes.push({
    ...DEFAULT_TASKNOTE_FORM_VALUE,
    index: initialValues.TaskNotes.length + 1,
    taskID: task ? task.id : "",
  });

  const handleFocus = () => {
    ref && ref.current.focus();
  };

  const handleHasUdpate = () => {
    setHasUpdate(true);
  };

  const handleFormikSubmit = (
    values: TaskFormFormikInitialValues,
    formik: FormikHelpers<TaskFormFormikInitialValues>
  ) => {
    //@ts-ignore
    const addNew: boolean = values.addNew;

    const goToNewRecord = () => {
      formik.setValues({
        ...DEFAULT_FORM_VALUE,
        //Generated by GetAllRelatedModelEmptyArraySimpleOnly
TaskTags: [],//Generated by GetRelatedModelEmptyArraySimpleOnly - GetRelatedModelEmptyArraySimpleOnly
        //Generated by GetAllRelatedModelEmptyArray
//Generated by GetRelatedModelEmptyArray - GetRelatedModelEmptyArray
SubTasks: [{ ...DEFAULT_SUBTASK_FORM_VALUE, index: 0 }],
//Generated by GetRelatedModelEmptyArray - GetRelatedModelEmptyArray
TaskNotes: [{ ...DEFAULT_TASKNOTE_FORM_VALUE, index: 0 }],
      });
      window.history.pushState(
        {},
        "",
        `${window.location.origin}/tasks/new`
      );
      setRecordName("New Task");

      handleFocus();
    };
    
    //Generated by GetAllAddedAndDeletedSimpleRelationship
//Generated by GetAddedAndDeletedSimpleRelationship - GetAddedAndDeletedSimpleRelationship
const deletedTaskTags =
      originalTaskTags
        .filter(
          (item) =>
            !convertArrayItemsToStrings(values.TaskTags).includes(
              item.tagID.toString()
            )
        )
        .map((item) => item.id.toString()) || [];

    const newTags = convertArrayItemsToStrings(
      values.TaskTags
    ).filter(
      (item) =>
        !originalTaskTags
          .map((taskTag) => taskTag.tagID.toString())
          .includes(item)
    );
    
    if (hasUpdate){
      const payload = {
        ...values,
        //Generated by GetAllRelatedPayloadAssignment
//Generated by GetRelatedPayloadAssignment - GetRelatedPayloadAssignment
SubTasks: values.SubTasks.map((item, index) => ({
        ...item,
        index,
      })).filter((item) => item.touched),,//Generated by GetRelatedPayloadAssignment - GetRelatedPayloadAssignment
TaskNotes: values.TaskNotes.map((item, index) => ({
        ...item,
        index,
      })).filter((item) => item.touched),
        //Generated by GetAllRelatedSimplePayloadAssignment
//Generated by GetRelatedSimplePayloadAssignment - GetRelatedSimplePayloadAssignment
deletedTaskTags,
      newTags,
      };

      taskMutation.mutateAsync(payload).then((data) => {
      if (addNew) {
        goToNewRecord()
      } else {
        if (data.id) {
          formik.setFieldValue("id", data.id);
        }

        if (data.id) {
          window.history.pushState(
            {},
            "",
            `${window.location.origin}/tasks/${data.id}`
          );
        }

        setRecordName(values.id.toString());
  
        //Generated by GetAllReplaceEmptyRelatedModel
//Generated by GetReplaceEmptyRelatedModel - GetReplaceEmptyRelatedModel
//Replace the id fields of the indexes from the SubTasks
      const newSubTasks = values.SubTasks.map((item, index) => ({
        ...item,
        id: data.SubTasks.find((item) => item.index === index)?.id || item.id,
      })).sort((a, b) => {
        const desc = subTaskSort.includes("-");
        const field = desc ? subTaskSort.substring(1) : subTaskSort;

        return sortData(a, b, desc, field, SUBTASK_COLUMNS);
      });

      formik.setFieldValue("SubTasks", newSubTasks);
//Generated by GetReplaceEmptyRelatedModel - GetReplaceEmptyRelatedModel
//Replace the id fields of the indexes from the TaskNotes
      const newTaskNotes = values.TaskNotes.map((item, index) => ({
        ...item,
        id: data.TaskNotes.find((item) => item.index === index)?.id || item.id,
      })).sort((a, b) => {
        const desc = taskNoteSort.includes("-");
        const field = desc ? taskNoteSort.substring(1) : taskNoteSort;

        return sortData(a, b, desc, field, TASKNOTE_COLUMNS);
      });

      formik.setFieldValue("TaskNotes", newTaskNotes);

        //Generated by GetAllUpdateOriginalRelatedSimpleModels
//Generated by GetUpdateOriginalRelatedSimpleModels - GetUpdateOriginalRelatedSimpleModels
const newOriginalTaskTags = [
          ...originalTaskTags,
          ...data.TaskTags.map((item) => ({
            id: item.id,
            tagID: item.tagID,
          })),
        ].filter(
          (item) => !deletedTaskTags.includes(item.id.toString())
        );

        setOriginalTaskTags(newOriginalTaskTags);

      }

      toast({
        description: "Task list updated successfully",
        variant: "success",
        duration: 2000,
      });
    }).catch((err) => console.log(err));

    } else {
      if (addNew) {
        goToNewRecord();
      }
    }
    
    
  };

  const renderFormik = (formik: FormikProps<TaskFormFormikInitialValues>) => {
    const handleSubmitClick: MouseEventHandler = (e) => {
      e.preventDefault();
      formik.submitForm();
    };

    return (
      <Form
        className="flex flex-col flex-1 h-full gap-4"
        autoComplete="off"
      >
        //Generated by GetAllFormikControls
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
          name="taskTemplateID"
          type="Hidden"
          label="Task Template ID"
          containerClassNames={["w-full"]}
          
          setHasUpdate={handleHasUdpate}
        />
{/* Generated by GetInputFormControl - Input Form Control */}
<FormikControl
          name="date"
          type="Date"
          label="Date"
          containerClassNames={["w-full"]}
          
          setHasUpdate={handleHasUdpate}
        />
{/* Generated by GetInputFormControl - Input Form Control */}
<FormikControl
          name="targetDate"
          type="Date"
          label="Target Date"
          containerClassNames={["w-full"]}
          
          setHasUpdate={handleHasUdpate}
        />
{/* Generated by GetInputFormControl - Input Form Control */}
<FormikControl
          name="finishDateTime"
          type="DateAndTime"
          label="Finish Date Time"
          containerClassNames={["w-full"]}
          
          setHasUpdate={handleHasUdpate}
        />
{/* Generated by GetInputFormControl - Input Form Control */}
<FormikControl
          name="isFinished"
          type="Checkbox"
          label="Is Finished"
          containerClassNames={["w-full"]}
          
          setHasUpdate={handleHasUdpate}
        />
        {/* Generated by GetAllRelatedSubforms */}
{/* Generated by GetRelatedSubform - GetRelatedSubform */}
<SubTaskSubform formik={formik} />
{/* Generated by GetRelatedSubform - GetRelatedSubform */}
<TaskNoteSubform formik={formik} />
        {/* Generated by GetAllRelatedSimpleFacetedControl */}
{/* Generated by GetRelatedSimpleFacetedControl - GetRelatedSimpleFacetedControl */}
<FormikControl
          name="TaskTags"
          options={tagList || []}
          type="FacetedControl"
          label="Tags"
          containerClassNames={["max-w-[200px]"]}
          limit={10}
          setHasUpdate={handleHasUdpate}
        />
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
          { name: "Tasks", href: "/tasks" },
          { name: recordName, href: "" },
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        validationSchema={TaskSchema}
      >
        {renderFormik}
      </Formik>
      <TaskDeleteDialog
        onSuccess={() => {
          toast({
            description: "Task successfully deleted.",
            variant: "success",
            duration: 4000,
          });
          router.back();
        }}
      />
    </>
  );
};

export default TaskForm;