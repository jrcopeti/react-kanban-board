//Hooks
import { useTask } from "../../hooks/useTask";
//Components
import DatePicker from "./DatePicker";

//UI
import { MdOutlineCalendarToday } from "react-icons/md";
import { Label } from "../@/components/ui/label";

//Utils
import { format } from "date-fns";

function DueDate() {
  const {
    task,
    isEditingDueDate,
    dueDateState,
    dueDateRef,
    setIsEditingDueDate,
    setDueDateState,
    handleToggleIsEditing,
  } = useTask();
  const { dueDate } = task;
  return (
    <>
      {isEditingDueDate ? (
        <>
          <Label
            htmlFor="due Date"
            className="text-sm font-semibold text-pallette-500"
          >
            Due Date
          </Label>
          <DatePicker
            ref={dueDateRef}
            date={dueDateState}
            setDate={setDueDateState}
            isEditing={isEditingDueDate}
            setIsEditing={setIsEditingDueDate}
          />
        </>
      ) : (
        <section
          onClick={() => {
            handleToggleIsEditing(setIsEditingDueDate);
          }}
          className="flex flex-col gap-1 text-lg"
        >
          <Label
            htmlFor="Due Date"
            className="flex items-center gap-1 text-base font-semibold text-pallette-500"
          >
            <MdOutlineCalendarToday />
            Due Date
          </Label>
          <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3">
            {dueDate ? (
              <p className="text-base text-white">
                {dueDateState ? format(dueDateState, "MMMM d, yyyy") : ""}
              </p>
            ) : (
              <p className="text-base text-white">Click to edit...</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default DueDate;
