import type { GrainientUniforms } from "@/components/Grainient/Grainient.types";

export function createGrainientUniforms(): GrainientUniforms {
  return {
    iTime: { value: 0 },
    iResolution: { value: new Float32Array([1, 1]) },
    uTimeSpeed: { value: 0.25 },
    uColorBalance: { value: 0 },
    uWarpStrength: { value: 1 },
    uWarpFrequency: { value: 5 },
    uWarpSpeed: { value: 2 },
    uWarpAmplitude: { value: 50 },
    uBlendAngle: { value: 0 },
    uBlendSoftness: { value: 0.05 },
    uRotationAmount: { value: 500 },
    uNoiseScale: { value: 2 },
    uGrainAmount: { value: 0.1 },
    uGrainScale: { value: 2 },
    uGrainAnimated: { value: 0 },
    uContrast: { value: 1.5 },
    uGamma: { value: 1 },
    uSaturation: { value: 1 },
    uCenterOffset: { value: new Float32Array([0, 0]) },
    uZoom: { value: 0.9 },
    uColor1: { value: new Float32Array([1, 1, 1]) },
    uColor2: { value: new Float32Array([1, 1, 1]) },
    uColor3: { value: new Float32Array([1, 1, 1]) },
    uLightMode: { value: 0 },
  };
}
