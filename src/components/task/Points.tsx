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
        className="text-2xl opacity-100 hover:scale-125 hover:text-pallette-400 hover:opacity-65 dark:hover:text-slate-500"
        onClick={() => updatePoints("down")}
      >
        -
      </button>
      <p className="cursor-text">{points}</p>
      <button
        className="text-2xl opacity-100 hover:scale-125 hover:text-pallette-400 hover:opacity-65 dark:hover:text-slate-500"
        onClick={() => updatePoints("up")}
      >
        +
      </button>
    </div>
  );
}

export default Points;
