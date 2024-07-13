import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import type { Column, Task } from "../types";
import { generateId } from "../utils";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import type { Id } from "../types";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

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
  };

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
      points: 1,
      createdDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const updateTask = (task: Task) => {
    console.log(task, "task");
    console.log("function updateTask");
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t;
    });
    setTasks(updatedTasks);
  };

  const totalPoints = tasks.reduce(
    (total, task) => total + (task?.points || 0),
    0,
  );

  // Library DND Kit

  const getColumnPosition = (id: Id) => {
    const index = columns.findIndex((col) => col.id === id);
    return index;
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column as Column);
      return;
    }

    console.log("onDragStart", event);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = getColumnPosition(activeColumnId);
      const overColumnIndex = getColumnPosition(overColumnId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor),

    useSensor(MouseSensor),
  );

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  totalPoints={totalPoints}
                  tasks={taskInColumn(col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            onClick={() => createNewColumn()}
            className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer items-center gap-2 rounded-lg border-2 border-b-gray-100 bg-gray-500 p-4 ring-rose-500 hover:ring-2"
          >
            <FiPlusCircle />
            Add Column
          </Button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                totalPoints={totalPoints}
                tasks={taskInColumn(activeColumn.id)}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
