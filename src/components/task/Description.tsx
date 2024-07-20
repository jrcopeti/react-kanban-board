//Hooks
import { useTask } from "../../hooks/useTask";

//UI
import { MdOutlineSubject } from "react-icons/md";
import { Label } from "../@/components/ui/label";
import { Textarea } from "../@/components/ui/textarea";

function Description() {
  const {
    task,
    isEditingDescription,
    setIsEditingDescription,
    descriptionRef,

    handleFieldChange,
    handleBlur,
    handleKeydown,
    handleToggleIsEditing,
  } = useTask();

  const { description } = task;
  return (
    <>
      <Label
        htmlFor="description"
        className="flex items-center gap-1 text-base text-pallette-500 dark:text-blue-100"
      >
        <MdOutlineSubject size={24} /> Description
      </Label>
      {isEditingDescription ? (
        <>
          <Textarea
            className="w-full   bg-pallette-100 py-2 text-xl text-pallette-600 dark:bg-blue-100 dark:text-rose-950"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleFieldChange("description", e.target.value)
            }
            onBlur={() => handleBlur(setIsEditingDescription)}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
              handleKeydown(e, setIsEditingDescription)
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
          title="Description"
        >
          <div className="max-h-[200px] min-h-20 min-w-[300px] max-w-[300px] cursor-pointer overflow-auto whitespace-normal rounded-md border border-pallette-600 bg-pallette-300 px-2.5 py-2  dark:bg-blue-100 dark:text-rose-950">
            {description ? (
              <p className="text-lg leading-loose text-white dark:text-rose-950 hover:opacity-60">
                {description}
              </p>
            ) : (
              <p className="text-base text-white dark:text-rose-950 hover:opacity-60 mt-0.5">
                Click to edit...
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Description;
