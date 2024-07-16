//React
import { useMemo, useState } from "react";

//Components
import TaskCard from "./TaskCard";
import DialogDelete from "./DialogDelete";

//UI
import Input from "./@/components/ui/input";
import { Button } from "./@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";

//Lib
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext } from "@dnd-kit/sortable";

//Types
import type { ColumnContainerProps, Id } from "../types";
import { useKanban } from "../hooks/useKanban";

function ColumnContainer({
  column,
  tasks,
}: ColumnContainerProps) {
  const { id, title } = column;

  const { updateColumn, deleteColumn, createTask, deleteTask, updateTask } =
    useKanban();

  const [isEditing, setIsEditing] = useState(false);
  const [popoverOpenStates, setPopoverOpenStates] = useState<{
    [key: Id]: boolean;
  }>({});

  const totalPoints = tasks.reduce(
    (total, task) => total + (task?.points || 0),
    0,
  );

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

  // Library DND Kit
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const isAnyPopoverOpen = Object.values(popoverOpenStates).some(
    (state) => state,
  );

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: isEditing || isAnyPopoverOpen,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        className="border-pallette-600 bg-pallette-300 flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 opacity-30"
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
      className="bg-pallette-100 flex h-full w-[350px] flex-col overflow-auto rounded-md"
    >
      <section className="bg-pallette-600 flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-b-gray-200 p-3 text-xl font-bold text-white">
        <div className="flex gap-2">
          <div className="flex items-center justify-center px-2 py-1 text-xl text-white">
            {totalPoints}
          </div>
          {isEditing ? (
            <Input
              autoFocus
              type="text"
              className="w-full rounded border px-2 py-2 text-xl font-bold text-white outline-none focus:border-black"
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

        <DialogDelete
          handleDelete={deleteColumn}
          id={id}
          column={column.title}
          isTask={false}
        />
      </section>

      {/* Content */}

      <section className="flex flex-grow flex-col gap-4 p-4">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              isPopoverOpen={popoverOpenStates[task.id] || false}
              setPopoverOpenStates={setPopoverOpenStates}
            />
          ))}
        </SortableContext>
      </section>

      {/* Footer */}
      <Button
        onClick={() => {
          createTask(id);
        }}
        className="border-x-pallette-600 border-b-pallette-600 hover:bg-pallette-600 hover:text-pallette-100 active:bg-pallette-100 flex items-center gap-2 rounded-md border-2 p-4"
      >
        <FiPlusCircle size={20} /> Add Task
      </Button>
    </div>
  );
}

export default ColumnContainer;
