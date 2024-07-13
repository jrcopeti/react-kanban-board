import { useState } from "react";
import { TaskCardProps } from "../types";
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

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask({ ...task, title: e.target.value });
  };

  const handleTitleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setIsEditingTitle(false);
  };
  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false);
  };

  const handleDescriptionOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateTask({ ...task, description: e.target.value });
  };

  const handleDescriptionKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== "Enter") return;
    setIsEditingDescription;
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
          onBlur={handleTitleBlur}
          value={task.title}
          onChange={handleTitleOnChange}
          onKeyDown={handleTitleKeydown}
        />
      ) : (
        <section
          className="break-words py-2 text-3xl font-semibold"
          onClick={handleTitleClick}
        >
          <h2>{title}</h2>
        </section>
      )}

      <Popover>
        <PopoverTrigger>
          <HiOutlinePencilSquare />
        </PopoverTrigger>
        <PopoverContent sideOffset={5} side="right">
          {isEditingDescription ? (
            <Input
              autoFocus
              type="text"
              className="w-full py-2 text-3xl"
              onBlur={handleDescriptionBlur}
              value={description}
              onChange={handleDescriptionOnChange}
              onKeyDown={handleDescriptionKeydown}
            />
          ) : (
            <section
              className="py-2 text-2xl text-gray-700"
              onClick={handleDescriptionClick}
            >
              <p>{description}</p>
            </section>
          )}

          <section className="flex h-full w-full flex-col gap-1 text-lg">
            <p>
              <strong>Assignee:</strong> {assignee}
            </p>
            <p>
              <strong>Created Date:</strong> {createdDate}
            </p>
            <p>
              <strong>Due Date:</strong> {dueDate}
            </p>
          </section>
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
