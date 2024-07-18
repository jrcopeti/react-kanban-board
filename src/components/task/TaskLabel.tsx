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
      {isEditingLabel ? (
        <>
          <Label
            htmlFor="label"
            className="text-sm font-semibold text-pallette-500"
          >
            Label
          </Label>

          <div ref={labelRef}>
            <Select
              value={label}
              onValueChange={(newValue) => updateLabel(newValue)}
            >
              <SelectTrigger className="w-[180px] capitalize">
                <SelectValue placeholder="Select a label" />
              </SelectTrigger>
              <SelectContent
                onCloseAutoFocus={() => handleBlur(setIsEditingLabel)}
              >
                <SelectGroup>
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
          <Label
            htmlFor="label"
            className="flex items-center gap-1 text-base font-semibold text-pallette-500"
          >
            <CgTag />
            Label
          </Label>
          <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3">
            <div className="flex items-center gap-2 text-base">
              {label !== "" ? (
                <>
                  <p className="capitalize text-pallette-100">{label}</p>
                  <PiCircleDuotone className={labelIconClassName} />
                </>
              ) : (
                <p className="text-base text-pallette-300">
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
