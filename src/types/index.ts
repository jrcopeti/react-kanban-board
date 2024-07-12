type Task = {
  id: string;
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

export type { Task, TaskCardProps };
