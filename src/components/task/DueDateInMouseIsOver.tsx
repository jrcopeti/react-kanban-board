import { formatDistanceToNow, isToday } from "date-fns";
import { useTask } from "../../hooks/useTask";

function DueDateStateInMouseIsOver() {
  const { dueDateState } = useTask();

  if (!dueDateState) return;

  return (
    <section
      title="Due Date"
      className={`${isToday(new Date(dueDateState)) ? "right-[3rem] text-rose-500 dark:text-rose-900" : "right-[1.5rem]"} absolute bottom-2 z-30 -translate-x-1/2 flex-col gap-1 text-lg text-pallette-300 dark:text-slate-500`}
    >
      <p className="text-left text-xs">
        {isToday(new Date(dueDateState))
          ? "Due: Today"
          : `Due: ${formatDistanceToNow(new Date(dueDateState), { addSuffix: true })}`}
      </p>
    </section>
  );
}

export default DueDateStateInMouseIsOver;
