// React
import { createContext, useState } from "react";

//Hooks
import { useKanban } from "../hooks/useKanban";

//Types
import type { Column, Id, Task, ColumnContextType } from "../types";

const defaultContextValue: ColumnContextType = {
  column: {
    id: "",
    title: "",
  },
  tasksInColumn: [],
  totalPoints: 0,

  isEditing: false,
  popoverOpenStates: {},
  setPopoverOpenStates: () => {},

  handleClick: () => {},
  handleBlur: () => {},
  handleOnChange: () => {},
  handleKeyDown: () => {},
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
  const [isEditing, setIsEditing] = useState(false);
  const [popoverOpenStates, setPopoverOpenStates] = useState<{
    [key: Id]: boolean;
  }>({});

  const { updateColumn } = useKanban();

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
        //Values
        column,
        totalPoints,
        tasksInColumn,

        //States
        isEditing,
        popoverOpenStates,
        setPopoverOpenStates,

        //Handlers
        handleClick,
        handleBlur,
        handleOnChange,
        handleKeyDown,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
}

export { ColumnContext, ColumnProvider };
