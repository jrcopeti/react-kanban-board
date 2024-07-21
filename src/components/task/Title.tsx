import { useState } from "react";
import { useTask } from "../../hooks/useTask";
import Input from "../@/components/ui/input";

const Title = () => {
  const {
    task,

    isEditingTitle,
    titleRef,

    handleBlurWithUpdate,
    setIsEditingTitle,
    handleKeydown,
    handleToggleIsEditing,
  } = useTask();

  const [title, setTitle] = useState(task.title);

  return (
    <>
      {isEditingTitle ? (
        <Input
          maxLength={23}
          type="text"
          className="h-9 w-72 py-3 text-xl dark:bg-blue-100 dark:text-rose-950"
          onBlur={(e) =>
            handleBlurWithUpdate(setIsEditingTitle, "title", e.target.value)
          }
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeydown(e, setIsEditingTitle)
          }
          ref={titleRef}
        />
      ) : (
        <section
          title="Task Title"
          className="-mb-1 max-w-[272px] cursor-pointer break-words py-1 text-center text-xl font-semibold text-pallette-500 opacity-100 hover:text-pallette-400 hover:opacity-65 dark:hover:text-slate-500"
          onClick={() => handleToggleIsEditing(setIsEditingTitle)}
        >
          <h2>{title}</h2>
        </section>
      )}
    </>
  );
};

export default Title;
