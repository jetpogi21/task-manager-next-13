//Generated by WriteToModelsPage - Model Page Sidebar
import React from "react";
import TaskIntervalFilterForm from "@/components/task-intervals/TaskIntervalFilterForm";
import TaskIntervalTable from "@/components/task-intervals/TaskIntervalTable";

export const metadata = {
  title: "Task Intervals",
};

const TaskIntervals: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full px-4 mx-auto text-sm lg:px-0 main-height-less-footer">
      <div className="flex flex-col flex-1 w-full gap-4 p-4 border rounded-sm border-border">
        <h1 className="text-2xl font-bold">Task Intervals</h1>
        <div className="flex">
          <TaskIntervalFilterForm />
        </div>
        <div className="flex flex-col flex-1 ">
          <TaskIntervalTable />
        </div>
      </div>
    </div>
  );
};

export default TaskIntervals;
