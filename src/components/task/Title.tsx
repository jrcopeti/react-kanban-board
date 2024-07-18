import { useTask } from "../../hooks/useTask";
import Input from "../@/components/ui/input";

function Title() {
  const {
    task,

    isEditingTitle,
    titleRef,

    handleBlur,
    setIsEditingTitle,
    handleFieldChange,
    handleKeydown,
    handleToggleIsEditing,
  } = useTask();

  const { title } = task;
  return (
    <>
      {isEditingTitle ? (
        <Input
          autoFocus
          type="text"
          className="h-9 w-72 py-3 text-2xl dark:bg-blue-100 dark:text-rose-950"
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
    </>
  );
}

export default Title;
