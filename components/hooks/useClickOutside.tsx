import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type HookReturns = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  RefObject<HTMLDivElement | null>
];

export function useClickOutside(): HookReturns {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleClickEvent = (e: PointerEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickEvent, false);
    return () => window.removeEventListener("click", handleClickEvent, false);
  }, []);

  return [visible, setVisible, containerRef];
}
