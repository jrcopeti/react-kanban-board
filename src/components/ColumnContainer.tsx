//React
import { useMemo } from "react";

//Hooks
import { useKanban } from "../hooks/useKanban";
import { useColumn } from "../hooks/useColumn";
import { TaskProvider } from "../context/TaskContext";

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
import clsx from "clsx";
import { Task } from "src/types";

function ColumnContainer() {
  const { deleteColumn, createTask } = useKanban();

  const {
    //Values
    tasksInColumn,
    totalPoints,
    column,

    //States
    isEditing,
    popoverOpenStates,

    //Handlers
    handleClick,
    handleBlur,
    handleOnChange,
    handleKeyDown,
  } = useColumn();

  // Library DND Kit

  const tasksIds = useMemo(() => {
    return tasksInColumn.map((task) => task.id);
  }, [tasksInColumn]);

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
    id: column.id,
    disabled: isEditing || isAnyPopoverOpen,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const getHeight = (tasksInColumn: Task[]) => {
    switch (tasksInColumn.length) {
      case 0:
        return "135px";
      case 1:
        return "283px";
      case 2:
        return "450px";
      case 3:
        return "630px";
      case 4:
        return "900px";
      default:
        return "1000px";
    }
  };

  const isDraggingClassName = clsx(
    "flex w-[350px] flex-col rounded-md border-2 border-pallette-600 bg-pallette-300 opacity-30 overflow-auto",
    `min-h-[${getHeight(tasksInColumn)}] max-h-[${getHeight(tasksInColumn)}] `,
  );

  if (isDragging) {
    return (
      <div className={isDraggingClassName} ref={setNodeRef} style={style}></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex h-full max-h-full w-[350px] flex-col overflow-auto rounded-md bg-pallette-100"
    >
      <section className="flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-b-gray-200 bg-pallette-600 p-3 text-xl font-bold text-white">
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
              value={column.title}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p
              onClick={handleClick}
              className="p-2 text-xl font-bold text-gray-500"
            >
              {column.title}
            </p>
          )}
        </div>

        <DialogDelete
          handleDelete={deleteColumn}
          id={column.id}
          column={column.title}
          isTask={false}
        />
      </section>

      {/* Content */}

      <section className="flex flex-grow touch-manipulation flex-col gap-4 p-4">
        <SortableContext items={tasksIds}>
          {tasksInColumn.map((task) => (
            <TaskProvider
              key={task.id}
              task={task}
              isPopoverOpen={popoverOpenStates[task.id] || false}
            >
              <TaskCard />
            </TaskProvider>
          ))}
        </SortableContext>
      </section>

      {/* Footer */}
      <Button
        onClick={() => {
          createTask(column.id);
        }}
        className="flex items-center gap-2 rounded-md border-2 border-x-pallette-600 border-b-pallette-600 p-4 hover:bg-pallette-600 hover:text-pallette-100 active:bg-pallette-100"
      >
        <FiPlusCircle size={20} /> Add Task
      </Button>
    </div>
  );
}

export default ColumnContainer;
