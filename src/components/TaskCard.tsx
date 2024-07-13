import { useState, Dispatch, SetStateAction } from "react";
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
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [IsEditingCreatedDate, setIsEditingCreatedDate] = useState(false);

  const [MouseIsOver, setMouseIsOver] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: isEditingTitle });

  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

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

  const handleToggleIsEditing = (action: Dispatch<SetStateAction<boolean>>) => {
    action((prev) => !prev);
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
        />
      ) : (
        <section
          className="break-words py-2 text-3xl font-semibold"
          onClick={() => handleToggleIsEditing(() => setIsEditingTitle(true))}
        >
          <h2>{title}</h2>
        </section>
      )}

      <Popover>
        <PopoverTrigger>
          <HiOutlinePencilSquare />
        </PopoverTrigger>
        <PopoverContent className="h-[400px]" sideOffset={5} side="right">
          {isEditingDescription ? (
            <div>
              <Label htmlFor="description" className="text-sm text-gray-400">
                Description
              </Label>
              <Input
                autoFocus
                type="text"
                className="w-full py-2 text-xl"
                onBlur={() => handleBlur(() => setIsEditingDescription(false))}
                value={description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value as string)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeydown(e, setIsEditingDescription)
                }
              />
            </div>
          ) : (
            <section
              className="text-xl text-gray-700"
              onClick={() =>
                handleToggleIsEditing(() => setIsEditingDescription(true))
              }
            >
              <Label htmlFor="description" className="text-sm text-gray-400">
                Description
              </Label>
              <p>{description}</p>
            </section>
          )}

          {isEditingAssignee ? (
            <div>
              <Label htmlFor="assignee" className="text-sm text-gray-400">
                Assignee
              </Label>

              <Input
                autoFocus
                type="text"
                className="w-full py-2 text-xl"
                onBlur={() => handleBlur(() => setIsEditingAssignee(false))}
                value={assignee}
                onChange={(e) =>
                  handleFieldChange("assignee", e.target.value as string)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeydown(e, setIsEditingAssignee)
                }
              />
            </div>
          ) : (
            <section
              onClick={() =>
                handleToggleIsEditing(() => setIsEditingAssignee(true))
              }
              className="flex h-full w-full flex-col gap-1 text-lg"
            >
              <Label htmlFor="assignee" className="text-sm text-gray-400">
                Assignee
              </Label>
              <p>{assignee}</p>
            </section>
          )}
          {IsEditingCreatedDate ? (
            <div>
              <Label htmlFor="" className="text-sm text-gray-400">
                Created Date
              </Label>

              <Input
                autoFocus
                type="text"
                className="w-full py-2 text-xl"
                onBlur={() => handleBlur(() => setIsEditingCreatedDate(false))}
                value={assignee}
                onChange={(e) =>
                  handleFieldChange("assignee", e.target.value as string)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeydown(e, setIsEditingCreatedDate)
                }
              />
            </div>
          ) : (
            <section
              onClick={() =>
                handleToggleIsEditing(() => setIsEditingCreatedDate(true))
              }
              className="flex h-full w-full flex-col gap-1 text-lg"
            >
              <Label htmlFor="assignee" className="text-sm text-gray-400">
                Created Date
              </Label>
              <p>{assignee}</p>
              <p>{createdDate}</p>
              <p>
                <strong>Due Date:</strong> {dueDate}
              </p>
            </section>
          )}
        </PopoverContent>
      </Popover>

      <section className="flex items-center justify-between px-4 py-2 text-2xl">
        <div className="flex items-center justify-start gap-5">
          <button onClick={() => updatePoints("down")}>-</button>
          <p>{points}</p>
          <button onClick={() => updatePoints("up")}>+</button>
        </div>
        <div className="w-[24px]">
          {priority === "low" && <HiOutlineChevronDown color="green" />}
          {priority === "medium" && <RiEqualLine color="orange" />}
          {priority === "high" && <HiOutlineChevronDoubleUp color="red" />}
        </div>

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
