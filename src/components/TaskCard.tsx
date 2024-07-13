import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { Task, TaskCardProps } from "../types";
import {
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDown,
  HiOutlineTrash,
} from "react-icons/hi";
import { RiEqualLine } from "react-icons/ri";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Input from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiMiniQueueList, HiOutlinePencilSquare } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { taskPriorities } from "../utils";

function TaskCard({ task, updateTask, deleteTask }: TaskCardProps) {
  const {
    title,
    assignee,
    description,
    createdDate,
    dueDate,
    priority,
    points,
    id,
  } = task;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingPopOver, setIsEditingPopOver] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [isEditingCreatedDate, setIsEditingCreatedDate] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [priorityState, setPriorityState] = useState<string>(priority);

  const [MouseIsOver, setMouseIsOver] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const assigneeRef = useRef<HTMLInputElement>(null);
  const createdDateRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle) {
      titleRef.current?.focus();
    } else if (isEditingDescription && descriptionRef.current) {
      console.log("descriptionRef", descriptionRef.current);
      descriptionRef.current.focus();
    } else if (isEditingAssignee && assigneeRef.current) {
      console.log("assigneeRef", assigneeRef.current);
      assigneeRef.current.focus();
    } else if (isEditingCreatedDate && createdDateRef.current) {
      console.log("createdDateRef", createdDateRef.current);
      createdDateRef.current.focus();
    } else if (isEditingDueDate && dueDateRef.current) {
      console.log("dueDateRef", dueDateRef.current);
      dueDateRef.current.focus();
    }
  }, [
    isEditingTitle,
    isEditingDescription,
    isEditingAssignee,
    isEditingCreatedDate,
    isEditingDueDate,
  ]);

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

  // const setPriorityIcon = (priority: string) => {
  //   switch (priority) {
  //     case "low":
  //       return <HiOutlineChevronDown color="green" />;
  //     case "medium":
  //       return <RiEqualLine color="orange" />;
  //     case "high":
  //       return <HiOutlineChevronDoubleUp color="red" />;
  //     default:
  //       return null;
  //   }
  // };

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
    setIsEditingCreatedDate(false);
    setIsEditingDueDate(false);
  };

  const handleMouseEnter = () => {
    setMouseIsOver(true);
  };

  const handleMouseLeave = () => {
    setMouseIsOver(false);
  };

  return (
    <div
      className="relative h-[250px] cursor-grab touch-none overflow-auto rounded-lg border bg-gray-50 px-2 py-0.5 shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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

      <Popover>
        <PopoverTrigger>
          <HiOutlinePencilSquare />
        </PopoverTrigger>
        <PopoverContent className="h-[400px]" sideOffset={5} side="right">
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

              <Label htmlFor="createdDate" className="text-sm text-gray-400">
                Created Date
              </Label>
              <Input
                type="text"
                className="w-full py-2 text-xl"
                value={createdDate}
                onChange={(e) =>
                  handleFieldChange("createdDate", e.target.value as string)
                }
                ref={createdDateRef}
              />

              <Label htmlFor="due Date" className="text-sm text-gray-400">
                Created Date
              </Label>
              <Input
                type="text"
                className="w-full py-2 text-xl"
                value={dueDate}
                onChange={(e) =>
                  handleFieldChange("dueDate", e.target.value as string)
                }
                ref={dueDateRef}
              />

              <section className="flex">
                <Button type="submit">Save</Button>
              </section>
            </form>
          ) : (
            <div>
              <section
                onClick={() => {
                  handleToggleIsEditing(setIsEditingPopOver);
                  setIsEditingDescription(true);
                }}
                className="text-xl text-gray-700"
              >
                <Label htmlFor="description" className="text-sm text-gray-400">
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
                <p>{assignee} JUBILEUdfklnrkfgn.jktrgnf</p>
              </section>

              <section
                onClick={() => {
                  handleToggleIsEditing(setIsEditingPopOver);
                  setIsEditingCreatedDate(true);
                }}
                className="flex h-full w-full flex-col gap-1 text-lg"
              >
                <Label htmlFor="createdDate" className="text-sm text-gray-400">
                  Created Date
                </Label>
                <p>{createdDate}</p>
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
                <p>{dueDate}</p>
              </section>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <section className="flex items-center justify-between px-4 py-2 text-2xl">
        <div className="flex items-center justify-start gap-5">
          <button onClick={() => updatePoints("down")}>-</button>
          <p>{points}</p>
          <button onClick={() => updatePoints("up")}>+</button>
        </div>

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

        {MouseIsOver && (
          <Button
            onClick={() => deleteTask(id)}
            className="absolute bottom-0 right-5 z-30 translate-x-1/2"
          >
            <HiOutlineTrash
              className="opacity-60 hover:stroke-rose-500 hover:opacity-100"
              size={20}
            />
          </Button>
        )}
      </section>
    </div>
  );
}

export default TaskCard;
