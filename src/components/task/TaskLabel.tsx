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
import { CgTag } from "react-icons/cg";
import { PiCigaretteDuotone, PiCircleDuotone } from "react-icons/pi";

//Utils
import { sortedLabels } from "../../utils";
import clsx from "clsx";

function TaskLabel() {
  const {
    task,
    isEditingLabel,
    setIsEditingLabel,
    updateLabel,
    handleBlur,
    handleToggleIsEditing,
    labelRef,
  } = useTask();

  const { label } = task;

  const labelToColor = sortedLabels.find((l) => l.label === label)?.color;
  const labelIconClassName = clsx("text-sm", `text-${labelToColor}-500`);

  return (
    <>
      <Label
        htmlFor="label"
        className="flex items-center gap-1 text-base font-semibold text-pallette-500 dark:text-blue-100"
      >
        <CgTag />
        Label
      </Label>
      {isEditingLabel ? (
        <>
          <div ref={labelRef}>
            <Select
              value={label}
              onValueChange={(newValue) => updateLabel(newValue)}
            >
              <SelectTrigger className="h-12 w-[180px] border-pallette-600 bg-pallette-100 font-semibold capitalize text-pallette-600 dark:bg-blue-100 dark:text-rose-950">
                <SelectValue placeholder="Select a label" />
              </SelectTrigger>
              <SelectContent
                onCloseAutoFocus={() => handleBlur(setIsEditingLabel)}
              >
                <SelectGroup className="bg-pallette-100 font-semibold text-pallette-600 dark:bg-blue-100 dark:text-rose-950">
                  <SelectLabel>Label</SelectLabel>
                  {sortedLabels.map((l) => {
                    return (
                      <SelectItem
                        className="capitalize"
                        key={l.label}
                        value={l.label}
                      >
                        {l.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <section
          onClick={() => {
            handleToggleIsEditing(setIsEditingLabel);
          }}
          className="flex flex-col gap-1 text-lg"
        >
          <div className=" cursor-pointer h-12 min-w-[180px] max-w-[180px] rounded-md border border-pallette-600 bg-pallette-300 p-3 dark:bg-blue-100 dark:text-rose-950">
            <div className="flex items-center gap-2 text-base">
              {label !== "" ? (
                <>
                  <p className="capitalize text-pallette-100 dark:text-rose-950">
                    {label}
                  </p>
                  <PiCircleDuotone className={labelIconClassName} />
                </>
              ) : (
                <p className="text-base text-pallette-300 dark:text-rose-950">
                  <PiCigaretteDuotone className="text-gray-300" />
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default TaskLabel;
