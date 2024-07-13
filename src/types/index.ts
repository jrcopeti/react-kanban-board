type Id = string | number;

type Task = {
  id: number;
  columnId: Id;
  title: string;
  assignee: string;
  description: string;
  status: string;
  priority: string;
  points?: number;
  createdDate: string;
  dueDate: string;
};

type TaskCardProps = {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
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
  tasks: Task[];
};

export type { Task, TaskCardProps, Column, ColumnContainerProps, Id };
