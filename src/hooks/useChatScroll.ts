import { useLayoutEffect, useRef, useState } from "react";

const pinThreshold = 48;

export function useChatScroll(anchor: string) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pinned = useRef(true);
  const [awayFromLatest, setAwayFromLatest] = useState(false);

  useLayoutEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const pin = () => {
      if (pinned.current) node.scrollTop = node.scrollHeight;
    };
    pin();
    const observer = new ResizeObserver(pin);
    observer.observe(node);
    return () => observer.disconnect();
  }, [anchor]);

  function onScroll() {
    const node = scrollerRef.current;
    if (!node) return;
    const nextPinned = node.scrollHeight - node.scrollTop - node.clientHeight <= pinThreshold;
    pinned.current = nextPinned;
    setAwayFromLatest(!nextPinned);
  }

  function jumpToLatest() {
    const node = scrollerRef.current;
    if (!node) return;
    pinned.current = true;
    setAwayFromLatest(false);
    node.scrollTop = node.scrollHeight;
  }

  return { scrollerRef, awayFromLatest, onScroll, jumpToLatest };
}
