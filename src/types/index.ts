import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  useSensors,
} from "@dnd-kit/core";
import { RefObject, Dispatch, SetStateAction } from "react";

type Id = string | number;

type Task = {
  id: number;
  columnId: Id;
  title: string;
  assignee: string;
  description: string;
  status: string;
  priority: string;
  label: string;
  points?: number;
  createdDate: string | Date;
  dueDate: string | Date;
};

type TaskCardProps = {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: Id) => void;
  isPopoverOpen: { [key: Id]: boolean } | boolean;
  setPopoverOpenStates: React.Dispatch<
    React.SetStateAction<{ [key: Id]: boolean }>
  >;
};

type Column = {
  id: Id;
  title: string;
};

type ColumnContainerProps = {
  column: Column;
  updateColumn: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (task: Task) => void;
  tasks: Task[];
};

type DialogDeleteProps = {
  handleDelete: (id: Id) => void;
  id: Id;
  task?: string;
  column?: string;
  isTask?: boolean;
};

type SidebarContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarRef: RefObject<HTMLDivElement>;
  headerRef: RefObject<HTMLDivElement>;
};

type KanbanContextType = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  createNewColumn: () => void;
  updateColumn: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;

  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  taskInColumn: (columnId: Id) => Task[];
  createTask: (columnId: Id) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: Id) => void;

  // Drag and Drop
  columnsIds: Id[];
  activeColumn: Column | null;
  activeTask: Task | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  sensors: ReturnType<typeof useSensors>;
};

type ColumnContextType = {
  column: Column;
  totalPoints: number;
  tasksInColumn: Task[];

  isEditing: boolean;
  popoverOpenStates: {
    [key: Id]: boolean;
  };
  setPopoverOpenStates: React.Dispatch<
    React.SetStateAction<{ [key: Id]: boolean }>
  >;

  handleClick: () => void;
  handleBlur: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

type TaskContextType = {
  task: Task;
  //States
  isPopoverOpen: boolean;
  isEditingTitle: boolean;
  setIsEditingTitle: Dispatch<SetStateAction<boolean>>;
  isEditingPriority: boolean;
  setIsEditingPriority: Dispatch<SetStateAction<boolean>>;
  isEditingDescription: boolean;
  setIsEditingDescription: Dispatch<SetStateAction<boolean>>;
  isEditingAssignee: boolean;
  setIsEditingAssignee: Dispatch<SetStateAction<boolean>>;
  isEditingLabel: boolean;
  setIsEditingLabel: Dispatch<SetStateAction<boolean>>;
  isEditingDueDate: boolean;
  setIsEditingDueDate: Dispatch<SetStateAction<boolean>>;
  dueDateState: Date;
  setDueDateState: Dispatch<SetStateAction<Date>>;
  mouseIsOver: boolean;
  setMouseIsOver: Dispatch<SetStateAction<boolean>>;

  //Refs
  titleRef: React.RefObject<HTMLInputElement>;
  descriptionRef: React.RefObject<HTMLTextAreaElement>;
  assigneeRef: React.RefObject<HTMLInputElement>;
  labelRef: React.RefObject<HTMLDivElement>;
  dueDateRef: React.RefObject<HTMLButtonElement>;

  //Handlers
  handleToggleIsEditing: (
    setIsEditing: Dispatch<SetStateAction<boolean>>,
  ) => void;
  handleBlur: (setIsEditing: (isActive: boolean) => void) => void;
  handleFieldChange: <T extends keyof Task>(field: T, value: Task[T]) => void;
  handleKeydown: <T extends HTMLElement>(
    e: React.KeyboardEvent<T>,
    setIsEditing: (isActive: boolean) => void,
  ) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleTogglePopover: (taskId: Id) => void;
  updatePoints: (direction: "up" | "down") => void;
  updatePriority: (newPriority: string) => void;
  updateLabel: (newLabel: string) => void;
};

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: (e: React.MouseEvent) => void;
};

type DatePickerProps = {
  date: Date | undefined;
  setDate:
    | SelectSingleEventHandler
    | React.Dispatch<React.SetStateAction<Date>>
    | undefined;
  ref: React.Ref<HTMLButtonElement>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type {
  Task,
  TaskCardProps,
  Column,
  ColumnContainerProps,
  Id,
  DialogDeleteProps,
  SidebarContextType,
  KanbanContextType,
  ColumnContextType,
  TaskContextType,
  Theme,
  ThemeProviderProps,
  ThemeContextType,
  DatePickerProps,
};
