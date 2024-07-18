//Hooks
import { useTask } from "../../hooks/useTask";

//UI
import { MdOutlinePersonOutline } from "react-icons/md";
import Input from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";

function Assignee() {
  const {
    task,
    isEditingAssignee,
    assigneeRef,
    setIsEditingAssignee,

    handleFieldChange,
    handleBlur,
    handleKeydown,
    handleToggleIsEditing,
  } = useTask();

  const { assignee } = task;
  return (
    <>
      <Label
        htmlFor="assignee"
        className="flex items-center gap-1 text-base font-semibold text-pallette-500 dark:text-blue-100"
      >
        <MdOutlinePersonOutline size={22} />
        Assignee
      </Label>

      {isEditingAssignee ? (
        <>
          <Input
            maxLength={28}
            type="text"
            className="w-full bg-pallette-100 py-2 text-xl text-pallette-600 dark:bg-blue-100 dark:text-rose-950"
            value={assignee}
            onChange={(e) => handleFieldChange("assignee", e.target.value)}
            onBlur={() => handleBlur(setIsEditingAssignee)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeydown(e, setIsEditingAssignee)
            }
            ref={assigneeRef}
          />
        </>
      ) : (
        <section
          onClick={() => {
            handleToggleIsEditing(setIsEditingAssignee);
          }}
          className="flex flex-col gap-1 text-lg"
        >
          <div className="min-w-[300px] max-w-[300px] cursor-pointer rounded-md border border-pallette-600 bg-pallette-300 p-3 dark:bg-blue-100 dark:text-rose-950">
            {assignee ? (
              <p className="text-lg text-white dark:text-rose-950">
                {assignee}
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

export default Assignee;
