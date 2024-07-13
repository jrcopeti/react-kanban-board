import { useState } from "react";
import { TaskCardProps } from "../types";
import { HiOutlineChevronDoubleUp, HiOutlineChevronDown } from "react-icons/hi";
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

function TaskCard({ task, updateTask }: TaskCardProps) {
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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: isEditingTitle });

  console.log("transform", transform);
  console.log("transition", transition);

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

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingDescription(false);
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

  const handleDescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingDescription(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="m-2 box-border h-[250px] touch-none overflow-auto rounded-lg border bg-gray-50 px-2 py-0.5 shadow-md"
    >
      {isEditingTitle ? (
        <form onSubmit={handleTitleSubmit}>
          <Input
            autoFocus
            type="text"
            className="w-full py-2 text-3xl"
            onBlur={handleTitleBlur}
            value={task.title}
            onChange={handleTitleOnChange}
          />
        </form>
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
            <form onSubmit={handleDescriptionSubmit}>
              <Input
                autoFocus
                type="text"
                className="w-full py-2 text-3xl"
                onBlur={handleDescriptionBlur}
                value={description}
                onChange={handleDescriptionOnChange}
              />
            </form>
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
        <div>
          {priority === "Low" && <HiOutlineChevronDown color="green" />}
          {priority === "Medium" && <RiEqualLine color="orange" />}
          {priority === "High" && <HiOutlineChevronDoubleUp color="red" />}
        </div>
      </section>
    </div>
  );
}

export default TaskCard;
