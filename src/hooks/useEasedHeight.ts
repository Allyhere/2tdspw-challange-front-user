import {
  animate,
  useMotionValue,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";

const heightSpring = { type: "spring" as const, duration: 0.5, bounce: 0 };

export function useEasedHeight(source: RefObject<HTMLElement | null>): {
  height: MotionValue<number>;
  ready: boolean;
} {
  const height = useMotionValue(0);
  const measured = useRef(false);
  const playback = useRef<AnimationPlaybackControls | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const node = source.current;
    if (!node) return;
    const apply = () => {
      const next = node.scrollHeight;
      const current = height.get();
      playback.current?.stop();
      if (!measured.current || reducedMotion() || Math.abs(current - next) < 1) {
        measured.current = true;
        height.set(next);
        setReady(true);
        return;
      }
      playback.current = animate(height, next, heightSpring);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => {
      observer.disconnect();
      playback.current?.stop();
    };
  }, [height, source]);

  return { height, ready };
}

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
