import { RefObject, useCallback, useEffect } from "react";

export const useSelectClickOutside = (
  selectRef: RefObject<HTMLElement>,
  selectItemsRef: RefObject<HTMLElement>,
  callback: () => void
): void => {

  const handleClick = useCallback((event: Event) => {
    if (
      selectRef.current && !selectRef.current.contains(event.target as Node) &&
      selectItemsRef.current && !selectItemsRef.current.contains(event.target as Node)
    ) {
      callback();
    }
  }, [callback, selectItemsRef, selectRef]);

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};
