type Task = {
  id: number;
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
};

type Column = {
  id: string | number;
  title: string;
};

type ColumnContainerProps = {
  column: Column;
  deleteColumn: (id: string | number) => void;
};

export type { Task, TaskCardProps, Column, ColumnContainerProps };
