// React
import { createPortal } from "react-dom";

// Hooks
import { useKanban } from "../hooks/useKanban";
import { ColumnProvider } from "../context/ColumnContext";
import { TaskProvider } from "../context/TaskContext";

//Components
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";

//UI
import { Button } from "./@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";

//Lib
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

function KanbanBoard() {
  const {
    columns,
    createNewColumn,
    taskInColumn,
    columnsIds,

    activeColumn,
    activeTask,
    onDragStart,
    onDragEnd,
    onDragOver,
    sensors,
  } = useKanban();

  return (
    <div className="flex min-h-screen w-full items-start overflow-x-auto overflow-y-hidden p-8">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="flex items-start gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsIds}>
              {columns.map((col) => (
                <ColumnProvider
                  key={col.id}
                  column={col}
                  tasksInColumn={taskInColumn(col.id)}
                >
                  <ColumnContainer />
                </ColumnProvider>
              ))}
            </SortableContext>
          </div>
          <Button
            onClick={() => createNewColumn()}
            className="bg-pallette-100 ring-pallette-600 flex h-[80px] w-[350px] min-w-[350px] cursor-pointer items-center gap-2 rounded-lg border-2 border-b-gray-100 p-4 text-3xl font-normal text-black hover:ring-2"
          >
            <FiPlusCircle />
            Add Column
          </Button>
        </div>

        {/* Drag Overlay */}
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnProvider
                column={activeColumn}
                tasksInColumn={taskInColumn(activeColumn.id)}
              >
                <ColumnContainer />
              </ColumnProvider>
            )}
            {activeTask && (
              <TaskProvider task={activeTask} isPopoverOpen={false}>
                <TaskCard />
              </TaskProvider>
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
