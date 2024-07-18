import { useTask } from "../../hooks/useTask";

function Points() {
  const { task, updatePoints } = useTask();
  const { points } = task;
  return (
    <div className="flex items-center justify-start gap-5">
      <button onClick={() => updatePoints("down")}>-</button>
      <p>{points}</p>
      <button onClick={() => updatePoints("up")}>+</button>
    </div>
  );
}

export default Points;
