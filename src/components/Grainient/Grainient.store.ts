import type { GrainientScene } from "@/components/Grainient/Grainient.types";

const scenes = new WeakMap<HTMLElement, GrainientScene>();

export function saveGrainientScene(container: HTMLElement, scene: GrainientScene) {
  scenes.set(container, scene);
}

export function readGrainientScene(container: HTMLElement): GrainientScene | undefined {
  return scenes.get(container);
}

export function dropGrainientScene(container: HTMLElement) {
  scenes.delete(container);
}
