import { useEffect, useState } from "react";

export function useVisibleInterval(milliseconds: number): number | false {
  const [visible, setVisible] = useState(() => document.visibilityState === "visible");

  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return visible ? milliseconds : false;
}
