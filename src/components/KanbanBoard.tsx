import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import type { Column } from "../types";
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
  useSortable,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: string | number) => {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
  };

  const getColumnPosition = (id: string | number) => {
    const index = columns.findIndex((col) => col.id === id);
    return index;
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
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
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
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
                  deleteColumn={deleteColumn}
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
