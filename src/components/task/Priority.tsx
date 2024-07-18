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
import { HiOutlineChevronDoubleUp, HiOutlineChevronDown } from "react-icons/hi";

function Priority() {
  const {
    task,
    isEditingPriority,
    setIsEditingPriority,
    updatePriority,
    handleBlur,
    handleToggleIsEditing,
  } = useTask();
  const { priority } = task;
  return (
    <div className="cursor-pointer">
      {isEditingPriority ? (
        <>
          <Label htmlFor="priority" className="text-xs"></Label>
          <Select
            value={priority}
            onValueChange={(newValue) => updatePriority(newValue)}
          >
            <SelectTrigger className="h-8 w-[100px] border-pallette-600 bg-pallette-100 capitalize dark:bg-blue-100 dark:text-rose-950">
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
          className="flex cursor-pointer flex-col items-center text-2xl"
          onClick={() => handleToggleIsEditing(setIsEditingPriority)}
        >
          {priority === "low" && <HiOutlineChevronDown color="green" />}
          {priority === "medium" && <RiEqualLine color="orange" />}
          {priority === "high" && <HiOutlineChevronDoubleUp color="red" />}
        </div>
      )}
    </div>
  );
}

export default Priority;
