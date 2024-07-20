//Utils
import { taskPriorities } from "../../utils";

//Hooks
import { useTask } from "../../hooks/useTask";

//UI
import { Label } from "../@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";
import { RiEqualLine } from "react-icons/ri";
import {
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDoubleDown,
} from "react-icons/hi";
import { useKanban } from "../../hooks/useKanban";

function Priority() {
  const {
    task,
    isEditingPriority,
    setIsEditingPriority,
    priorityRef,

    handleBlur,
    handleToggleIsEditing,
  } = useTask();

  const { updatePriority } = useKanban();
  const { priority } = task;
  return (
    <div className="cursor-pointer">
      <Label htmlFor="priority" className="text-xs"></Label>
      {isEditingPriority ? (
        <>
          <Select
            value={priority}
            onValueChange={(newValue) => updatePriority(newValue, task)}
          >
            <SelectTrigger
              ref={priorityRef}
              className="h-8 w-[100px] border-pallette-600 bg-pallette-100 capitalize dark:bg-blue-100 dark:text-rose-950"
            >
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={() => handleBlur(setIsEditingPriority)}
            >
              <SelectGroup className="bg-pallette-100 font-semibold text-pallette-600 dark:bg-blue-100 dark:text-rose-950">
                <SelectLabel>Priority</SelectLabel>
                {taskPriorities.map((p) => {
                  return (
                    <SelectItem className="capitalize" key={p} value={p}>
                      {p}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      ) : (
        <div
          title="Priority"
          className="flex min-w-[200px] cursor-pointer flex-col items-center text-2xl"
          onClick={() => handleToggleIsEditing(setIsEditingPriority)}
        >
          {priority === "low" && (
            <HiOutlineChevronDoubleDown
              color="green"
              className="hover:opacity-60"
            />
          )}
          {priority === "medium" && (
            <RiEqualLine color="orange" className="hover:opacity-60" />
          )}
          {priority === "high" && (
            <HiOutlineChevronDoubleUp
              color="red"
              className="hover:opacity-60"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Priority;
