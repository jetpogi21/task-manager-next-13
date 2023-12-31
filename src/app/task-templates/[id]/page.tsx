//Generated by WriteToDetailPageNext13 - Detail Page Sidebar
import RouterRefresh from "@/components/RouterRefresh";
import TaskTemplateForm from "@/components/task-templates/TaskTemplateForm";
import { TaskTemplateConfig } from "@/utils/config/TaskTemplateConfig";
import { notFound } from "next/navigation";

const modelConfig = TaskTemplateConfig;

export const metadata = {
  title: modelConfig.verboseModelName + " Form",
};

async function getData(id: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/" + modelConfig.modelPath + "/" + id,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw notFound();
  }

  return res.json();
}

const TaskTemplateFormPage = async ({ params }: { params: { id: string } }) => {
  const data = params.id === "new" ? null : await getData(params.id);

  return (
    <div className="flex flex-col flex-1 w-full mx-auto text-sm lg:px-0 main-height-less-footer">
      <div className="flex flex-col w-full h-full gap-4 pl-4">
        <div className="flex flex-col h-full">
          <TaskTemplateForm
            id={params.id}
            data={data}
          />
          <RouterRefresh />
        </div>
      </div>
    </div>
  );
};

export default TaskTemplateFormPage;
