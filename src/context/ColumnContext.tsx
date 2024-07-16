// React
import { createContext, useState } from "react";

//Hooks
import { useKanban } from "../hooks/useKanban";

//Types
import type { Column, Id, Task, ColumnContextType } from "../types";

const defaultContextValue: ColumnContextType = {
  isEditing: false,
  popoverOpenStates: {},
  setPopoverOpenStates: () => {},
  totalPoints: 0,
  handleClick: () => {},
  handleBlur: () => {},
  handleOnChange: () => {},
  handleKeyDown: () => {},
  column: {
    id: "",
    title: "",
  },
  tasksInColumn: [],
};

const ColumnContext = createContext(defaultContextValue);

function ColumnProvider({
  children,
  column,
  tasksInColumn,
}: {
  children: React.ReactNode;
  column: Column;
  tasksInColumn: Task[];
}) {
  const { updateColumn } = useKanban();

  const [isEditing, setIsEditing] = useState(false);
  const [popoverOpenStates, setPopoverOpenStates] = useState<{
    [key: Id]: boolean;
  }>({});

  const totalPoints = tasksInColumn.reduce(
    (total, task) => total + (task?.points || 0),
    0,
  );

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColumn(column.id, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setIsEditing(false);
  };
  return (
    <ColumnContext.Provider
      value={{
        isEditing,
        popoverOpenStates,
        setPopoverOpenStates,
        totalPoints,
        handleClick,
        handleBlur,
        handleOnChange,
        handleKeyDown,
        column,
        tasksInColumn,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
}

export { ColumnContext, ColumnProvider };
