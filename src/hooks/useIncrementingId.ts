import { useRef } from "react";

export const useIncrementingId = (initialId = 0) => {
  const idRef = useRef(initialId);

  const getNextId = () => {
    const newId = idRef.current;
    idRef.current += 1;
    return newId;
  };

  return { getNextId };
};
