import { useKanban } from "../../hooks/useKanban";
import { useTask } from "../../hooks/useTask";

function Points() {
  const { updatePoints } = useKanban();
  const { task, mouseIsOver } = useTask();
  const { points } = task;
  return (
    <div
      title="Points"
      className="flex -translate-x-1 items-center justify-start gap-5 text-lg lg:translate-x-0"
    >
      <button
        className={`${mouseIsOver ? "opacity-100" : "opacity-0"} transform text-4xl transition-transform ease-in-out hover:scale-150 hover:text-pallette-400 hover:opacity-65 dark:hover:text-slate-500 lg:text-2xl`}
        onClick={() => updatePoints("down", task)}
      >
        -
      </button>
      <p className="min-w-6 cursor-text">{points}</p>
      <button
        className={`${mouseIsOver ? "opacity-100" : "opacity-0"} transform text-4xl transition-transform ease-in-out hover:scale-150 hover:text-pallette-400 hover:opacity-65 dark:hover:text-slate-500 lg:text-2xl`}
        onClick={() => updatePoints("up", task)}
      >
        +
      </button>
    </div>
  );
}

export default Points;
