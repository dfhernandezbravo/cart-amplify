import { useEffect } from "react";

const useEventListener = (element: Document, event: string, handler: (event: Event) => void) => {
    useEffect(() => {
      element.addEventListener(event, handler);
      return () => {
        element.removeEventListener(event, handler);
      };
    }, [element, event, handler]);
}

export default useEventListener;