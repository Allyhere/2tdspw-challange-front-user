import { hexToRgb } from "@/components/Grainient/Grainient.options";
import { readGrainientScene } from "@/components/Grainient/Grainient.store";
import type {
  GrainientOptions,
  GrainientUniforms,
} from "@/components/Grainient/Grainient.types";

let rememberedOptions: GrainientOptions | null = null;

export function syncGrainient(container: HTMLElement, options: GrainientOptions) {
  rememberedOptions = options;
  paintGrainient(container, options);
}

export function syncRememberedGrainient(container: HTMLElement) {
  if (!rememberedOptions) return;
  paintGrainient(container, rememberedOptions);
}

function paintGrainient(container: HTMLElement, options: GrainientOptions) {
  const scene = readGrainientScene(container);
  if (!scene) return;
  applyGrainientOptions(scene.uniforms, options);
}

function applyGrainientOptions(uniforms: GrainientUniforms, options: GrainientOptions) {
  uniforms.uTimeSpeed.value = options.timeSpeed;
  uniforms.uColorBalance.value = options.colorBalance;
  uniforms.uWarpStrength.value = options.warpStrength;
  uniforms.uWarpFrequency.value = options.warpFrequency;
  uniforms.uWarpSpeed.value = options.warpSpeed;
  uniforms.uWarpAmplitude.value = options.warpAmplitude;
  uniforms.uBlendAngle.value = options.blendAngle;
  uniforms.uBlendSoftness.value = options.blendSoftness;
  uniforms.uRotationAmount.value = options.rotationAmount;
  uniforms.uNoiseScale.value = options.noiseScale;
  uniforms.uGrainAmount.value = options.grainAmount;
  uniforms.uGrainScale.value = options.grainScale;
  uniforms.uGrainAnimated.value = options.grainAnimated ? 1 : 0;
  uniforms.uContrast.value = options.contrast;
  uniforms.uGamma.value = options.gamma;
  uniforms.uSaturation.value = options.saturation;
  uniforms.uZoom.value = options.zoom;
  uniforms.uLightMode.value = options.lightMode ? 1 : 0;
  writeOffset(uniforms.uCenterOffset.value, options.centerX, options.centerY);
  writeRgb(uniforms.uColor1.value, options.color1);
  writeRgb(uniforms.uColor2.value, options.color2);
  writeRgb(uniforms.uColor3.value, options.color3);
}

function writeOffset(target: Float32Array, x: number, y: number) {
  target[0] = x;
  target[1] = y;
}

function writeRgb(target: Float32Array, hex: string) {
  const [red, green, blue] = hexToRgb(hex);
  target[0] = red;
  target[1] = green;
  target[2] = blue;
}
