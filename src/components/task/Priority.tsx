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
    <>
      {isEditingPriority ? (
        <>
          <Label htmlFor="due Date" className="text-sm text-gray-400">
            Priority
          </Label>
          <Select
            value={priority}
            onValueChange={(newValue) => updatePriority(newValue)}
          >
            <SelectTrigger className="w-[180px] capitalize">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={() => handleBlur(setIsEditingPriority)}
            >
              <SelectGroup>
                <SelectLabel>Label</SelectLabel>
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
        <div onClick={() => handleToggleIsEditing(setIsEditingPriority)}>
          {priority === "low" && <HiOutlineChevronDown color="green" />}
          {priority === "medium" && <RiEqualLine color="orange" />}
          {priority === "high" && <HiOutlineChevronDoubleUp color="red" />}
        </div>
      )}
    </>
  );
}

export default Priority;
