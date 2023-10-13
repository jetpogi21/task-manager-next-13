import React from "react";
import TaskFilterForm from "@/components/tasks/TaskFilterForm";
import TaskTable from "@/components/tasks/TaskTable";
import PageSession from "@/components/PageSession";
import { TaskConfig } from "@/utils/config/TaskConfig";

const config = TaskConfig;

export const metadata = {
  title: config.pluralizedModelName,
};

const Tasks: React.FC = () => {
  return (
    <>
      <div className="flex flex-col flex-1 w-full mx-auto text-sm 2xl:px-0 main-height-less-footer">
        <div className="flex flex-col flex-1 w-full gap-4 pl-4 mx-auto rounded-sm">
          <h1 className="text-2xl font-bold">{config.pluralizedModelName}</h1>
          <div className="flex">
            <TaskFilterForm />
          </div>
          <div className="flex flex-col flex-1 ">
            <TaskTable />
          </div>
        </div>
      </div>
      <PageSession />
    </>
  );
};

export default Tasks;
