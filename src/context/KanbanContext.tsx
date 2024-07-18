// React
import { createContext, useMemo, useState } from "react";

// UI
import { useToast } from "../components/@/components/ui/use-toast";

//Lib
import { arrayMove } from "@dnd-kit/sortable";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

// Utils
import { generateId, labels, taskPriorities, fib } from "../utils";

// Types
import type { Column, Id, Task, KanbanContextType } from "../types";

const defaultContextValue: KanbanContextType = {
  // Columns
  columns: [],
  setColumns: () => {},
  createNewColumn: () => {},
  updateColumn: () => {},
  deleteColumn: () => {},
  // Tasks
  tasks: [],
  setTasks: () => {},
  taskInColumn: () => [],
  createTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},

  // Drag and Drop
  columnsIds: [],
  activeColumn: null,
  activeTask: null,
  onDragStart: () => {},
  onDragEnd: () => {},
  onDragOver: () => {},
  sensors: [],
};

const KanbanContext = createContext(defaultContextValue);

function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [randomLabelIndex, setRandomLabelIndex] = useState(0);
  const [randomPriorityIndex, setRandomPriorityIndex] = useState(0);
  const [randomPoints, setRandomPoints] = useState(0);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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
  const generateRandomLabel = () => {
    setRandomLabelIndex(Math.floor(Math.random() * labels.length));
  };
  const generateRandomPriority = () => {
    setRandomPriorityIndex(Math.floor(Math.random() * taskPriorities.length));
  };
  const generateRandomPoints = () => {
    setRandomPoints(Math.floor(Math.random() * fib.length));
  };

  const createTask = (columnId: Id) => {
    generateRandomLabel();
    generateRandomPriority();
    generateRandomPoints();
    const newTask = {
      id: generateId(),
      columnId,
      title: `Task ${tasks.length + 1}`,
      assignee: "",
      description: "Maravilhas",
      priority: taskPriorities[randomPriorityIndex],
      label: labels[randomLabelIndex],
      points: fib[randomPoints],
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

  // DND Kit Library

  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const getColumnPosition = (id: Id) => {
    const index = columns.findIndex((col) => col.id === id);
    return index;
  };

  const getTaskPosition = (id: Id) => {
    const index = tasks.findIndex((task) => task.id === id);
    return index;
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column as Column);
      console.log("activeColumn", activeColumn);
      return;
    }

    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task as Task);
      console.log("activeTask", activeTask);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log("drag end started");
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) {
      console.log("no over");
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    // Ensure we're handling columns
    if (
      active.data.current?.type === "column" &&
      over.data.current?.type === "column"
    ) {
      const activeColumnIndex = getColumnPosition(activeId);
      const overColumnIndex = getColumnPosition(overId);

      if (activeColumnIndex !== overColumnIndex) {
        setColumns((columns) => {
          const updatedColumns = arrayMove(
            columns,
            activeColumnIndex,
            overColumnIndex,
          );
          console.log("array Move Columns", updatedColumns);
          return updatedColumns;
        });
      }
      return;
    }

    // Ensure we're handling tasks
    if (
      active.data.current?.type === "task" &&
      over.data.current?.type === "task"
    ) {
      const activeIndex = getTaskPosition(activeId);
      const overIndex = getTaskPosition(overId);
      const activeTaskColumnId = tasks[activeIndex].columnId;
      const overTaskColumnId = tasks[overIndex].columnId;
      console.log("activeTaskColumnId", activeTaskColumnId);
      console.log("overTaskColumnId", overTaskColumnId);

      setTasks((tasks) => {
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].columnId = overTaskColumnId;

        const movedTasks = arrayMove(updatedTasks, activeIndex, overIndex);
        console.log("arrayMove tasks within the same column", movedTasks);
        console.log("THIS IS TRU");
        return movedTasks;
      });
      return;
    }

    // Handle dropping task on column directly
    if (
      active.data.current?.type === "task" &&
      over.data.current?.type === "column"
    ) {
      setTasks((tasks) => {
        const activeIndex = getTaskPosition(activeId);
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].columnId = overId;

        console.log("move task to column", updatedTasks);
        return updatedTasks;
      });
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    console.log("drag over started");
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    console.log("activeId", activeId);
    console.log("overId", overId);

    if (activeId === overId) {
      console.log("same id");
      return;
    }

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = getTaskPosition(activeId);
        const overIndex = getTaskPosition(overId);
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].columnId = updatedTasks[overIndex].columnId;

        const movedTasks = arrayMove(updatedTasks, activeIndex, overIndex);
        console.log("arrayMove tasks during drag over", movedTasks);
        return movedTasks;
      });
    }

    const isOverColumn = over.data.current?.type === "column";

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = getTaskPosition(activeId);
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].columnId = overId;

        console.log("move task to column during drag over", updatedTasks);
        return updatedTasks;
      });
    }
  };

  // const onDragEnd = (event: DragEndEvent) => {
  //   console.log("drag end started");
  //   setActiveColumn(null);
  //   setActiveTask(null);

  //   const { active, over } = event;
  //   if (!over) {
  //     console.log("no over");
  //     return;
  //   }

  //   const activeId = active.id;
  //   const overId = over.id;

  //   // Ensure we're handling columns
  //   if (active.data.current?.type === 'column' && over.data.current?.type === 'column') {
  //     const activeColumnIndex = getColumnPosition(activeId);
  //     const overColumnIndex = getColumnPosition(overId);

  //     if (activeColumnIndex !== overColumnIndex) {
  //       setColumns((columns) => {
  //         const updatedColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);
  //         console.log("array Move Columns", updatedColumns);
  //         return updatedColumns;
  //       });
  //     }
  //     return;
  //   }

  //   // Ensure we're handling tasks
  //   if (active.data.current?.type === 'task' && over.data.current?.type === 'task') {
  //     const activeIndex = getTaskPosition(activeId);
  //     const overIndex = getTaskPosition(overId);
  //     const activeTaskColumnId = tasks[activeIndex].columnId;
  //     const overTaskColumnId = tasks[overIndex].columnId;

  //     if (activeTaskColumnId !== overTaskColumnId) {
  //       setTasks((tasks) => {
  //         const updatedTasks = [...tasks];
  //         updatedTasks[activeIndex].columnId = overTaskColumnId;

  //         console.log("MARAJOARA", updatedTasks);

  //         const movedTasks = arrayMove(updatedTasks, activeIndex, overIndex);
  //         console.log("arrayMove tasks between columns", movedTasks);
  //         return movedTasks;
  //       });
  //     } else {
  //       setTasks((tasks) => {
  //         const movedTasks = arrayMove(tasks, activeIndex, overIndex);
  //         console.log("arrayMove tasks within the same column", movedTasks);
  //         return movedTasks;
  //       });
  //     }
  //     return;
  //   }

  //   // Handle dropping task on column directly
  //   if (active.data.current?.type === 'task' && over.data.current?.type === 'column') {
  //     setTasks((tasks) => {
  //       const activeIndex = getTaskPosition(activeId);
  //       const updatedTasks = [...tasks];
  //       updatedTasks[activeIndex].columnId = overId;

  //       console.log("move task to column", updatedTasks);
  //       return updatedTasks;
  //     });
  //     return;
  //   }
  // };

  // const onDragOver = (event: DragOverEvent) => {
  //   console.log("drag over started");
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeId = active.id;
  //   const overId = over.id;
  //   console.log("activeId", activeId);
  //   console.log("overId", overId);

  //   if (activeId === overId) {
  //     console.log("same id");
  //     return;
  //   }

  //   const isActiveTask = active.data.current?.type === 'task';
  //   const isOverTask = over.data.current?.type === 'task';

  //   if (!isActiveTask) return;

  //   if (isActiveTask && isOverTask) {
  //     setTasks((tasks) => {
  //       const activeIndex = getTaskPosition(activeId);
  //       const overIndex = getTaskPosition(overId);
  //       const updatedTasks = [...tasks];
  //       updatedTasks[activeIndex].columnId = updatedTasks[overIndex].columnId;

  //       const movedTasks = arrayMove(updatedTasks, activeIndex, overIndex);
  //       console.log("arrayMove tasks during drag over", movedTasks);
  //       return movedTasks;
  //     });
  //   }

  //   const isOverColumn = over.data.current?.type === 'column';

  //   if (isActiveTask && isOverColumn) {
  //     setTasks((tasks) => {
  //       const activeIndex = getTaskPosition(activeId);
  //       const updatedTasks = [...tasks];
  //       updatedTasks[activeIndex].columnId = overId;

  //       console.log("move task to column during drag over", updatedTasks);
  //       return updatedTasks;
  //     });
  //   }
  // };

  // const onDragEnd = (event: DragEndEvent) => {
  //   console.log("drag end started");
  //   setActiveColumn(null);
  //   setActiveTask(null);

  //   const { active, over } = event;
  //   if (!over) {
  //     console.log("no over");
  //     return;
  //   }

  //   const activeColumnId = active.id;
  //   const overColumnId = over.id;
  //   if (activeColumnId === overColumnId) {
  //     console.log("same column");
  //     return;
  //   }

  //   setColumns((columns) => {
  //     const activeColumnIndex = getColumnPosition(activeColumnId);
  //     const overColumnIndex = getColumnPosition(overColumnId);
  //     console.log(
  //       "array Move Columns",
  //       arrayMove(columns, activeColumnIndex, overColumnIndex),
  //     );
  //     return arrayMove(columns, activeColumnIndex, overColumnIndex);
  //   });
  // };

  // const onDragOver = (event: DragOverEvent) => {
  //   console.log("drag over started");
  //   const { active, over } = event;
  //   if (!over) return;
  //   const activeId = active.id;
  //   console.log("activeId", activeId);
  //   const overId = over.id;
  //   console.log("overId", overId);

  //   if (activeId === overId) {
  //     console.log("same id");
  //     return;
  //   }

  //   const isActiveTask = active.data.current?.type === "task";
  //   console.log("isActiveTask", isActiveTask);
  //   const isOverTask = over.data.current?.type === "task";
  //   console.log("isOverTask", isOverTask);

  //   if (!isActiveTask) return;

  //   // Dropping a task over another task
  //   if (isActiveTask && isOverTask) {
  //     setTasks((tasks) => {
  //       const activeIndex = getTaskPosition(active.id);
  //       console.log("activeIndex", activeIndex);
  //       const overIndex = getTaskPosition(over.id);
  //       console.log("overIndex", overIndex);
  //       const updatedTasks = [...tasks];
  //       updatedTasks[activeIndex].columnId = updatedTasks[overIndex].columnId;
  //       console.log(
  //         "updatedTasks[activeIndex].columnId",
  //         updatedTasks[activeIndex].columnId,
  //       );
  //       console.log(
  //         "updatedTasks[overIndex].columnId",
  //         updatedTasks[overIndex].columnId,
  //       );

  //       console.log(
  //         "arrayMove updatedTasks",
  //         arrayMove(updatedTasks, activeIndex, overIndex),
  //       );

  //       return arrayMove(updatedTasks, activeIndex, overIndex);
  //     });
  //   }

  //   // Dropping a task over a column
  //   const isOverColumn = over.data.current?.type === "column";

  //   if (isActiveTask && isOverColumn) {
  //     setTasks((tasks) => {
  //       const activeIndex = getTaskPosition(active.id);
  //       const updatedTasks = [...tasks];

  //       updatedTasks[activeIndex].columnId = overId;

  //       //creating a new array with the task in the new column
  //       console.log(
  //         "arrayMove(updatedTasks, activeIndex, activeIndex)",
  //         arrayMove(updatedTasks, activeIndex, activeIndex),
  //       );
  //       return arrayMove(updatedTasks, activeIndex, activeIndex);
  //     });
  //   }
  // };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 100,
      },
    }),
    useSensor(TouchSensor),
    useSensor(MouseSensor),
  );

  return (
    <KanbanContext.Provider
      value={{
        // Columns
        columns,
        setColumns,
        createNewColumn,
        updateColumn,
        deleteColumn,
        taskInColumn,

        // Tasks
        tasks,
        setTasks,
        createTask,
        updateTask,
        deleteTask,

        // Drag and Drop
        columnsIds,
        activeColumn,
        activeTask,
        onDragStart,
        onDragEnd,
        onDragOver,
        sensors,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export { KanbanContext, KanbanProvider };
