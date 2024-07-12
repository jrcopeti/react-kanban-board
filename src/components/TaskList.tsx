import initialTasks from "../assets/data.json";
import TaskCard from "./TaskCard";
import { tasksStatus } from "../utils";
import { useState } from "react";
import { Task } from "../types";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks as Task[]);

  const columns = tasksStatus.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumn,
    };
  });

  const updateTask = (task: Task) => {
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t;
    });
    setTasks(updatedTasks);
  };

  // Library DND Kit

  const getTaskPosition = (id: number) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    return index;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("active", active);

    if (active.id === over?.id) {
      return;
    }
    setTasks((tasks) => {
      const originalPosition = getTaskPosition(+active.id);
      const newPosition = over ? getTaskPosition(+over.id) : -1;

      return arrayMove(tasks, originalPosition, newPosition);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className="flex divide-x">
      {columns.map((column) => {
        const totalPoints = column.tasks.reduce(
          (total, task) => total + (task?.points || 0),
          0,
        );
        return (
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
            key={column.status}
          >
            <div className="w-80 p-2 text-3xl">
              <h2 className="ml-3 font-bold text-gray-500">{column.status}</h2>
              <p className="ml-3 text-2xl font-semibold">
                Total Points: {totalPoints}
              </p>
              <SortableContext
                items={column.tasks}
                strategy={verticalListSortingStrategy}
              >
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} updateTask={updateTask} />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        );
      })}
    </div>
  );
}

export default TaskList;
