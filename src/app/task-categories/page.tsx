//Generated by WriteToModelsPage - Model Page Sidebar
import React from "react";
import TaskCategoryFilterForm from "@/components/task-categories/TaskCategoryFilterForm";
import TaskCategoryTable from "@/components/task-categories/TaskCategoryTable";

export const metadata = {
  title: "Task Categories",
};

const TaskCategories: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full px-4 mx-auto text-sm lg:px-0 main-height-less-footer">
      <div className="flex flex-col flex-1 w-full gap-4 p-4 border rounded-sm border-border">
        <h1 className="text-2xl font-bold">Task Categories</h1>
        <div className="flex">
          <TaskCategoryFilterForm />
        </div>
        <div className="flex flex-col flex-1 ">
          <TaskCategoryTable />
        </div>
      </div>
    </div>
  );
};

export default TaskCategories;