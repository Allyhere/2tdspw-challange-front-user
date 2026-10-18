import type { ReactNode } from "react";

export type SparkleColors = {
  first: string;
  second: string;
};

export type Sparkle = {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
};

export type SparklesTextProps = {
  className?: string;
  children: ReactNode;
  sparklesCount?: number;
  colors?: SparkleColors;
};
