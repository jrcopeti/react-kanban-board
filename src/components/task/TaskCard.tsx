// Hooks
import { useTask } from "../../hooks/useTask";

//Components
import Title from "./Title";
import Points from "./Points";
import Priority from "./Priority";
import Description from "./Description";
import Assignee from "./Assignee";
import TaskLabel from "./TaskLabel";
import DueDate from "./DueDate";
import MouseIsOver from "./MouseIsOver";

//UI
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@/components/ui/popover";
import { HiOutlinePencilSquare } from "react-icons/hi2";

//Lib
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//Utils
import clsx from "clsx";

function TaskCard() {
  const {
    task,

    //States
    isPopoverOpen,
    isEditingTitle,

    //Handlers
    handleMouseEnter,
    handleMouseLeave,
    handleTogglePopover,

    //Helpers
    labelToColor,
  } = useTask();

  const { id } = task;

  // DND Kit
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: isPopoverOpen || isEditingTitle,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-pallette-600px-2 relative h-[150px] cursor-grab touch-none overflow-auto rounded-lg border-2 border-pallette-200 py-0.5 opacity-50 shadow-md"
      ></div>
    );
  }

  const divClassNameWithLabel = clsx(
    "relative h-[135px] cursor-grab touch-none bg-orange-100 dark:bg-blue-200 overflow-hidden rounded-lg border-l-8 bg-gray-50 px-2 py-1 shadow-md",
    `border-${labelToColor}-500`,
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={divClassNameWithLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title */}
      <Title />

      <section className="flex w-[340px] flex-grow items-center justify-evenly px-4 py-3 text-xl font-semibold text-pallette-500">
        {/* Points */}
        <Points />

        {/* Priority */}
        <Priority />

        {/* Popover */}

        <Popover
          open={isPopoverOpen}
          onOpenChange={() => {
            handleTogglePopover(id);
          }}
        >
          {/* Trigger */}
          <PopoverTrigger
            title="Edit Task"
            className="rounded-md p-2 text-pallette-500 dark:text-slate-500 min-w-[300px]"
          >
            <HiOutlinePencilSquare
              size={25}
              className="transform opacity-100 transition-transform ease-in-out hover:scale-125 hover:text-pallette-200 hover:opacity-65 dark:hover:text-slate-500"
            />
          </PopoverTrigger>

          {/* Content */}

          <PopoverContent
            className="flex max-h-[665px] min-h-[540px] w-[auto] min-w-[500px] items-start justify-center overflow-auto rounded-md border border-pallette-600 bg-pallette-100 p-6"
            sideOffset={5}
            side="right"
          >
            <div className="flex max-w-[500px] flex-col items-start gap-4">
              <h2 className="mb-2 text-center text-2xl font-semibold">
                {task.title}
              </h2>
              {/* Description */}
              <Description />

              {/* Assignee */}
              <Assignee />

              {/* Label */}
              <TaskLabel />

              {/* Due Date */}
              <DueDate />
            </div>
          </PopoverContent>
        </Popover>

        {/* Delete Task */}
        <div>
          <MouseIsOver />
        </div>
      </section>
    </div>
  );
}

export default TaskCard;
