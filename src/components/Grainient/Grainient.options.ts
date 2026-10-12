import type {
  GrainientOptions,
  GrainientProps,
} from "@/components/Grainient/Grainient.types";

const HEX_COLOR = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export function resolveGrainientOptions(props: GrainientProps): GrainientOptions {
  return {
    timeSpeed: props.timeSpeed ?? 0.25,
    colorBalance: props.colorBalance ?? 0,
    warpStrength: props.warpStrength ?? 1,
    warpFrequency: props.warpFrequency ?? 5,
    warpSpeed: props.warpSpeed ?? 2,
    warpAmplitude: props.warpAmplitude ?? 50,
    blendAngle: props.blendAngle ?? 0,
    blendSoftness: props.blendSoftness ?? 0.05,
    rotationAmount: props.rotationAmount ?? 500,
    noiseScale: props.noiseScale ?? 2,
    grainAmount: props.grainAmount ?? 0.1,
    grainScale: props.grainScale ?? 2,
    grainAnimated: props.grainAnimated ?? false,
    contrast: props.contrast ?? 1.5,
    gamma: props.gamma ?? 1,
    saturation: props.saturation ?? 1,
    centerX: props.centerX ?? 0,
    centerY: props.centerY ?? 0,
    zoom: props.zoom ?? 0.9,
    color1: props.color1 ?? "#FF9FFC",
    color2: props.color2 ?? "#5227FF",
    color3: props.color3 ?? "#B497CF",
    lightMode: props.lightMode ?? false,
  };
}

export function hexToRgb(hex: string): [number, number, number] {
  const match = HEX_COLOR.exec(hex);
  if (!match) return [1, 1, 1];
  return [hexChannel(match[1]), hexChannel(match[2]), hexChannel(match[3])];
}

function hexChannel(value: string | undefined): number {
  return Number.parseInt(value ?? "ff", 16) / 255;
}
