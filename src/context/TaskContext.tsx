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
import { sortedLabels } from "../utils";

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

  //Update task.dueDate
  updateDueDate: () => {},

  //Handlers
  handleToggleIsEditing: () => {},
  handleBlur: () => {},
  handleBlurWithUpdate: () => {},
  handleFieldChange: () => {},
  handleKeydown: () => {},
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  handleTogglePopover: () => {},

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

  //Refs
  const titleRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const assigneeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const dueDateRef = useRef<HTMLButtonElement>(null);

  const prevTaskRef = useRef(task);

  //Focus on input
  useEffect(() => {
    if (isEditingTitle && titleRef.current) {
      titleRef.current?.focus();
    } else if (isEditingPriority && priorityRef.current) {
      priorityRef.current.focus();
    } else if (isEditingDescription && descriptionRef.current) {
      descriptionRef.current.focus();
    } else if (isEditingAssignee && assigneeRef.current) {
      assigneeRef.current.focus();
    } else if (isEditingDueDate && dueDateRef.current) {
      dueDateRef.current.focus();
    } else if (isEditingLabel && labelRef.current) {
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

  //Update toast only when some task field changes
  useEffect(() => {
    if (
      prevTaskRef.current.title !== task.title ||
      prevTaskRef.current.assignee !== task.assignee ||
      prevTaskRef.current.description !== task.description ||
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

    // Update ref to current task at the end and trigger effect only when task changes
    prevTaskRef.current = task;
  }, [task, toast.toast]);

  const labelToColor = sortedLabels.find((l) => l.label === task.label)?.color;

  //update task.dueDate
  const updateDueDate = (selectedDate: Date | string) => {
    updateTask({ ...task, dueDate: selectedDate });
  };

  //Handlers
  const handleToggleIsEditing = (
    setIsEditing: Dispatch<SetStateAction<boolean>>,
  ) => {
    setIsEditing((prev) => !prev);
    setMouseIsOver(false);
  };

  const handleBlurWithUpdate: <T extends keyof Task>(
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    field: T,
    value: Task[T],
  ) => void = (setIsEditing, field, value) => {
    setIsEditing(false);
    if (task[field] !== value) {
      updateTask({ ...task, [field]: value });
    }
  };

  const handleBlur = (
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  ): void => {
    setIsEditing(false);
  };

  const handleFieldChange = <T extends keyof Task>(
    field: T,
    value: Task[T],
  ) => {
    updateTask({ ...task, [field]: value });
  };

  const handleKeydown = <T extends HTMLElement>(
    e: React.KeyboardEvent<T>,
    setIsEditing: (isActive: boolean) => void,
  ) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      (e.target as HTMLElement).blur();
    } else if (e.key === "Escape") {
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
        setMouseIsOver,

        //Refs
        titleRef,
        priorityRef,
        descriptionRef,
        assigneeRef,
        labelRef,
        dueDateRef,

        //Update task.dueDate
        updateDueDate,

        //Handlers
        handleToggleIsEditing,
        handleBlur,
        handleFieldChange,
        handleKeydown,
        handleMouseEnter,
        handleMouseLeave,
        handleTogglePopover,
        handleBlurWithUpdate,

        //Helpers
        labelToColor,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };
