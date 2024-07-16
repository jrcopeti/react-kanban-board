// React
import { createContext, useState } from "react";

// UI
import { useToast } from "../components/@/components/ui/use-toast";

// Utils
import { generateId, labels, randomLabelIndex } from "../utils";

// Types
import type { Column, Id, Task, KanbanContextType } from "../types";

const defaultContextValue: KanbanContextType = {
  createNewColumn: () => {},
  updateColumn: () => {},
  deleteColumn: () => {},
  taskInColumn: () => [],
  createTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  columns: [],
  setColumns: () => {},
  tasks: [],
  setTasks: () => {},
};

const KanbanContext = createContext(defaultContextValue);

function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const { toast } = useToast();

  // Create and update columns
  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const updateColumn = (id: Id, title: string) => {
    const updatedColumns = columns.map((col) => {
      return col.id === id ? { ...col, title } : col;
    });
    setColumns(updatedColumns);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);

    const filteredTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(filteredTasks);
  };

  // Create and update tasks
  const taskInColumn = (columnId: Id) => {
    return tasks.filter((task) => task.columnId === columnId);
  };

  const createTask = (columnId: Id) => {
    const newTask = {
      id: generateId(),
      columnId,
      title: `Task ${tasks.length + 1}`,
      assignee: "",
      description: "Maravilhas",
      status: "todo",
      priority: "low",
      label: labels[randomLabelIndex],
      points: 1,
      createdDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    toast({
      title: `Task ${tasks.length + 1}`,
      description: "Was created successfully",
    });
  };

  const updateTask = (task: Task) => {
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };
  return (
    <KanbanContext.Provider
      value={{
        createNewColumn,
        updateColumn,
        deleteColumn,
        taskInColumn,
        createTask,
        updateTask,
        deleteTask,
        columns,
        setColumns,
        tasks,
        setTasks,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export { KanbanContext, KanbanProvider };
