import type {
  GrainientPlayback,
  GrainientScene,
} from "@/components/Grainient/Grainient.types";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function startGrainientLoop(
  container: HTMLElement,
  scene: GrainientScene,
): () => void {
  const motion = window.matchMedia(REDUCED_MOTION);
  const clock: GrainientPlayback = {
    raf: 0,
    visible: true,
    pageVisible: !document.hidden,
    start: performance.now(),
  };
  const loop = (time: number) => renderGrainientFrame(scene, clock, time);
  const stop = () => stopGrainientPlayback(clock);
  const start = () => startGrainientPlayback(clock, scene, motion, loop);
  const observer = watchGrainientVisibility(container, clock, start, stop);
  const onPage = () => syncPageVisibility(clock, start, stop);
  const onMotion = () => start();
  document.addEventListener("visibilitychange", onPage);
  motion.addEventListener("change", onMotion);
  start();
  return () => releaseGrainientLoop(clock, observer, onPage, motion, onMotion);
}

function renderGrainientFrame(scene: GrainientScene, clock: GrainientPlayback, time: number) {
  scene.uniforms.iTime.value = (time - clock.start) * 0.001;
  scene.renderer.render({ scene: scene.mesh });
  clock.raf = requestAnimationFrame((next) => renderGrainientFrame(scene, clock, next));
}

function stopGrainientPlayback(clock: GrainientPlayback) {
  if (clock.raf === 0) return;
  cancelAnimationFrame(clock.raf);
  clock.raf = 0;
}

function startGrainientPlayback(
  clock: GrainientPlayback,
  scene: GrainientScene,
  motion: MediaQueryList,
  loop: FrameRequestCallback,
) {
  if (motion.matches) {
    stopGrainientPlayback(clock);
    scene.uniforms.iTime.value = 0;
    scene.renderer.render({ scene: scene.mesh });
    return;
  }
  if (!clock.visible || !clock.pageVisible || clock.raf !== 0) return;
  clock.raf = requestAnimationFrame(loop);
}

function watchGrainientVisibility(
  container: HTMLElement,
  clock: GrainientPlayback,
  start: () => void,
  stop: () => void,
): IntersectionObserver {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry) return;
    clock.visible = entry.isIntersecting;
    if (clock.visible) start();
    else stop();
  });
  observer.observe(container);
  return observer;
}

function syncPageVisibility(clock: GrainientPlayback, start: () => void, stop: () => void) {
  clock.pageVisible = !document.hidden;
  if (clock.pageVisible) start();
  else stop();
}

function releaseGrainientLoop(
  clock: GrainientPlayback,
  observer: IntersectionObserver,
  onPage: () => void,
  motion: MediaQueryList,
  onMotion: () => void,
) {
  stopGrainientPlayback(clock);
  observer.disconnect();
  document.removeEventListener("visibilitychange", onPage);
  motion.removeEventListener("change", onMotion);
}
