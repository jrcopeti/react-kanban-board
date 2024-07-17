//React
import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";

//Components
import DatePicker from "./DatePicker";
import DialogDelete from "./DialogDelete";

//UI
import { Label } from "./@/components/ui/label";
import Input from "./@/components/ui/input";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiEqualLine } from "react-icons/ri";
import { HiOutlineChevronDoubleUp, HiOutlineChevronDown } from "react-icons/hi";
import { useToast } from "./@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./@/components/ui/popover";
import { Textarea } from "./@/components/ui/textarea";
import {
  MdOutlineCalendarToday,
  MdOutlinePersonOutline,
  MdOutlineSubject,
} from "react-icons/md";
import { CgTag } from "react-icons/cg";

//Lib
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//Utils
import { labelOptions, sortedLabels, taskPriorities } from "../utils";
import { format } from "date-fns";
import clsx from "clsx";

//Types
import type { Id, Task, TaskCardProps } from "../types";
import { PiCigaretteDuotone, PiCircleDuotone } from "react-icons/pi";

function TaskCard({
  task,
  updateTask,
  deleteTask,
  isPopoverOpen,
  setPopoverOpenStates,
}: TaskCardProps) {
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

  const { toast } = useToast();

  //Card state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [MouseIsOver, setMouseIsOver] = useState(false);

  //PopOver state
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [dueDateState, setDueDateState] = useState<Date>(new Date(dueDate));
  console.log("dueDateState", dueDateState);

  //Refs
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const assigneeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLSelectElement>(null);
  const dueDateRef = useRef<HTMLButtonElement>(null);

  //Focus on input
  useEffect(() => {
    if (isEditingTitle) {
      titleRef.current?.focus();
    } else if (isEditingDescription && descriptionRef.current) {
      descriptionRef.current.focus();
    } else if (isEditingAssignee && assigneeRef.current) {
      assigneeRef.current.focus();
    } else if (isEditingDueDate && dueDateRef.current) {
      dueDateRef.current.focus();
    } else if (isEditingLabel && labelRef.current) {
      labelRef.current.focus();
    }
  }, [
    isEditingTitle,
    isEditingDescription,
    isEditingAssignee,
    isEditingDueDate,
    isEditingLabel,
  ]);

  const prevTaskRef = useRef(task);
  console.log("prevTaskRef", prevTaskRef);
  const isInitialRender = useRef(true);
  console.log("isInitialRender", isInitialRender);

  useEffect(() => {
    // Skip the initial mounting effect
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      // Check if relevant task details have changed, excluding due date since it's handled separately
      if (
        prevTaskRef.current.title !== task.title ||
        prevTaskRef.current.assignee !== task.assignee ||
        prevTaskRef.current.points !== task.points ||
        prevTaskRef.current.description !== task.description ||
        prevTaskRef.current.priority !== task.priority ||
        prevTaskRef.current.label !== task.label
      ) {
        const debounce = setTimeout(() => {
          toast({
            title: `${task.title}`,
            description: "Was updated successfully",
          });
        }, 2000);

        return () => {
          clearTimeout(debounce);
        };
      }
    }
    // Update ref to current task at the end of the effect
    prevTaskRef.current = task;
  }, [task, toast]);

  // Effect to update the task's due date when dueDateState changes
  useEffect(() => {
    if (!isInitialRender.current) {
      console.log(
        ".....................................................The due date has changed",
      );
      updateTask({ ...task, dueDate: new Date(dueDateState) });
    }
  }, [dueDateState]);

  const updatePoints = (direction: "up" | "down") => {
    const fib = [0, 1, 2, 3, 5, 8, 13];
    const currentIndex = fib.indexOf(points ?? -1);
    const nextIndex = direction === "up" ? currentIndex + 1 : currentIndex - 1;
    const newPoints = fib[nextIndex];
    if (newPoints) {
      updateTask({ ...task, points: newPoints });
    }
  };

  const updatePriority = (newPriority: string) => {
    updateTask({ ...task, priority: newPriority });
  };

  const updateLabel = (newLabel: string) => {
    updateTask({ ...task, label: newLabel });
  };

  //Handlers
  const handleToggleIsEditing = (
    setIsEditing: Dispatch<SetStateAction<boolean>>,
  ) => {
    setIsEditing((prev) => !prev);
    setMouseIsOver(false);
  };

  const handleBlur = (setIsEditing: (value: boolean) => void) => {
    setIsEditing(false);
  };

  const handleFieldChange = <T extends keyof Task>(
    field: T,
    value: Task[T],
  ) => {
    console.log("handleFieldChange  CALLED", field, value);
    updateTask({ ...task, [field]: value });
  };

  const handleKeydown = <T extends HTMLElement>(
    e: React.KeyboardEvent<T>,

    setIsEditing: (isActive: boolean) => void,
  ) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleMouseEnter = () => {
    setMouseIsOver(true);
  };

  const handleMouseLeave = () => {
    setMouseIsOver(false);
  };

  const handleTogglePopover = (taskId: Id) => {
    setPopoverOpenStates((prev) => {
      return {
        ...prev,
        [taskId]: !prev[taskId],
      };
    });
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

  // const divClassName = clsx(
  //   "relative h-[100px] cursor-grab touch-none overflow-auto rounded-lg bg-gray-50 px-2 py-0.5 shadow-md",
  // );

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

      {isEditingTitle ? (
        <Input
          autoFocus
          type="text"
          className="h-fit w-fit py-2 text-2xl"
          onBlur={() => handleBlur(setIsEditingTitle)}
          value={title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeydown(e, setIsEditingTitle)
          }
          ref={titleRef}
        />
      ) : (
        <section
          className="break-words py-2 text-center text-xl font-semibold text-pallette-500"
          onClick={() => handleToggleIsEditing(setIsEditingTitle)}
        >
          <h2>{title}</h2>
        </section>
      )}

      {/* Points */}

      <section className="flex items-center justify-between px-4 py-2 text-xl font-semibold text-pallette-500">
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
          <div onClick={() => handleToggleIsEditing(setIsEditingPriority)}>
            {priority === "low" && <HiOutlineChevronDown color="green" />}
            {priority === "medium" && <RiEqualLine color="orange" />}
            {priority === "high" && <HiOutlineChevronDoubleUp color="red" />}
          </div>
        )}

        {/* Popover */}

        <Popover
          open={isPopoverOpen as boolean}
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
              {isEditingDescription ? (
                <>
                  <Label
                    htmlFor="description"
                    className="content-center text-sm font-semibold text-pallette-500"
                  >
                    Description
                  </Label>
                  <Textarea
                    className="w-full py-2 text-xl"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleFieldChange("description", e.target.value)
                    }
                    onBlur={() => handleBlur(setIsEditingDescription)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
                      handleKeydown(e, setIsEditingTitle)
                    }
                    ref={descriptionRef}
                  />
                </>
              ) : (
                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingDescription);
                  }}
                  className="flex flex-col gap-1 text-lg"
                >
                  <Label
                    htmlFor="description"
                    className="flex items-center gap-1 text-base text-pallette-500"
                  >
                    <MdOutlineSubject size={24} /> Description
                  </Label>
                  <div className="max-h-[250px] w-fit overflow-auto whitespace-normal rounded-md border border-pallette-600 bg-pallette-300 p-4 text-justify">
                    {description ? (
                      <p className="text-lg text-white">{description}</p>
                    ) : (
                      <p className="text-base text-white">Click to edit...</p>
                    )}
                  </div>
                </section>
              )}

              {isEditingAssignee ? (
                <>
                  <Label
                    htmlFor="assignee"
                    className="text-sm font-semibold text-pallette-500"
                  >
                    Assignee
                  </Label>
                  <Input
                    type="text"
                    className="w-full py-2 text-xl"
                    value={assignee}
                    onChange={(e) =>
                      handleFieldChange("assignee", e.target.value)
                    }
                    onBlur={() => handleBlur(setIsEditingAssignee)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleKeydown(e, setIsEditingAssignee)
                    }
                    ref={assigneeRef}
                  />
                </>
              ) : (
                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingAssignee);
                  }}
                  className="flex flex-col gap-1 text-lg"
                >
                  <Label
                    htmlFor="assignee"
                    className="flex items-center gap-1 text-base font-semibold text-pallette-500"
                  >
                    <MdOutlinePersonOutline size={22} />
                    Assignee
                  </Label>
                  <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3">
                    {assignee ? (
                      <p className="text-lg text-white">{assignee}</p>
                    ) : (
                      <p className="text-base text-white">Click to edit...</p>
                    )}
                  </div>
                </section>
              )}

              {isEditingLabel ? (
                <>
                  <Label
                    htmlFor="label"
                    className="text-sm font-semibold text-pallette-500"
                  >
                    Label
                  </Label>
                  <select
                    value={label}
                    onChange={(e) => updateLabel(e.target.value)}
                    onBlur={() => handleBlur(setIsEditingLabel)}
                    ref={labelRef}
                    className="capitalize"
                  >
                    {labelOptions.map((l) => {
                      return (
                        <option key={l.label} value={l.value}>
                          {l.label}
                        </option>
                      );
                    })}
                  </select>
                </>
              ) : (
                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingLabel);
                  }}
                  className="flex flex-col gap-1 text-lg"
                >
                  <Label
                    htmlFor="label"
                    className="flex items-center gap-1 text-base font-semibold text-pallette-500"
                  >
                    <CgTag />
                    Label
                  </Label>
                  <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3">
                    <div className="flex items-center gap-2 text-base">
                      {label !== "" ? (
                        <>
                          <p className="capitalize text-pallette-100">
                            {label}
                          </p>
                          <PiCircleDuotone className={labelIconClassName} />
                        </>
                      ) : (
                        <p className="text-base text-pallette-300">
                          <PiCigaretteDuotone className="text-gray-300" />
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {isEditingDueDate ? (
                <>
                  <Label
                    htmlFor="due Date"
                    className="text-sm font-semibold text-pallette-500"
                  >
                    Due Date
                  </Label>
                  <DatePicker
                    ref={dueDateRef}
                    date={dueDateState}
                    setDate={setDueDateState}
                    isEditing={isEditingDueDate}
                    setIsEditing={setIsEditingDueDate}
                  />
                </>
              ) : (
                <section
                  onClick={() => {
                    handleToggleIsEditing(setIsEditingDueDate);
                  }}
                  className="flex flex-col gap-1 text-lg"
                >
                  <Label
                    htmlFor="Due Date"
                    className="flex items-center gap-1 text-base font-semibold text-pallette-500"
                  >
                    <MdOutlineCalendarToday />
                    Due Date
                  </Label>
                  <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3">
                    {dueDate ? (
                      <p className="text-base text-white">
                        {dueDateState
                          ? format(dueDateState, "MMMM d, yyyy")
                          : ""}
                      </p>
                    ) : (
                      <p className="text-base text-white">Click to edit...</p>
                    )}
                  </div>
                </section>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Delete Task */}
        {MouseIsOver && (
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
