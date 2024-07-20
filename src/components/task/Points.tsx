import { useTask } from "../../hooks/useTask";

function Points() {
  const { task, updatePoints } = useTask();
  const { points } = task;
  return (
    <div
      title="Points"
      className="flex items-center justify-start gap-5 text-lg"
    >
      <button
        className="transform text-2xl opacity-100 transition-transform ease-in-out hover:scale-150 hover:text-pallette-400 hover:opacity-65 dark:hover:text-slate-500"
        onClick={() => updatePoints("down")}
      >
        -
      </button>
      <p className="cursor-text min-w-6 ">{points}</p>
      <button
        className="transform text-2xl -ml-2 opacity-100 transition-transform ease-in-out hover:scale-150 hover:text-pallette-400 hover:opacity-65 dark:hover:text-slate-500"
        onClick={() => updatePoints("up")}
      >
        +
      </button>
    </div>
  );
}

export default Points;
