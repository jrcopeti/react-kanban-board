import { useTask } from "../../hooks/useTask";
import { format } from "date-fns";

function CreatedDate() {
  const { task } = useTask();
  const { createdDate } = task;
  return (
    <section title="Created Date" className="absolute bottom-2 left-24 z-30 -translate-x-1/2 flex-col gap-1 text-lg">
      <p className="text-left text-xs text-pallette-300 dark:text-slate-500">
        Created At: {format(createdDate, "dd, MMM yyyy")}
      </p>
    </section>
  );
}

export default CreatedDate;
