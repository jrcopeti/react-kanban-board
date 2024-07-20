import { formatDistanceToNow, isToday } from "date-fns";
import { useTask } from "../../hooks/useTask";

function DueDateInCard() {
  const {
    dueDateState,
    task: { dueDate },
  } = useTask();

  const isValidDate = dueDateState && !isNaN(new Date(dueDateState).getTime());

  if (!dueDate || !isValidDate) return;

  return (
    <section
      title="Due Date"
      className={`${isToday(new Date(dueDateState)) ? "font left-[220px] text-rose-500 dark:text-rose-800" : "left-[210px]"} absolute bottom-[0.55rem] z-30 min-w-[125px] -translate-x-1/2 flex-col gap-1 text-lg text-pallette-300 dark:text-slate-500`}
    >
      <p className="text-left text-xs">
        {isToday(new Date(dueDateState)) ? (
          <>
            <small className="mr-1.5 text-pallette-600 dark:text-slate-500">
              Due
            </small>
            Today
          </>
        ) : (
          <>
            <small className="mr-2 text-pallette-600 dark:text-slate-800">
              Due in
            </small>
            {formatDistanceToNow(new Date(dueDateState || new Date()))}
          </>
        )}
      </p>
    </section>
  );
}

export default DueDateInCard;