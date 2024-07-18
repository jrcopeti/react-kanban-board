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
      {isEditingDescription ? (
        <>
          <Label
            htmlFor="description"
            className="content-center text-sm font-semibold text-pallette-500 dark:text-blue-100"
          >
            Description
          </Label>
          <Textarea
            className="w-full py-2 text-xl dark:bg-blue-100 dark:text-rose-950"
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
        >
          <Label
            htmlFor="description"
            className="flex items-center gap-1 text-base text-pallette-500 dark:text-blue-100"
          >
            <MdOutlineSubject size={24} /> Description
          </Label>
          <div className="max-h-[250px] w-fit overflow-auto whitespace-normal rounded-md border border-pallette-600 bg-pallette-300 p-4 text-justify dark:bg-blue-100 dark:text-rose-950">
            {description ? (
              <p className="text-lg text-white dark:text-rose-950">
                {description}
              </p>
            ) : (
              <p className="text-base text-white dark:text-rose-950">
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
