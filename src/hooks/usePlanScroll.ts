import {
  animate,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { useLayoutEffect, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { TreatmentAppointment } from "@/data/treatment/treatment.types";

const edgeFadePx = 40;
const scrollSpring = { type: "spring" as const, duration: 0.45, bounce: 0 };
const cueSpring = { type: "spring" as const, duration: 0.3, bounce: 0 };

type CueName = "up" | "down";
type CueRuns = Record<CueName, AnimationPlaybackControls | null>;
type CueTargets = Record<CueName, number | null>;
type ScrollEdges = { up: boolean; down: boolean; top: number; bottom: number };

type ScrollBag = {
  topOpacity: MotionValue<number>;
  bottomOpacity: MotionValue<number>;
  topCue: MotionValue<number>;
  bottomCue: MotionValue<number>;
  revealed: RefObject<boolean>;
  targets: RefObject<CueTargets>;
  cueRuns: RefObject<CueRuns>;
  setEdges: Dispatch<SetStateAction<{ up: boolean; down: boolean }>>;
  setWindowHeight: Dispatch<SetStateAction<number | null>>;
};

export type PlanScroll = {
  windowHeight: number | null;
  topOpacity: MotionValue<number>;
  bottomOpacity: MotionValue<number>;
  topCue: MotionValue<number>;
  bottomCue: MotionValue<number>;
  topScale: MotionValue<number>;
  bottomScale: MotionValue<number>;
  topBlur: MotionValue<string>;
  bottomBlur: MotionValue<string>;
  edges: { up: boolean; down: boolean };
  scrollByPage: (direction: 1 | -1) => void;
};

export function usePlanScroll(
  scrollerRef: RefObject<HTMLDivElement | null>,
  visibleCount: number,
  items: TreatmentAppointment[],
): PlanScroll {
  const topOpacity = useMotionValue(0);
  const bottomOpacity = useMotionValue(0);
  const topCue = useMotionValue(0);
  const bottomCue = useMotionValue(0);
  const topScale = useTransform(topCue, cueScale);
  const bottomScale = useTransform(bottomCue, cueScale);
  const topBlur = useTransform(topCue, cueBlur);
  const bottomBlur = useTransform(bottomCue, cueBlur);
  const playback = useRef<AnimationPlaybackControls | null>(null);
  const cueRuns = useRef<CueRuns>({ up: null, down: null });
  const targets = useRef<CueTargets>({ up: null, down: null });
  const revealed = useRef(false);
  const [edges, setEdges] = useState({ up: false, down: false });
  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const itemKey = items.map((item) => item.id).join(":");
  const bag = useRef({
    topOpacity, bottomOpacity, topCue, bottomCue, revealed, targets, cueRuns, setEdges, setWindowHeight,
  });

  useLayoutEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    return watchPlanScroll(node, visibleCount, bag.current, playback);
  }, [itemKey, scrollerRef, visibleCount]);

  return {
    windowHeight, topOpacity, bottomOpacity, topCue, bottomCue,
    topScale, bottomScale, topBlur, bottomBlur, edges,
    scrollByPage: (direction: 1 | -1) => pageScroll(scrollerRef, playback, direction),
  };
}

function pageScroll(
  scrollerRef: RefObject<HTMLDivElement | null>,
  playback: RefObject<AnimationPlaybackControls | null>,
  direction: 1 | -1,
) {
  const node = scrollerRef.current;
  if (!node) return;
  playback.current = scrollPlanPage(node, direction, playback.current);
}

function watchPlanScroll(
  node: HTMLElement,
  visibleCount: number,
  bag: ScrollBag,
  playback: RefObject<AnimationPlaybackControls | null>,
) {
  bag.revealed.current = false;
  bag.targets.current = { up: null, down: null };
  node.scrollTop = 0;
  node.style.maxHeight = "none";
  const update = () => publishScroll(node, visibleCount, bag);
  update();
  bag.revealed.current = true;
  return bindPlanScroll(node, update, playback, bag.cueRuns);
}

function publishScroll(node: HTMLElement, visibleCount: number, bag: ScrollBag) {
  const height = measureWindow(node, visibleCount);
  const maxHeight = height === null ? "none" : `${height}px`;
  if (node.style.maxHeight !== maxHeight) node.style.maxHeight = maxHeight;
  bag.setWindowHeight((current) => (heightsMatch(current, height) ? current : height));
  const next = readEdges(node);
  bag.topOpacity.set(next.top);
  bag.bottomOpacity.set(next.bottom);
  moveCue(bag.topCue, next.up, "up", bag);
  moveCue(bag.bottomCue, next.down, "down", bag);
  bag.setEdges((current) => (current.up === next.up && current.down === next.down ? current : { up: next.up, down: next.down }));
}

function measureWindow(scroller: HTMLElement, visibleCount: number): number | null {
  const rows = scroller.querySelectorAll<HTMLElement>("[data-plan-item]");
  const target = rows[visibleCount - 1];
  if (visibleCount < 1 || !target || rows.length <= visibleCount) return null;
  const top = scroller.getBoundingClientRect().top;
  const bottom = target.getBoundingClientRect().bottom;
  return Math.ceil(bottom - top + scroller.scrollTop);
}

function readEdges(node: HTMLElement): ScrollEdges {
  const max = node.scrollHeight - node.clientHeight;
  if (max <= 1) return { up: false, down: false, top: 0, bottom: 0 };
  const remaining = max - node.scrollTop;
  return {
    up: node.scrollTop > 1,
    down: remaining > 1,
    top: Math.min(1, node.scrollTop / edgeFadePx),
    bottom: Math.min(1, remaining / edgeFadePx),
  };
}

function moveCue(value: MotionValue<number>, show: boolean, name: CueName, bag: ScrollBag) {
  const target = show ? 1 : 0;
  if (bag.targets.current[name] === target) return;
  bag.targets.current = { ...bag.targets.current, [name]: target };
  bag.cueRuns.current[name]?.stop();
  if (!bag.revealed.current || prefersReducedMotion()) {
    value.set(target);
    return;
  }
  bag.cueRuns.current[name] = animate(value, target, cueSpring);
}

function scrollPlanPage(
  node: HTMLElement,
  direction: 1 | -1,
  current: AnimationPlaybackControls | null,
): AnimationPlaybackControls | null {
  current?.stop();
  const max = Math.max(0, node.scrollHeight - node.clientHeight);
  const target = Math.min(max, Math.max(0, node.scrollTop + direction * node.clientHeight));
  if (Math.abs(node.scrollTop - target) < 1 || prefersReducedMotion()) {
    node.scrollTop = target;
    return null;
  }
  return animate(node.scrollTop, target, {
    ...scrollSpring,
    onUpdate: (value) => {
      node.scrollTop = value;
    },
  });
}

function bindPlanScroll(
  node: HTMLElement,
  update: () => void,
  playback: RefObject<AnimationPlaybackControls | null>,
  cueRuns: RefObject<CueRuns>,
) {
  const stop = () => playback.current?.stop();
  node.addEventListener("scroll", update, { passive: true });
  node.addEventListener("wheel", stop, { passive: true });
  node.addEventListener("touchstart", stop, { passive: true });
  node.addEventListener("pointerdown", stop);
  const observer = new ResizeObserver(update);
  observer.observe(node);
  if (node.firstElementChild) observer.observe(node.firstElementChild);
  return () => {
    node.removeEventListener("scroll", update);
    node.removeEventListener("wheel", stop);
    node.removeEventListener("touchstart", stop);
    node.removeEventListener("pointerdown", stop);
    observer.disconnect();
    playback.current?.stop();
    cueRuns.current.up?.stop();
    cueRuns.current.down?.stop();
  };
}

function heightsMatch(current: number | null, next: number | null): boolean {
  if (current === null || next === null) return current === next;
  return Math.abs(current - next) < 1;
}

function cueScale(value: number): number {
  return 0.25 + value * 0.75;
}

function cueBlur(value: number): string {
  return `blur(${(1 - value) * 4}px)`;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
