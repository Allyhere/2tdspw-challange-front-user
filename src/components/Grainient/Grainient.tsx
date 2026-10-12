import { useEffect, useRef, type RefObject } from "react";
import { resolveGrainientOptions } from "@/components/Grainient/Grainient.options";
import { attachGrainient } from "@/components/Grainient/Grainient.scene";
import { syncGrainient } from "@/components/Grainient/Grainient.sync";
import type { GrainientProps } from "@/components/Grainient/Grainient.types";

export function Grainient({ className = "", ...props }: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGrainientScene(containerRef);
  useGrainientSync(containerRef, props);
  return <div ref={containerRef} className={containerClass(className)} />;
}

function useGrainientScene(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    return attachGrainient(container);
  }, [containerRef]);
}

function useGrainientSync(
  containerRef: RefObject<HTMLDivElement | null>,
  props: GrainientProps,
) {
  const options = resolveGrainientOptions(props);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    syncGrainient(container, options);
  }, [containerRef, options]);
}

function containerClass(className: string): string {
  return `relative h-full w-full overflow-hidden ${className}`.trim();
}
