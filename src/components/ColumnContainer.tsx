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
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-pallette-600 bg-pallette-300 opacity-30"
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
      className="flex h-full w-[350px] flex-col overflow-auto rounded-md bg-pallette-100"
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
        className="flex items-center gap-2 rounded-md border-2 border-x-pallette-600 border-b-pallette-600 p-4 hover:bg-pallette-600 hover:text-pallette-100 active:bg-pallette-100"
      >
        <FiPlusCircle size={20} /> Add Task
      </Button>
    </div>
  );
}

export default ColumnContainer;
