//React
import { useMemo } from "react";

//Hooks
import { useKanban } from "../../hooks/useKanban";
import { useColumn } from "../../hooks/useColumn";
import { TaskProvider } from "../../context/TaskContext";

//Components
import TaskCard from "../task/TaskCard";
import DialogDelete from "../ui/DialogDelete";

//UI
import Input from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
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
  console.log("tasksIds", tasksIds);
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
        return "152px";
      case 1:
        return "287px";
      case 2:
        return "438px";
      case 3:
        return "589px";
      case 4:
        return "740px";
      default:
        return "890px";
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
      className="z-40 flex h-full max-h-full w-[350px] cursor-grab flex-col overflow-auto rounded-md bg-pallette-100 dark:bg-blue-100"
    >

      <section className="flex h-[60px] items-center justify-between rounded-lg border-4 border-pallette-100 bg-pallette-500 p-3 text-xl font-semibold text-pallette-100 dark:border-blue-100 dark:bg-slate-700 dark:text-blue-100">

        <div className="flex gap-2">
          <div className="flex cursor-text items-center justify-center px-2 py-1 text-xl text-pallette-100 dark:text-blue-100">
            {totalPoints}
          </div>
          {isEditing ? (
            <Input
              maxLength={16}
              autoFocus
              type="text"
              className="w-full rounded border border-pallette-600 px-2 py-2 text-xl font-semibold text-pallette-100 outline-none dark:text-blue-100"
              onBlur={handleBlur}
              value={column.title}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p
              onClick={handleClick}
              className="cursor-pointer p-2 text-xl font-semibold text-pallette-100 dark:text-blue-100"
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

        className="flex h-[60px] cursor-pointer items-center gap-2 rounded-lg border-4 border-pallette-100 bg-pallette-500 p-3 text-xl font-semibold text-pallette-100 dark:border-blue-100 dark:bg-slate-800 dark:text-blue-100 dark:hover:bg-rose-950"

      >
        <FiPlusCircle size={15} /> Add Task
      </Button>
    </div>
  );
}

export default ColumnContainer;
