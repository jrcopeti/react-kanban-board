//Hooks
import { useKanban } from "../../hooks/useKanban";
import { useTask } from "../../hooks/useTask";

//Components
import DialogDelete from "../DialogDelete";
import CreatedDate from "./CreatedDate";

//Utils
import { sortedLabels } from "../../utils";
import clsx from "clsx";

function MouseIsOver() {
  const { deleteTask } = useKanban();
  const { mouseIsOver, task } = useTask();
  const { label, title, id } = task;

  const labelToColor = sortedLabels.find((l) => l.label === label)?.color;

  const labelClassName = clsx(
    "absolute left-5 bottom-10 h-1 bg-pallette-300 text-sm capitalize ",
    `text-${labelToColor}-500`,
  );
  return (
    <>
      {mouseIsOver && (
        <>
          <DialogDelete handleDelete={deleteTask} id={id} task={title} />

          {/* Created Date */}
          <CreatedDate />

          {/* Label */}
          <div className={labelClassName}>{label}</div>
        </>
      )}
    </>
  );
}

export default MouseIsOver;
