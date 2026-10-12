import { Mesh, Program, Renderer, Triangle } from "ogl";
import { startGrainientLoop } from "@/components/Grainient/Grainient.playback";
import { syncRememberedGrainient } from "@/components/Grainient/Grainient.sync";
import {
  grainientFragment,
  grainientVertex,
} from "@/components/Grainient/Grainient.shaders";
import { createGrainientUniforms } from "@/components/Grainient/Grainient.uniforms";
import { dropGrainientScene, saveGrainientScene } from "@/components/Grainient/Grainient.store";
import type {
  GrainientScene,
  GrainientUniforms,
} from "@/components/Grainient/Grainient.types";

export function attachGrainient(container: HTMLElement): () => void {
  const scene = createGrainientScene(container);
  syncRememberedGrainient(container);
  const stopSize = watchGrainientSize(container, scene);
  const stopLoop = startGrainientLoop(container, scene);
  return () => {
    stopLoop();
    stopSize();
    destroyGrainientScene(container, scene);
  };
}

function createGrainientScene(container: HTMLElement): GrainientScene {
  const renderer = new Renderer({
    webgl: 2,
    alpha: true,
    antialias: false,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
  });
  const canvas = renderer.gl.canvas;
  canvas.style.display = "block";
  container.appendChild(canvas);
  const uniforms = createGrainientUniforms();
  const program = new Program(renderer.gl, {
    vertex: grainientVertex,
    fragment: grainientFragment,
    uniforms: programUniforms(uniforms),
  });
  const mesh = new Mesh(renderer.gl, {
    geometry: new Triangle(renderer.gl),
    program,
  });
  const scene = { renderer, mesh, canvas, uniforms };
  saveGrainientScene(container, scene);
  return scene;
}

function programUniforms(uniforms: GrainientUniforms): Record<string, { value: number | Float32Array }> {
  return { ...uniforms };
}

function watchGrainientSize(container: HTMLElement, scene: GrainientScene): () => void {
  const update = () => resizeGrainient(container, scene);
  const observer = new ResizeObserver(update);
  observer.observe(container);
  update();
  return () => observer.disconnect();
}

function resizeGrainient(container: HTMLElement, scene: GrainientScene) {
  const rect = container.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  scene.renderer.setSize(width, height);
  const resolution = scene.uniforms.iResolution.value;
  resolution[0] = scene.renderer.gl.drawingBufferWidth;
  resolution[1] = scene.renderer.gl.drawingBufferHeight;
  scene.renderer.render({ scene: scene.mesh });
}

function destroyGrainientScene(container: HTMLElement, scene: GrainientScene) {
  dropGrainientScene(container);
  scene.canvas.remove();
  scene.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
}
