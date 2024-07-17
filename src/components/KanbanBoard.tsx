// React
import { createPortal } from "react-dom";

//Hooks
import { useKanban } from "../hooks/useKanban";

//Components
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";

//UI
import { Button } from "./@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";

//Lib
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ColumnProvider } from "../context/ColumnContext";
import { TaskProvider } from "../context/TaskContext";

function KanbanBoard() {

  const {
    columns,
    createNewColumn,
    taskInColumn,
    columnsIds,

    // DND Kit
    activeColumn,
    activeTask,
    onDragStart,
    onDragEnd,
    onDragOver,
    sensors,
  } = useKanban();


  return (
    <div className="flex min-h-full w-full touch-manipulation items-start overflow-x-auto overflow-y-hidden p-8 ">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="flex items-start gap-2">
          <div className="flex gap-4">
            <SortableContext

              items={columnsIds}
            >
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

            className="flex h-[80px] w-[350px] min-w-[350px] cursor-pointer items-center gap-2 rounded-lg border-2 border-b-pallette-100 bg-pallette-100 p-4 text-2xl font-semibold text-pallette-600 ring-pallette-500 hover:ring-2"

          >
            <FiPlusCircle />
            Add Column
          </Button>
        </div>

        {/* Drag Overlay */}
        {createPortal(
          <DragOverlay
            dropAnimation={{
              duration: 300,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}

          >
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
