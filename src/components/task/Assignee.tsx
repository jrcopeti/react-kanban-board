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
      {isEditingAssignee ? (
        <>
          <Label
            htmlFor="assignee"
            className="text-sm font-semibold text-pallette-500"
          >
            Assignee
          </Label>
          <Input
            type="text"
            className="w-full py-2 text-xl"
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
          <Label
            htmlFor="assignee"
            className="flex items-center gap-1 text-base font-semibold text-pallette-500"
          >
            <MdOutlinePersonOutline size={22} />
            Assignee
          </Label>
          <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3">
            {assignee ? (
              <p className="text-lg text-white">{assignee}</p>
            ) : (
              <p className="text-base text-white">Click to edit...</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Assignee;
