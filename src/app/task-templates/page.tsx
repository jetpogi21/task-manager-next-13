//Generated by WriteToModelsPage - Model Page Sidebar
import React from "react";
import TaskTemplateFilterForm from "@/components/task-templates/TaskTemplateFilterForm";
import TaskTemplateTable from "@/components/task-templates/TaskTemplateTable";

export const metadata = {
  title: "Task Templates",
};

const TaskTemplates: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full px-4 mx-auto text-sm lg:px-0 main-height-less-footer">
      <div className="flex flex-col flex-1 w-full gap-4 p-4 mx-auto border rounded-sm border-border">
        <h1 className="text-2xl font-bold">Task Templates</h1>
        <div className="flex">
          <TaskTemplateFilterForm />
        </div>
        <div className="flex flex-col flex-1 ">
          <TaskTemplateTable />
        </div>
      </div>
    </div>
  );
};

export default TaskTemplates;
