//Hooks
import { useKanban } from "../../hooks/useKanban";
import { useTask } from "../../hooks/useTask";

//Components
import DialogDelete from "../ui/DialogDelete";
import CreatedDate from "./CreatedDate";
import DueDateInMouseIsOver from "./DueDateInMouseIsOver";

//Utils
import clsx from "clsx";

function MouseIsOver() {
  const { deleteTask } = useKanban();
  const { mouseIsOver, task, labelToColor } = useTask();
  const { label, title, id } = task;

  const labelClassName = clsx(
    "absolute left-3 bottom-11 h-1 text-sm capitalize ",
    `text-${labelToColor}-500`,
  );
  return (
    <>
      {mouseIsOver && (
        <>
          <DialogDelete handleDelete={deleteTask} id={id} task={title} />

          {/* Created Date */}

          <CreatedDate />
          <DueDateInMouseIsOver />

          {/* Label */}
          <div className={labelClassName}>{label}</div>
        </>
      )}
    </>
  );
}

export default MouseIsOver;
