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
  dueDate: string;
};

type TaskCardProps = {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
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

export type { Task, TaskCardProps, Column, ColumnContainerProps, Id };
