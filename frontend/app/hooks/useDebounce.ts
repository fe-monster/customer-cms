import { useEffect } from "react";

const useDebounce = (fn: Function, delay: number, deps:any[]):void => {
      useEffect(() => {
        const timer = setTimeout(fn, delay);
        return () => clearTimeout(timer);
      }, deps);
}

export default useDebounce;