import { useEffect, useRef, MutableRefObject } from "react";

type Handler = () => void;

export function useOutsideClick<T extends HTMLElement>(
  handler: Handler,
  ...refs: MutableRefObject<T | null>[]
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(e.target as Node),
        )
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handler, refs]);

  return ref;
}
