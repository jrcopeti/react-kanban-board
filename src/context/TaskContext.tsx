import {
  createContext,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

// Hooks
import { useKanban } from "../hooks/useKanban";
import { useColumn } from "../hooks/useColumn";

// UI
import { useToast } from "../components/@/components/ui/use-toast";

//Utils
import { sortedLabels, fib } from "../utils";

//Types
import type { Id, Task, TaskContextType } from "../types";

const defaultContextValue: TaskContextType = {
  task: {
    id: 0,
    columnId: 0,
    title: "",
    description: "",
    points: 0,
    assignee: "",
    label: "",
    priority: "",
    dueDate: new Date(),
    createdDate: new Date(),
  },
  //States
  isPopoverOpen: false,
  isEditingTitle: false,
  setIsEditingTitle: () => {},
  isEditingPriority: false,
  setIsEditingPriority: () => {},
  isEditingDescription: false,
  setIsEditingDescription: () => {},
  isEditingAssignee: false,
  setIsEditingAssignee: () => {},
  isEditingLabel: false,
  setIsEditingLabel: () => {},
  isEditingDueDate: false,
  setIsEditingDueDate: () => {},
  dueDateState: new Date(),
  setDueDateState: () => {},
  mouseIsOver: false,
  setMouseIsOver: () => {},

  //Refs
  titleRef: { current: null },
  priorityRef: { current: null },
  descriptionRef: { current: null },
  assigneeRef: { current: null },
  labelRef: { current: null },
  dueDateRef: { current: null },

  //Handlers
  handleToggleIsEditing: () => {},
  handleBlur: () => {},
  handleFieldChange: () => {},
  handleKeydown: () => {},
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  handleTogglePopover: () => {},
  updatePoints: () => {},
  updatePriority: () => {},
  updateLabel: () => {},
  labelToColor: "",
};

const TaskContext = createContext(defaultContextValue);

function TaskProvider({
  children,
  task,
  isPopoverOpen,
}: {
  children: React.ReactNode;
  task: Task;
  isPopoverOpen: boolean;
}) {
  const { updateTask } = useKanban();
  const { setPopoverOpenStates } = useColumn();

  const toast = useToast();

  //Card state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  //PopOver state
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [dueDateState, setDueDateState] = useState<Date>(
    new Date(task.dueDate),
  );
  console.log("dueDateState", dueDateState);

  //Refs
  const titleRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const assigneeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const dueDateRef = useRef<HTMLButtonElement>(null);

  const prevTaskRef = useRef(task);
  console.log("prevTaskRef", prevTaskRef);
  const isInitialRender = useRef(true);
  console.log("isInitialRender", isInitialRender);

  //Focus on input
  useEffect(() => {
    if (isEditingTitle && titleRef.current) {
      console.log("titleRef", titleRef);
      titleRef.current?.focus();
    } else if (isEditingPriority && priorityRef.current) {
      console.log("priorityRef", priorityRef);
      priorityRef.current.focus();
    } else if (isEditingDescription && descriptionRef.current) {
      console.log("descriptionRef", descriptionRef);
      descriptionRef.current.focus();
    } else if (isEditingAssignee && assigneeRef.current) {
      console.log("assigneeRef", assigneeRef);
      assigneeRef.current.focus();
    } else if (isEditingDueDate && dueDateRef.current) {
      console.log("dueDateRef", dueDateRef);
      dueDateRef.current.focus();
    } else if (isEditingLabel && labelRef.current) {
      console.log("labelRef", labelRef);
      labelRef.current.focus();
    }
  }, [
    isEditingTitle,
    isEditingPriority,
    isEditingDescription,
    isEditingAssignee,
    isEditingDueDate,
    isEditingLabel,
  ]);

  useEffect(() => {
    // Skip the initial mounting effect
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      // Check if relevant task details have changed, excluding due date since it's handled separately
      if (
        prevTaskRef.current.title !== task.title ||
        prevTaskRef.current.assignee !== task.assignee ||
        prevTaskRef.current.points !== task.points ||
        prevTaskRef.current.description !== task.description ||
        prevTaskRef.current.priority !== task.priority ||
        prevTaskRef.current.label !== task.label
      ) {
        const debounce = setTimeout(() => {
          toast.toast({
            title: `${task.title}`,
            description: "Was updated successfully",
          });
        }, 2000);

        return () => {
          clearTimeout(debounce);
        };
      }
    }
    // Update ref to current task at the end of the effect
    prevTaskRef.current = task;
  }, [task, toast.toast]);

  // Effect to update the task's due date when dueDateState changes
  useEffect(() => {
    if (!isInitialRender.current) {
      console.log(
        ".....................................................The due date has changed",
      );
      updateTask({ ...task, dueDate: new Date(dueDateState) });
    }
  }, [dueDateState]);

  const labelToColor = sortedLabels.find((l) => l.label === task.label)?.color;

  const updatePoints = (direction: "up" | "down") => {
    const currentIndex = fib.indexOf(task.points ?? -1);
    const nextIndex = direction === "up" ? currentIndex + 1 : currentIndex - 1;
    const newPoints = fib[nextIndex];
    if (newPoints) {
      updateTask({ ...task, points: newPoints });
    }
  };

  const updatePriority = (newPriority: string) => {
    updateTask({ ...task, priority: newPriority });
  };

  const updateLabel = (newLabel: string) => {
    console.log("updateLabel CALLED", newLabel);
    updateTask({ ...task, label: newLabel });
  };

  //Handlers
  const handleToggleIsEditing = (
    setIsEditing: Dispatch<SetStateAction<boolean>>,
  ) => {
    setIsEditing((prev) => !prev);
    setMouseIsOver(false);
  };

  const handleBlur = (setIsEditing: (value: boolean) => void) => {
    setIsEditing(false);
  };

  const handleFieldChange = <T extends keyof Task>(
    field: T,
    value: Task[T],
  ) => {
    console.log("handleFieldChange  CALLED", field, value);
    updateTask({ ...task, [field]: value });
  };

  const handleKeydown = <T extends HTMLElement>(
    e: React.KeyboardEvent<T>,

    setIsEditing: (isActive: boolean) => void,
  ) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleMouseEnter = () => {
    setMouseIsOver(true);
  };

  const handleMouseLeave = () => {
    setMouseIsOver(false);
  };

  const handleTogglePopover = (taskId: Id) => {
    setPopoverOpenStates((prev) => {
      return {
        ...prev,
        [taskId]: !prev[taskId],
      };
    });
    setIsEditingPriority(false);
    setIsEditingLabel(false);

  };
  return (
    <TaskContext.Provider
      value={{
        task,
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
        setMouseIsOver,
        titleRef,
        priorityRef,
        descriptionRef,
        assigneeRef,
        labelRef,
        dueDateRef,
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
        labelToColor,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };
