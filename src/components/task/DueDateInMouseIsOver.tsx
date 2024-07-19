import { formatDistanceToNow, isToday } from "date-fns";
import { useTask } from "../../hooks/useTask";

function DueDateInMouseIsOver() {
  const { task } = useTask();
  const { dueDate } = task;

  return (
    <section
      title="Due Date"
      className={
        dueDate
          ? `${isToday(new Date(dueDate)) ? "right-[3rem] text-rose-500 dark:text-rose-900" : "right-[1.5rem]"} absolute bottom-2 z-30 -translate-x-1/2 flex-col gap-1 text-lg text-pallette-300 dark:text-slate-500`
          : ""
      }
    >
      <p className="text-left text-xs">
        {dueDate
          ? isToday(new Date(dueDate))
            ? "Due: Today"
            : `Due: ${formatDistanceToNow(new Date(dueDate), { addSuffix: true })}`
          : ""}
      </p>
    </section>
  );
}

export default DueDateInMouseIsOver;
