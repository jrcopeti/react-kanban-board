import tasks from "../assets/data.json";
import TaskCard from "./TaskCard";
import { tasksStatus } from "../utils";

function TaskList() {
  const columns = tasksStatus.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumn,
    };
  });

  console.log(columns);

  return (
    <div className="flex divide-x">
      {columns.map((column) => (
        <div className="w-80 p-2 text-3xl" key={column.status}>
          <h1 className="ml-3 font-bold text-gray-500">{column.status}</h1>
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
