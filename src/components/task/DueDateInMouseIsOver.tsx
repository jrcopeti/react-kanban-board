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
          ? `${isToday(new Date(dueDate)) ? "right-[5rem]" : "right-[1.5rem]"} absolute bottom-2 z-30 -translate-x-1/2 flex-col gap-1 text-lg`
          : ""
      }
    >
      <p className="text-left text-xs text-pallette-300 dark:text-slate-500">
        {dueDate
          ? isToday(new Date(dueDate))
            ? "Today"
            : `Due: ${formatDistanceToNow(new Date(dueDate), { addSuffix: true })}`
          : ""}
      </p>
    </section>
  );
}

export default DueDateInMouseIsOver;
