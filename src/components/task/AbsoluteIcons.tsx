//Hooks
import { MdOutlinePersonOutline, MdOutlineSubject } from "react-icons/md";
import { useKanban } from "../../hooks/useKanban";
import { useTask } from "../../hooks/useTask";

//Components
import DialogDelete from "../ui/DialogDelete";

//UI
import { TbHandClick } from "react-icons/tb";
import { TbClick } from "react-icons/tb";

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
      {!isEditingTitle && (
        <>
          <div
            title="Drag And Drop"
            className="absolute left-3 top-11 h-1 cursor-pointer text-sm capitalize text-pallette-500 dark:text-slate-500 lg:hidden"
          >
            <TbHandClick size={22} />
          </div>

          <div
            title="Drag And Drop"
            className={`transform transition-transform ease-in-out hover:text-pallette-200 hover:opacity-65 dark:hover:text-slate-500 ${mouseIsOver ? "visible" : "invisible"} absolute left-3 top-10 hidden h-1 cursor-pointer text-sm capitalize text-pallette-500 dark:text-slate-500 lg:block`}
          >
            <TbClick size={22} />
          </div>
        </>
      )}
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
