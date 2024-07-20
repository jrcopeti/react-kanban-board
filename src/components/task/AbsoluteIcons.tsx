//Hooks
import { MdOutlinePersonOutline, MdOutlineSubject } from "react-icons/md";
import { useKanban } from "../../hooks/useKanban";
import { useTask } from "../../hooks/useTask";

//Components
import DialogDelete from "../ui/DialogDelete";

//Utils
import clsx from "clsx";
function AbsoluteIcons() {
  const { deleteTask } = useKanban();
  const { task, mouseIsOver, labelToColor, isEditingTitle } = useTask();
  const { label, title, id, assignee, description } = task;

  const labelClassName = clsx(
    "absolute left-[0.55rem] bottom-10 h-1 text-xs capitalize ",
    `text-${labelToColor}-500`,
  );
  return (
    <>
      {/* Assignee */}
      {assignee && !isEditingTitle && (
        <div
          title={assignee}
          className="absolute right-2 top-7 h-1 cursor-pointer text-sm capitalize text-pallette-500 dark:text-slate-500"
        >
          <MdOutlinePersonOutline size={22} />
        </div>
      )}

      {description && !isEditingTitle && (
        <div
          title={description}
          className="absolute right-2 top-1 h-1 cursor-pointer text-sm capitalize text-pallette-500 dark:text-slate-500"
        >
          <MdOutlineSubject size={20} />
        </div>
      )}

      {mouseIsOver && (
        <>
          <DialogDelete handleDelete={deleteTask} id={id} task={title} />

          {/* Label */}
          <div className={labelClassName}>{label}</div>
        </>
      )}
    </>
  );
}

export default AbsoluteIcons;
