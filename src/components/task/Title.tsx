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
    </>
  );
}

export default Title;
