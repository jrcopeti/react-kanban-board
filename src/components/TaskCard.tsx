import { useState } from "react";
import { TaskCardProps } from "../types";
import { HiOutlineChevronDoubleUp, HiOutlineChevronDown } from "react-icons/hi";
import { RiEqualLine } from "react-icons/ri";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: isEditingTitle });

  const style = {
    transition,
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
    console.log("handleTitleClick");
    console.log("isEditingTitle", isEditingTitle);
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
    setIsEditingTitle(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="m-2 touch-none rounded-lg border bg-gray-50 px-2 py-0.5"
    >
      {isEditingTitle ? (
        <form onSubmit={handleTitleSubmit}>
          <input
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
          className="py-2 text-3xl font-semibold"
          onClick={handleTitleClick}
        >
          <h2>{title}</h2>
        </section>
      )}

      <section className="py-2 text-2xl text-gray-700">
        <p>{description}</p>
      </section>

      <section className="flex flex-col gap-1 text-lg">
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
      <section className="flex items-center justify-between px-4 py-2 text-2xl">
        <div className="flex items-center justify-start gap-5">
          <button  onClick={() => updatePoints("down")}>
            -
          </button>
          <p>{points}</p>
          <button  onClick={() => updatePoints("up")}>
            +
          </button>
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
