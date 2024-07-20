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

    setIsEditingDueDate,
    handleToggleIsEditing,
  } = useTask();
  console.log("dueDate", task.dueDate);

  return (
    <>
      <Label
        htmlFor="Due Date"
        className="flex min-w-[180px] max-w-[180px] items-center gap-1 text-base font-semibold text-pallette-500 dark:text-blue-100"
      >
        <MdOutlineCalendarToday />
        Due Date
      </Label>
      {isEditingDueDate ? (
        <>
          <DatePicker />
        </>
      ) : (
        <section
          onClick={() => {
            handleToggleIsEditing(setIsEditingDueDate);
          }}
          className="flex flex-col gap-1 text-lg"
        >
          <div className="min-w-[180px] max-w-[180px] cursor-pointer rounded-md border border-pallette-600 bg-pallette-300 p-3 dark:bg-blue-100 dark:text-rose-950">
            {dueDateState ? (
              <p className="text-base text-white hover:opacity-60 dark:text-rose-950">
                {dueDateState ? format(dueDateState, "MMMM d, yyyy") : ""}
              </p>
            ) : (
              <p className="text-base text-white hover:opacity-60 dark:text-rose-950">
                Click to edit...
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default DueDate;
