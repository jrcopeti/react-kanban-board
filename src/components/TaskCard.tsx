//React
import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";

//UI
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Input from "@/components/ui/input";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiEqualLine } from "react-icons/ri";
import {
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDown,
  HiOutlineTrash,
} from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//Lib
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//Utils
import { labelOptions, sortedLabels, taskPriorities } from "../utils";

//Types
import type { Task, TaskCardProps } from "../types";
import DatePicker from "./DatePicker";
import { format } from "date-fns";
import clsx from "clsx";

function TaskCard({ task, updateTask, deleteTask }: TaskCardProps) {
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

  //Card state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [, setPriorityState] = useState<string>(priority);
  const [MouseIsOver, setMouseIsOver] = useState(false);

  //PopOver state
  const [isEditingPopOver, setIsEditingPopOver] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [isEditingCreatedDate, setIsEditingCreatedDate] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  console.log("isEditingLabel", isEditingLabel);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [dueDateState, setDueDateState] = useState<Date>(new Date(dueDate));

  //Refs
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const assigneeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLSelectElement>(null);
  const createdDateRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLButtonElement>(null);
  console.log("dueDateRef", dueDateRef);

  //Focus on input
  useEffect(() => {
    if (isEditingTitle) {
      titleRef.current?.focus();
    } else if (isEditingDescription && descriptionRef.current) {
      descriptionRef.current.focus();
    } else if (isEditingAssignee && assigneeRef.current) {
      assigneeRef.current.focus();
    } else if (isEditingCreatedDate && createdDateRef.current) {
      createdDateRef.current.focus();
    } else if (isEditingDueDate && dueDateRef.current) {
      dueDateRef.current.focus();
    } else if (isEditingLabel && labelRef.current) {
      console.log("label is triggered");
      labelRef.current.focus();
    }
  }, [
    isEditingTitle,
    isEditingDescription,
    isEditingAssignee,
    isEditingCreatedDate,
    isEditingDueDate,
    isEditingLabel,
  ]);

  //Updates

  // Update the task's due date when the dueDateState changes
  useEffect(() => {
    updateTask({ ...task, dueDate: dueDateState.toISOString() });
  }, [dueDateState, task.dueDate]);

  const updatePoints = (direction: "up" | "down") => {
    console.log("Inside updatePoints");
    const fib = [0, 1, 2, 3, 5, 8, 13];
    const currentIndex = fib.indexOf(points ?? -1);
    const nextIndex = direction === "up" ? currentIndex + 1 : currentIndex - 1;
    const newPoints = fib[nextIndex];
    if (newPoints) {
      updateTask({ ...task, points: newPoints });
    }
  };

  const updatePriority = (newPriority: string) => {
    setPriorityState(newPriority);
    updateTask({ ...task, priority: newPriority });
  };

  const updateLabel = (newLabel: string) => {
    console.log("newLabel", newLabel);
    updateTask({ ...task, label: newLabel });
  };

  //Handlers
  const handleToggleIsEditing = (
    setIsEditing: Dispatch<SetStateAction<boolean>>,
  ) => {
    setIsEditing((prev) => !prev);

    setMouseIsOver(false);
  };

  const handleBlur = (action: (value: boolean) => void) => {
    action(false);
  };

  const handleFieldChange = <T extends keyof Task>(
    field: T,
    value: Task[T],
  ) => {
    updateTask({ ...task, [field]: value });
  };

  const handleKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: (value: boolean) => void,
  ) => {
    if (e.key === "Enter" && e.shiftKey) {
      action(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditingPopOver(false);
    setIsEditingDescription(false);
    setIsEditingAssignee(false);
    setIsEditingLabel(false);
    setIsEditingCreatedDate(false);
    setIsEditingDueDate(false);
  };

  const handleMouseEnter = () => {
    setMouseIsOver(true);
  };

  const handleMouseLeave = () => {
    setMouseIsOver(false);
  };

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
    disabled: isEditingPopOver || isEditingTitle,
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
        className="relative h-[250px] cursor-grab touch-none overflow-auto rounded-lg border-2 border-rose-500 bg-gray-50 px-2 py-0.5 opacity-50 shadow-md"
      ></div>
    );
  }

  const labelToColor = sortedLabels.find((l) => l.label === label)?.color;
  console.log("labelToColor", labelToColor);
  const labelClassName = clsx(
    "absolute left-5 bottom-10 h-1 text-sm capitalize ",
    `text-${labelToColor}-500`,
  );

  const divClassNameWithLabel = clsx(
    " relative h-[250px] cursor-grab touch-none overflow-auto rounded-lg  border-l-8  bg-gray-50 px-2 py-0.5 shadow-md",
    `border-${labelToColor}-500`,
  );

  const divClassName = clsx(
    " relative h-[250px] cursor-grab touch-none overflow-auto rounded-lg bg-gray-50 px-2 py-0.5 shadow-md",
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={label ? divClassNameWithLabel : divClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title */}

      {isEditingTitle ? (
        <Input
          autoFocus
          type="text"
          className="w-full py-2 text-3xl"
          onBlur={() => handleBlur(() => setIsEditingTitle(false))}
          value={title}
          onChange={(e) => handleFieldChange("title", e.target.value as string)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeydown(e, setIsEditingTitle)
          }
          ref={titleRef}
        />
      ) : (
        <section
          className="break-words py-2 text-3xl font-semibold"
          onClick={() => handleToggleIsEditing(setIsEditingTitle)}
        >
          <h2>{title}</h2>
        </section>
      )}

      {/* Points */}

      <section className="flex items-center justify-between px-4 py-2 text-2xl">
        <div className="flex items-center justify-start gap-5">
          <button onClick={() => updatePoints("down")}>-</button>
          <p>{points}</p>
          <button onClick={() => updatePoints("up")}>+</button>
        </div>

        {/* Priority */}

        {isEditingPriority ? (
          <>
            <Label htmlFor="due Date" className="text-sm text-gray-400">
              Priority
            </Label>
            <select
              value={priority}
              onChange={(e) => updatePriority(e.target.value)}
              onBlur={() => handleBlur(setIsEditingPriority)}
            >
              {taskPriorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </>
        ) : (
          <div
            autoFocus
            onClick={() => handleToggleIsEditing(setIsEditingPriority)}
          >
            {priority === "low" && <HiOutlineChevronDown color="green" />}
            {priority === "medium" && <RiEqualLine color="orange" />}
            {priority === "high" && <HiOutlineChevronDoubleUp color="red" />}
          </div>
        )}

        {/* Popover */}

        <Popover>
          {/* Trigger */}
          <PopoverTrigger>
            <HiOutlinePencilSquare />
          </PopoverTrigger>

          {/* Content */}

          <PopoverContent className="h-[400px]" sideOffset={5} side="right">
            {/* Editing Popover */}
            {isEditingPopOver ? (
              <form onSubmit={handleSubmit}>
                <Label htmlFor="description" className="text-sm text-gray-400">
                  Description
                </Label>
                <Input
                  type="text"
                  className="w-full py-2 text-xl"
                  value={description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value as string)
                  }
                  ref={descriptionRef}
                />

                <Label htmlFor="assignee" className="text-sm text-gray-400">
                  Assignee
                </Label>
                <Input
                  type="text"
                  className="w-full py-2 text-xl"
                  value={assignee}
                  onChange={(e) =>
                    handleFieldChange("assignee", e.target.value as string)
                  }
                  ref={assigneeRef}
                />

                <Label htmlFor="label" className="text-sm text-gray-400">
                  Label
                </Label>
                <select
                  value={label}
                  onChange={(e) => updateLabel(e.target.value)}
                  onBlur={() => handleBlur(setIsEditingLabel)}
                  ref={labelRef}
                  className="capitalize"
                >
                  {labelOptions.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>

                <Label htmlFor="due Date" className="text-sm text-gray-400">
                  Due Date
                </Label>
                <DatePicker
                  ref={dueDateRef}
                  date={dueDateState}
                  setDate={setDueDateState}
                />

                <section className="flex">
                  <Button type="submit">Save</Button>
                </section>
              </form>
            ) : (
              // Display Popover
              <div>
                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingPopOver);
                    setIsEditingDescription(true);
                  }}
                  className="text-xl text-gray-700"
                >
                  <Label
                    htmlFor="description"
                    className="text-sm text-gray-400"
                  >
                    Description
                  </Label>
                  <p>{description}</p>
                </section>

                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingPopOver);
                    setIsEditingAssignee(true);
                  }}
                  className="flex h-full w-full flex-col gap-1 text-lg"
                >
                  <Label htmlFor="assignee" className="text-sm text-gray-400">
                    Assignee
                  </Label>
                  <p>{assignee}</p>
                </section>

                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingPopOver);
                    setIsEditingLabel(true);
                  }}
                  className="flex h-full w-full flex-col gap-1 text-lg"
                >
                  <Label htmlFor="label" className="text-sm text-gray-400">
                    Label
                  </Label>
                  <p>{label}</p>
                </section>

                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingPopOver);
                    setIsEditingDueDate(true);
                  }}
                  className="flex h-full w-full flex-col gap-1 text-lg"
                >
                  <Label htmlFor="Due Date" className="text-sm text-gray-400">
                    Due Date
                  </Label>
                  <p>{format(dueDateState, "MMMM d, yyyy")}</p>
                </section>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Delete Task */}
        {MouseIsOver && (
          <>
            <Button
              onClick={() => deleteTask(id)}
              className="absolute bottom-0 right-5 z-30 translate-x-1/2"
            >
              <HiOutlineTrash
                className="opacity-60 hover:stroke-rose-500 hover:opacity-100"
                size={20}
              />
            </Button>

            <section className="absolute bottom-0 left-24 z-30 -translate-x-1/2 flex-col gap-1 text-lg">
              <p className="text-sm text-gray-400">
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
