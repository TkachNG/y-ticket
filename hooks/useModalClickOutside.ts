import { Ref, RefObject, useCallback, useEffect } from "react";

export const useModalClickOutside = (modalRef: RefObject<HTMLElement>, callback: () => void): void => {

  const handleClick = useCallback((event: Event) => {
    if (!modalRef) return;

    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      callback();
    }
  }, [callback, modalRef]);

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};
