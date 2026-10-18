import { useEffect, useState } from "react";

export function useCurrentHour(): number {
  const [hour, setHour] = useState(() => new Date().getHours());

  useEffect(() => {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    const timeout = window.setTimeout(() => {
      setHour(new Date().getHours());
    }, nextHour.getTime() - now.getTime());
    return () => window.clearTimeout(timeout);
  }, [hour]);

  return hour;
}
