import { useEffect } from "react";

export const useSelectClickOutside = (selectRef, selectItemsRef, callback): void => {

  const handleClick = (event) => {
    if (
      selectRef.current && !selectRef.current.contains(event.target) &&
      selectItemsRef.current && !selectItemsRef.current.contains(event.target)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
