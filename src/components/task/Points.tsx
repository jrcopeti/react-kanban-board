import { useTask } from "../../hooks/useTask";

function Points() {
  const { task, updatePoints } = useTask();
  const { points } = task;
  return (
    <div
      title="Points"
      className="flex items-center justify-start gap-5 text-lg"
    >
      <button className="text-2xl" onClick={() => updatePoints("down")}>
        -
      </button>
      <p className="cursor-text">{points}</p>
      <button className="text-2xl" onClick={() => updatePoints("up")}>
        +
      </button>
    </div>
  );
}

export default Points;
