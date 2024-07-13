import { Button } from "@/components/ui/button";
import type { ColumnContainerProps } from "../types";
import { HiOutlineTrash } from "react-icons/hi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Input from "@/components/ui/input";

function ColumnContainer({
  column,
  updateColumn,
  deleteColumn,
}: ColumnContainerProps) {
  const { id, title } = column;
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColumn(id, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setIsEditing(false);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: isEditing,
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
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-gray-300 opacity-30"
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
      onClick={handleClick}
      className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-gray-300"
    >
      <section className="text-md flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-b-gray-200 bg-gray-200 p-3 font-bold">
        <div className="flex gap-2">
          <div className="flex items-center justify-center bg-gray-500 px-2 py-1 text-sm">
            0
          </div>
          {isEditing ? (
            <Input
              autoFocus
              type="text"
              className="text-md w-full rounded border px-2 py-2 font-bold outline-none focus:border-rose-500"
              onBlur={handleBlur}
              value={title}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p className="text-md font-bold">{title}</p>
          )}
        </div>
        <Button
          onClick={() => deleteColumn(id)}
          className="rounded bg-white stroke-gray-500 px-1 py-2 hover:bg-gray-500"
        >
          <HiOutlineTrash className="hover:stroke-white" size={20} />
        </Button>
      </section>

      <section className="flex flex-grow">Content</section>
      <footer>Footer</footer>
    </div>
  );
}

export default ColumnContainer;