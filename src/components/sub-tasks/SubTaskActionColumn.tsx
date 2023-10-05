import { Button } from "@/components/ui/Button";
import { GenericTooltip } from "@/components/ui/Tooltip";
import { SubTaskFormikShape } from "@/interfaces/SubTaskInterfaces";
import { CellContext, TableMeta } from "@tanstack/react-table";
import { CheckCircle, Trash2, XCircle } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";

interface TooltipButtonProps {
  icon: ReactNode;
  tooltipContent: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TooltipButton = ({
  icon,
  tooltipContent,
  onClick,
}: TooltipButtonProps) => (
  <GenericTooltip
    Trigger={
      <Button
        tabIndex={-1}
        type="button"
        size="sm"
        variant={"ghost"}
        onClick={onClick}
      >
        {icon}
      </Button>
    }
    Content={<p>{tooltipContent}</p>}
  />
);

export const SubTaskActionColumn = <TData, TValue>(
  cell: CellContext<SubTaskFormikShape, unknown>
) => {
  const { row, table } = cell;

  const tableMeta = table.options.meta!;
  const deleteRow = tableMeta.deleteRow;
  const { toggleSubTaskFinishDateTime } = tableMeta.rowActions!;
  const index = row.index;

  const isFinished = Boolean(row.original.finishDateTime);

  const icon = isFinished ? (
    <XCircle className="w-4 h-4 text-rose-500" />
  ) : (
    <CheckCircle className="w-4 h-4 text-green-500" />
  );
  const tooltipContent = isFinished ? "Task Not Finished" : "Finish Sub-task";

  return (
    <div className="flex pr-4 space-x-2">
      <TooltipButton
        icon={icon}
        tooltipContent={tooltipContent}
        onClick={() => toggleSubTaskFinishDateTime(index)}
      />
      <GenericTooltip
        Trigger={
          <Button
            tabIndex={-1}
            type="button"
            size="sm"
            variant={"ghost"}
            onClick={() => deleteRow && deleteRow(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        }
        Content={<p>Delete Sub-task</p>}
      />
    </div>
  );
};
