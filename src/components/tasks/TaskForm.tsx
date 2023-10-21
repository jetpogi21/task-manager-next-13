//Generated by WriteToModelform_tsx - ModelForm.tsx
"use client";
import {
  TaskFormFormikInitialValues,
  TaskModel,
  TaskSearchParams,
} from "@/interfaces/TaskInterfaces";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { useListURLStore, useURL } from "@/hooks/useURL";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { toast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
//Generated by GetAllLeftModelDropzoneImport
//Generated by GetLeftModelDropzoneImport - GetLeftModelDropzoneImport
import TaskNoteFileDropzone from "@/components/tasks/TaskNoteDropzone";
import { findModelPrimaryKeyField, toValidDateTime } from "@/utils/utilities";
import { TaskConfig } from "@/utils/config/TaskConfig";
import { mapOriginalSimpleModels } from "@/lib/mapOriginalSimpleModels";
import { createRequiredModelLists } from "@/lib/createRequiredModelLists";
import { useModelQuery } from "@/hooks/useModelQuery";
import { generateDeletedAndNewSimpleecords } from "@/lib/generateDeletedAndNewSimpleecords";
import { FormikFormControlGenerator } from "@/components/FormikFormControlGenerator";
import { ModelSchema } from "@/schema/ModelSchema";
import { getInitialValues } from "@/lib/getInitialValues";
import { createClientPayload } from "@/lib/createClientPayload";
import { updateFormFieldsBasedOnRelationships } from "@/lib/updateFormFieldsBasedOnRelationships";
import { updateSimpleModelsBasedOnRelationships } from "@/lib/updateSimpleModelsBasedOnRelationships";
import FormikSubformGenerator from "@/components/FormikSubformGenerator";
import { getPrevURL } from "@/lib/getPrevURL";
import { ModelDeleteDialog } from "@/components/ModelDeleteDialog";
import ModelDropzonesForRelationships from "@/components/ModelDropzonesForRelationships";
import { generateGridTemplateAreas } from "@/lib/generateGridTemplateAreas";

interface TaskFormProps {
  data: TaskModel | null;
  id: string;
}

const modelConfig = TaskConfig;
const primaryKeyField = findModelPrimaryKeyField(modelConfig).fieldName;
const slugField = TaskConfig.slugField || primaryKeyField;

const TaskForm: React.FC<TaskFormProps> = (prop) => {
  const { id } = prop;
  const { router, query, pathname } = useURL<TaskSearchParams>();

  //Local states
  const [mounted, setMounted] = useState(false);
  const [recordName, setRecordName] = useState(
    prop.data ? prop.data.id.toString() : "New " + modelConfig.verboseModelName
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [recordsToDelete, setRecordsToDelete] = useState<string[]>([]);
  //{ TaskTags: [] } ->
  const [originalSimpleModels, setOriginalSimpleModels] = useState(
    mapOriginalSimpleModels(
      prop as unknown as Record<string, unknown>,
      modelConfig
    )
  );

  const ref = useRef<any>(null);

  const { listURL } = useListURLStore((state) => ({
    listURL: state.listURL,
  }));

  //Derive prev URL from the listURL
  const prevURL = getPrevURL(listURL, modelConfig, pathname);

  const requiredList: Record<string, BasicModel[]> =
    createRequiredModelLists(modelConfig);

  //Generated by GetAllRelatedListFromRightRelatedModel

  const { modelMutation, modelQuery } = useModelQuery(modelConfig, id, {
    enabled: mounted && id !== "new",
    initialData: prop.data,
  });

  const task = modelQuery.data as TaskFormFormikInitialValues;

  const initialValues = getInitialValues<TaskFormFormikInitialValues>(
    modelConfig,
    task,
    { requiredList }
  );

  initialValues["TaskNoteFiles"] = [];

  const handleFocus = () => {
    ref && ref.current && ref.current.focus();
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
    setIsUpdating(true);

    const goToNewRecord = () => {
      formik.setValues(getInitialValues(modelConfig));
      window.history.pushState(
        {},
        "",
        `${window.location.origin}/${modelConfig.modelPath}/new`
      );
      setRecordName(`New ${modelConfig.verboseModelName}`);
      handleFocus();
    };

    //e.g. { deletedTaskTags: [], newTags: []}
    const deletedAndNewSimpleRecords = generateDeletedAndNewSimpleecords(
      modelConfig,
      originalSimpleModels,
      //@ts-ignore
      values
    );

    if (hasUpdate) {
      const payload = createClientPayload(
        //@ts-ignore
        values,
        modelConfig,
        deletedAndNewSimpleRecords
      );
      modelMutation
        //@ts-ignore
        .mutateAsync(payload)
        .then((data) => {
          if (addNew) {
            goToNewRecord();
          } else {
            //if there's a primary key field returned from the api then replace the formik value with it
            if (data[primaryKeyField]) {
              formik.setFieldValue(primaryKeyField, data[primaryKeyField]);

              window.history.pushState(
                {},
                "",
                `${window.location.origin}/${modelConfig.modelPath}/${data[primaryKeyField]}`
              );
            }

            //This will replace the breadcrum record name
            setRecordName(
              data[slugField]
                ? (data[slugField] as string)
                : (values[slugField as keyof typeof values] as string)
            );

            updateFormFieldsBasedOnRelationships(
              modelConfig,
              formik,
              //@ts-ignore
              values,
              data
            );

            updateSimpleModelsBasedOnRelationships(
              modelConfig,
              originalSimpleModels,
              setOriginalSimpleModels,
              data,
              deletedAndNewSimpleRecords
            );
          }

          toast({
            description: `${modelConfig.verboseModelName} list updated successfully`,
            variant: "success",
            duration: 2000,
          });

          setIsUpdating(false);

          router.replace(prevURL);
        })
        .catch((err) => {
          console.log(err);
          setIsUpdating(false);
        });
    } else {
      if (addNew) {
        goToNewRecord();
      }
      setIsUpdating(false);
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
        <div className="flex flex-col flex-1 h-full gap-8 xl:flex-row">
          <div className="flex flex-col flex-1 gap-4">
            <div
              className="grid grid-cols-12 gap-4"
              style={{
                gridTemplateAreas: generateGridTemplateAreas(modelConfig),
              }}
            >
              <FormikFormControlGenerator
                modelConfig={modelConfig}
                options={{
                  requiredList,
                  setHasUpdate: handleHasUdpate,
                  onChange: {
                    finishDateTime: (newValue) => {
                      if (newValue) {
                        formik.setFieldValue("isFinished", true);
                      } else {
                        formik.setFieldValue("isFinished", false);
                      }
                    },
                    isFinished: (newValue) => {
                      if (newValue) {
                        formik.setFieldValue(
                          "finishDateTime",
                          toValidDateTime(new Date())
                        );
                      } else {
                        formik.setFieldValue("finishDateTime", "");
                      }
                    },
                  },
                }}
              />
            </div>
            <FormikSubformGenerator
              modelConfig={modelConfig}
              formik={formik}
              handleHasUdpate={handleHasUdpate}
            />
            <ModelDropzonesForRelationships
              formik={formik}
              handleHasUpdate={handleHasUdpate}
              modelConfig={modelConfig}
            />
          </div>

          <div className="w-full xl:w-[500px]">
            <TaskNoteFileDropzone formik={formik} />
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={(e) => {
              formik.setFieldValue("addNew", true);
              handleSubmitClick(e);
            }}
            isLoading={isUpdating}
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
            isLoading={isUpdating}
          >
            Save
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              router.push(prevURL);
            }}
          >
            Back
          </Button>
          {(id !== "new" ||
            recordName !== "New " + modelConfig.verboseModelName) && (
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              onClick={(e) => {
                setRecordsToDelete([
                  //@ts-ignore
                  formik.values[primaryKeyField].toString(),
                ]);
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

  return mounted ? (
    <>
      <Breadcrumb
        links={[
          { name: modelConfig.pluralizedVerboseModelName, href: prevURL },
          { name: recordName, href: "" },
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        validationSchema={ModelSchema(modelConfig)}
      >
        {renderFormik}
      </Formik>
      <ModelDeleteDialog
        modelConfig={modelConfig}
        recordsToDelete={recordsToDelete}
        setRecordsToDelete={setRecordsToDelete}
        onSuccess={() => {
          toast({
            description:
              modelConfig.verboseModelName + " successfully deleted.",
            variant: "success",
            duration: 4000,
          });
          router.replace(prevURL);
        }}
      />
    </>
  ) : null;
};

export default TaskForm;
