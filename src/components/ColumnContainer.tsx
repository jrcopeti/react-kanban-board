import { Button } from "@/components/ui/button";
import type { ColumnContainerProps } from "../types";
import { HiOutlineTrash } from "react-icons/hi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Input from "@/components/ui/input";
import initialTasks from "../assets/data.json";
import { Task } from "../types";
import TaskCard from "./TaskCard";
import { FiPlusCircle } from "react-icons/fi";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
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

function ColumnContainer({
  column,
  updateColumn,
  deleteColumn,
  createTask,
  deleteTask,
  updateTask,
  totalPoints,
  tasks,
}: ColumnContainerProps) {
  const { id, title } = column;

  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColumn(id, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setIsEditing(false);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: isEditing,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const getTaskPosition = (id: number) => {
    const index = tasks.findIndex((task) => task.id === id);
    return index;
  };

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;

  //   if (active.id === over?.id) {
  //     return;
  //   }
  //   setTasks((tasks) => {
  //     const originalPosition = getTaskPosition(+active.id);
  //     const newPosition = over ? getTaskPosition(+over.id) : -1;

  //     return arrayMove(tasks, originalPosition, newPosition);
  //   });
  // };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
  );

  if (isDragging) {
    return (
      <div
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-gray-300 opacity-30"
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex h-full w-[350px] flex-col rounded-md bg-gray-300 overflow-auto"
    >
      <section className="text-md flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-b-gray-200 bg-gray-200 p-3 font-bold">
        <div className="flex gap-2">
          <div className="flex items-center justify-center bg-gray-500 px-2 py-1 text-sm">
            0
          </div>
          {isEditing ? (
            <Input
              autoFocus
              type="text"
              className="text-md w-full rounded border px-2 py-2 font-bold outline-none focus:border-rose-500"
              onBlur={handleBlur}
              value={title}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p
              onClick={handleClick}
              className="p-2 text-xl font-bold text-gray-500"
            >
              {title}
            </p>
          )}
        </div>
        <Button
          onClick={() => deleteColumn(id)}
          className="rounded bg-white stroke-gray-500 px-1 py-2 hover:bg-gray-500"
        >
          <HiOutlineTrash className="hover:stroke-white" size={20} />
        </Button>
      </section>

      {/* Content */}

      <section className="flex flex-grow flex-col gap-4 p-4">
        <p className="ml-3 text-2xl font-semibold">
          Total Points: {totalPoints}
        </p>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          
          />
        ))}
      </section>

      {/* Footer */}
      <Button
        onClick={() => createTask(id)}
        className="hover:bg:gray-500 flex items-center gap-2 rounded-md border-2 border-x-gray-500 border-b-gray-200 p-4 hover:text-rose-500 active:bg-black"
      >
        <FiPlusCircle size={20} /> Add Task
      </Button>
    </div>
  );
}

export default ColumnContainer;
