import { RefObject } from "react";

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
  createdDate: string;
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
  totalPoints: number;
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

export type {
  Task,
  TaskCardProps,
  Column,
  ColumnContainerProps,
  Id,
  DialogDeleteProps,
  SidebarContextType,
};
