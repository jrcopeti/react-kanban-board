// React
import { createPortal } from "react-dom";

//Components
import ColumnContainer from "./ColumnContainer";

//UI
import { Button } from "./@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";

// Utils
import { generateId, labels, randomLabelIndex } from "../utils";

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
                <ColumnContainer
                  key={col.id}
                  column={col}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={taskInColumn(col.id)}
                />
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
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={taskInColumn(activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                isPopoverOpen={false}
                setPopoverOpenStates={() => {}}
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
