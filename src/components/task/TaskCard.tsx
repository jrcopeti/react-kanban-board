// Hooks
import { useTask } from "../../hooks/useTask";
import { useKanban } from "../../hooks/useKanban";

//Components
import DatePicker from "./DatePicker";
import DialogDelete from "../DialogDelete";

//UI
import { Label } from "../@/components/ui/label";
import Input from "../@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@/components/ui/popover";
import { Textarea } from "../@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";

import { HiOutlinePencilSquare } from "react-icons/hi2";

import {
  MdOutlineCalendarToday,
  MdOutlinePersonOutline,
  MdOutlineSubject,
} from "react-icons/md";
import { CgTag } from "react-icons/cg";
import { PiCircleDuotone, PiCigaretteDuotone } from "react-icons/pi";

//Lib
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//Utils
import { sortedLabels, taskPriorities } from "../../utils";
import { format } from "date-fns";
import clsx from "clsx";
import Title from "./Title";
import Points from "./Points";
import Priority from "./Priority";
import Description from "./Description";
import Assignee from "./Assignee";
import TaskLabel from "./TaskLabel";
import DueDate from "./DueDate";

function TaskCard() {
  const {
    task,

    //States
    isPopoverOpen,
    isEditingTitle,
    setIsEditingTitle,
    isEditingPriority,
    setIsEditingPriority,
    isEditingDescription,
    setIsEditingDescription,
    isEditingAssignee,
    setIsEditingAssignee,
    isEditingLabel,
    setIsEditingLabel,
    isEditingDueDate,
    setIsEditingDueDate,
    dueDateState,
    setDueDateState,
    mouseIsOver,

    //Refs
    titleRef,
    descriptionRef,
    assigneeRef,
    labelRef,
    dueDateRef,

    //Handlers
    handleToggleIsEditing,
    handleBlur,
    handleFieldChange,
    handleKeydown,
    handleMouseEnter,
    handleMouseLeave,
    handleTogglePopover,
    updatePoints,
    updatePriority,
    updateLabel,
  } = useTask();

  const {
    title,
    assignee,
    description,
    createdDate,
    dueDate,
    priority,
    points,
    label,
    id,
  } = task;
  console.log("dueDate", dueDate);

  const { deleteTask } = useKanban();

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

  const labelToColor = sortedLabels.find((l) => l.label === label)?.color;
  const labelClassName = clsx(
    "absolute left-5 bottom-10 h-1 bg-pallette-300 text-sm capitalize ",
    `text-${labelToColor}-500`,
  );

  const divClassNameWithLabel = clsx(
    "relative h-[150px] cursor-grab touch-none bg-pallette-100 overflow-auto rounded-lg  border-l-8  bg-gray-50 px-2 py-0.5 shadow-md",
    `border-${labelToColor}-500`,
  );

  const labelIconClassName = clsx("text-sm", `text-${labelToColor}-500`);

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

      <section className="flex items-center justify-between px-4 py-2 text-xl font-semibold text-pallette-500">
        {/* Points */}
        <Points />

        {/* Priority */}
        <Priority />

        {/* Popover */}

        <Popover
          open={isPopoverOpen}
          onOpenChange={() => handleTogglePopover(id)}
        >
          {/* Trigger */}
          <PopoverTrigger>
            <HiOutlinePencilSquare />
          </PopoverTrigger>

          {/* Content */}

          <PopoverContent
            className="flex h-full w-[auto] min-w-[400px] items-start justify-center overflow-auto rounded-md border border-pallette-600 bg-pallette-100 p-12"
            sideOffset={5}
            side="right"
          >
            <div className="flex max-w-[500px] flex-col items-start gap-4">
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
        {mouseIsOver && (
          <>
            <DialogDelete handleDelete={deleteTask} id={id} task={task.title} />

            <section className="absolute bottom-0 left-24 z-30 -translate-x-1/2 flex-col gap-1 text-lg">
              <p className="text-left text-xs text-pallette-300">
                Created At: {format(createdDate, "dd, MMM yyyy")}
              </p>
            </section>

            {/* Label */}

            <div className={labelClassName}>{label}</div>
          </>
        )}
      </section>
    </div>
  );
}

export default TaskCard;
