import initialTasks from "../assets/data.json";
import TaskCard from "./TaskCard";
import { tasksStatus } from "../utils";
import { useState } from "react";
import { Task } from "../types";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks as Task[]);
  const columns = tasksStatus.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumn,
    };
  });

  const updateTaskPoints = (task: Task, points: number) => {
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? { ...t, points } : t;
    });
    console.log("update task", updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex divide-x">
      {columns.map((column) => {
        const totalPoints = column.tasks.reduce(
          (total, task) => total + (task?.points || 0),
          0,
        );
        console.log("total points", totalPoints)
        return (
          <div className="w-80 p-2 text-3xl" key={column.status}>
            <h2 className="ml-3 font-bold text-gray-500">{column.status}</h2>
            <p className="ml-3 text-2xl font-semibold">Total Points: {totalPoints}</p>
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                updateTaskPoints={updateTaskPoints}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
