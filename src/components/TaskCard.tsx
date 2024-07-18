// Hooks
import { useTask } from "../hooks/useTask";
import { useKanban } from "../hooks/useKanban";

//Components
import DatePicker from "./DatePicker";
import DialogDelete from "./DialogDelete";

//UI
import { Label } from "./@/components/ui/label";
import Input from "./@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./@/components/ui/popover";
import { Textarea } from "./@/components/ui/textarea";

import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiEqualLine } from "react-icons/ri";
import { HiOutlineChevronDoubleUp, HiOutlineChevronDown } from "react-icons/hi";

import {
  MdOutlineCalendarToday,
  MdOutlinePersonOutline,
  MdOutlineSubject,
} from "react-icons/md";
import { CgTag } from "react-icons/cg";
import { PiCircleDuotone, PiCigaretteDuotone } from "react-icons/pi";

//Lib
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//Utils
import { labelOptions, sortedLabels, taskPriorities } from "../utils";
import { format } from "date-fns";
import clsx from "clsx";

function TaskCard() {
  const {
    task,

    //States
    isPopoverOpen,
    isEditingTitle,
    setIsEditingTitle,
    isEditingPriority,
    setIsEditingPriority,
    isEditingDescription,
    setIsEditingDescription,
    isEditingAssignee,
    setIsEditingAssignee,
    isEditingLabel,
    setIsEditingLabel,
    isEditingDueDate,
    setIsEditingDueDate,
    dueDateState,
    setDueDateState,
    mouseIsOver,

    //Refs
    titleRef,
    descriptionRef,
    assigneeRef,
    labelRef,
    dueDateRef,

    //Handlers
    handleToggleIsEditing,
    handleBlur,
    handleFieldChange,
    handleKeydown,
    handleMouseEnter,
    handleMouseLeave,
    handleTogglePopover,
    updatePoints,
    updatePriority,
    updateLabel,
  } = useTask();

  const {
    title,
    assignee,
    description,
    createdDate,
    dueDate,
    priority,
    points,
    label,
    id,
  } = task;
  console.log("dueDate", dueDate);

  const { deleteTask } = useKanban();

  // DND Kit
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: isPopoverOpen || isEditingTitle,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-pallette-600px-2 relative h-[150px] cursor-grab touch-none overflow-auto rounded-lg border-2 border-pallette-200 py-0.5 opacity-50 shadow-md dark:border-slate-700"
      ></div>
    );
  }

  const labelToColor = sortedLabels.find((l) => l.label === label)?.color;
  const labelClassName = clsx(
    "absolute left-5 bottom-10 h-1  text-sm capitalize ",
    `text-${labelToColor}-500`,
  );

  const divClassNameWithLabel = clsx(
    "relative h-[150px] cursor-grab touch-none bg-pallette-100 dark:bg-blue-100 overflow-auto rounded-lg  border-l-8  bg-gray-50 px-2 py-0.5 shadow-md",
    `border-${labelToColor}-500`,
  );

  // const divClassName = clsx(
  //   "relative h-[100px] cursor-grab touch-none overflow-auto rounded-lg bg-gray-50 px-2 py-0.5 shadow-md",
  // );

  const labelIconClassName = clsx("text-sm", `text-${labelToColor}-500`);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={divClassNameWithLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title */}

      {isEditingTitle ? (
        <Input
          autoFocus
          type="text"
          className="h-fit w-fit py-2 text-2xl"
          onBlur={() => handleBlur(setIsEditingTitle)}
          value={title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeydown(e, setIsEditingTitle)
          }
          ref={titleRef}
        />
      ) : (
        <section
          className="break-words py-2 text-center text-lg font-semibold text-pallette-500 dark:text-rose-950"
          onClick={() => handleToggleIsEditing(setIsEditingTitle)}
        >
          <h2>{title}</h2>
        </section>
      )}

      {/* Points */}

      <section className="flex items-center justify-between px-4 py-2 text-lg font-semibold text-pallette-500 dark:text-rose-950">
        <div className="flex items-center justify-start gap-5">
          <button onClick={() => updatePoints("down")}>-</button>
          <p>{points}</p>
          <button onClick={() => updatePoints("up")}>+</button>
        </div>

        {/* Priority */}

        {isEditingPriority ? (
          <>
            <Label htmlFor="due Date" className="text-sm text-gray-400">
              Priority
            </Label>
            <select
              value={priority}
              onChange={(e) => updatePriority(e.target.value)}
              onBlur={() => handleBlur(setIsEditingPriority)}
            >
              {taskPriorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </>
        ) : (
          <div onClick={() => handleToggleIsEditing(setIsEditingPriority)}>
            {priority === "low" && <HiOutlineChevronDown color="green" />}
            {priority === "medium" && <RiEqualLine color="orange" />}
            {priority === "high" && <HiOutlineChevronDoubleUp color="red" />}
          </div>
        )}

        {/* Popover */}

        <Popover
          open={isPopoverOpen}
          onOpenChange={() => handleTogglePopover(id)}
        >
          {/* Trigger */}
          <PopoverTrigger>
            <HiOutlinePencilSquare />
          </PopoverTrigger>

          {/* Content */}

          <PopoverContent
            className="flex h-full w-[auto] min-w-[400px] items-start justify-center overflow-auto rounded-md border border-pallette-600 bg-pallette-100 p-12 dark:bg-blue-100"
            sideOffset={5}
            side="right"
          >
            <div className="flex max-w-[500px] flex-col items-start gap-4">
              {isEditingDescription ? (
                <>
                  <Label
                    htmlFor="description"
                    className="content-center text-sm font-semibold text-pallette-500 dark:text-slate-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    className="w-full py-2 text-xl"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleFieldChange("description", e.target.value)
                    }
                    onBlur={() => handleBlur(setIsEditingDescription)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
                      handleKeydown(e, setIsEditingTitle)
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
                    className="flex items-center gap-1 text-base text-pallette-500 dark:text-slate-700"
                  >
                    <MdOutlineSubject size={24} /> Description
                  </Label>
                  <div className="max-h-[250px] w-fit overflow-auto whitespace-normal rounded-md border border-pallette-600 bg-pallette-300 p-4 text-justify dark:bg-slate-500">
                    {description ? (
                      <p className="text-lg text-white">{description}</p>
                    ) : (
                      <p className="text-base text-white">Click to edit...</p>
                    )}
                  </div>
                </section>
              )}

              {isEditingAssignee ? (
                <>
                  <Label
                    htmlFor="assignee"
                    className="text-sm font-semibold text-pallette-500 dark:text-slate-700"
                  >
                    Assignee
                  </Label>
                  <Input
                    type="text"
                    className="w-full py-2 text-xl"
                    value={assignee}
                    onChange={(e) =>
                      handleFieldChange("assignee", e.target.value)
                    }
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
                    className="flex items-center gap-1 text-base font-semibold text-pallette-500 dark:text-slate-700"
                  >
                    <MdOutlinePersonOutline size={22} />
                    Assignee
                  </Label>
                  <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3 dark:bg-slate-500">
                    {assignee ? (
                      <p className="text-lg text-white">{assignee}</p>
                    ) : (
                      <p className="text-base text-white">Click to edit...</p>
                    )}
                  </div>
                </section>
              )}

              {isEditingLabel ? (
                <>
                  <Label
                    htmlFor="label"
                    className="text-sm font-semibold text-pallette-500 dark:text-slate-700"
                  >
                    Label
                  </Label>
                  <select
                    value={label}
                    onChange={(e) => updateLabel(e.target.value)}
                    onBlur={() => handleBlur(setIsEditingLabel)}
                    ref={labelRef}
                    className="capitalize"
                  >
                    {labelOptions.map((l) => {
                      return (
                        <option key={l.label} value={l.value}>
                          {l.label}
                        </option>
                      );
                    })}
                  </select>
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
                    className="flex items-center gap-1 text-base font-semibold text-pallette-500 dark:text-slate-700"
                  >
                    <CgTag />
                    Label
                  </Label>
                  <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3 dark:bg-slate-500">
                    <div className="flex items-center gap-2 text-base">
                      {label !== "" ? (
                        <>
                          <p className="capitalize text-pallette-100 dark:text-blue-100">
                            {label}
                          </p>
                          <PiCircleDuotone className={labelIconClassName} />
                        </>
                      ) : (
                        <p className="text-base text-pallette-300 dark:text-slate-700">
                          <PiCigaretteDuotone className="text-gray-300" />
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {isEditingDueDate ? (
                <>
                  <Label
                    htmlFor="due Date"
                    className="text-sm font-semibold text-pallette-500 dark:text-slate-700"
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
                    className="flex items-center gap-1 text-base font-semibold text-pallette-500 dark:text-slate-700"
                  >
                    <MdOutlineCalendarToday />
                    Due Date
                  </Label>
                  <div className="w-fit rounded-md border border-pallette-600 bg-pallette-300 p-3 dark:bg-slate-500">
                    {dueDate ? (
                      <p className="text-base text-white">
                        {dueDateState
                          ? format(dueDateState, "MMMM d, yyyy")
                          : ""}
                      </p>
                    ) : (
                      <p className="text-base text-white">Click to edit...</p>
                    )}
                  </div>
                </section>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Delete Task */}
        {mouseIsOver && (
          <>
            <DialogDelete handleDelete={deleteTask} id={id} task={task.title} />

            <section className="absolute bottom-0 left-24 z-30 -translate-x-1/2 flex-col gap-1 text-lg">
              <p className="text-left text-xs text-pallette-300 dark:text-slate-700">
                Created At: {format(createdDate, "dd, MMM yyyy")}
              </p>
            </section>

            {/* Label */}

            <div className={labelClassName}>{label}</div>
          </>
        )}
      </section>
    </div>
  );
}

export default TaskCard;
