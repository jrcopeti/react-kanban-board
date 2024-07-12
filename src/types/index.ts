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
  updateTaskPoints: (task: Task, points: number) => void;
  updateTaskTitle: (task: Task, title: string) => void;
};

export type { Task, TaskCardProps };
