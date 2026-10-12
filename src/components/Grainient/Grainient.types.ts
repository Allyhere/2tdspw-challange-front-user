import type { Mesh } from "ogl";
import type { Renderer } from "ogl";

export type GrainientProps = {
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  lightMode?: boolean;
  className?: string;
};

export type GrainientOptions = {
  timeSpeed: number;
  colorBalance: number;
  warpStrength: number;
  warpFrequency: number;
  warpSpeed: number;
  warpAmplitude: number;
  blendAngle: number;
  blendSoftness: number;
  rotationAmount: number;
  noiseScale: number;
  grainAmount: number;
  grainScale: number;
  grainAnimated: boolean;
  contrast: number;
  gamma: number;
  saturation: number;
  centerX: number;
  centerY: number;
  zoom: number;
  color1: string;
  color2: string;
  color3: string;
  lightMode: boolean;
};

type FloatUniform = { value: number };
type VecUniform = { value: Float32Array };

export type GrainientUniforms = {
  iTime: FloatUniform;
  iResolution: VecUniform;
  uTimeSpeed: FloatUniform;
  uColorBalance: FloatUniform;
  uWarpStrength: FloatUniform;
  uWarpFrequency: FloatUniform;
  uWarpSpeed: FloatUniform;
  uWarpAmplitude: FloatUniform;
  uBlendAngle: FloatUniform;
  uBlendSoftness: FloatUniform;
  uRotationAmount: FloatUniform;
  uNoiseScale: FloatUniform;
  uGrainAmount: FloatUniform;
  uGrainScale: FloatUniform;
  uGrainAnimated: FloatUniform;
  uContrast: FloatUniform;
  uGamma: FloatUniform;
  uSaturation: FloatUniform;
  uCenterOffset: VecUniform;
  uZoom: FloatUniform;
  uColor1: VecUniform;
  uColor2: VecUniform;
  uColor3: VecUniform;
  uLightMode: FloatUniform;
};

export type GrainientScene = {
  renderer: Renderer;
  mesh: Mesh;
  canvas: HTMLCanvasElement;
  uniforms: GrainientUniforms;
};

export type GrainientPlayback = {
  raf: number;
  visible: boolean;
  pageVisible: boolean;
  start: number;
};
