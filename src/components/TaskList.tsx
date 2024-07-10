import tasks from "../assets/data.json";
import TaskCard from "./TaskCard";

function TaskList() {
  console.log(tasks);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
