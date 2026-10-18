import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";

import {
  DEFAULT_SPARKLE_COLORS,
  DEFAULT_SPARKLES_COUNT,
  SPARKLE_ANIMATION_DURATION,
  SPARKLE_LIFESPAN_STEP,
  SPARKLE_MARK_SIZE,
  SPARKLE_PATH,
  SPARKLE_ROTATION,
  SPARKLE_TICK_MS,
} from "@/components/SparklesText/SparklesText.constants";
import type { Sparkle, SparkleColors, SparklesTextProps } from "@/components/SparklesText/SparklesText.types";
import { cn } from "@/utils/cn";

export function SparklesText({
  children,
  colors = DEFAULT_SPARKLE_COLORS,
  className,
  sparklesCount = DEFAULT_SPARKLES_COUNT,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>(() =>
    Array.from({ length: sparklesCount }, () => makeSparkle(colors.first, colors.second)),
  );

  useEffect(() => {
    const spawn = () => makeSparkle(colors.first, colors.second);
    const interval = setInterval(() => {
      setSparkles((current) =>
        current.map((star) =>
          star.lifespan <= 0 ? spawn() : { ...star, lifespan: star.lifespan - SPARKLE_LIFESPAN_STEP },
        ),
      );
    }, SPARKLE_TICK_MS);
    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <div className={cn("inline", className)} style={sparkleVars(colors)}>
        <span className="relative z-0 inline-block">
        {sparkles.map((sparkle) => (
          <SparkleMark key={sparkle.id} {...sparkle} />
        ))}
        <strong>{children}</strong>
      </span>
    </div>
  );
}

function SparkleMark({ id, x, y, color, delay, scale }: Sparkle) {
  return (
    <motion.svg
      key={id}
      className="pointer-events-none absolute z-20"
      initial={{ opacity: 0, left: x, top: y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [...SPARKLE_ROTATION],
      }}
      transition={{ duration: SPARKLE_ANIMATION_DURATION, repeat: Infinity, delay }}
      width={SPARKLE_MARK_SIZE}
      height={SPARKLE_MARK_SIZE}
      viewBox={`0 0 ${SPARKLE_MARK_SIZE} ${SPARKLE_MARK_SIZE}`}
    >
      <path d={SPARKLE_PATH} fill={color} />
    </motion.svg>
  );
}

function makeSparkle(first: string, second: string): Sparkle {
  const x = `${Math.random() * 100}%`;
  const y = `${Math.random() * 100}%`;
  return {
    id: `${x}-${y}-${Date.now()}`,
    x,
    y,
    color: Math.random() > 0.5 ? first : second,
    delay: Math.random() * 2,
    scale: Math.random() + 0.3,
    lifespan: Math.random() * 10 + 5,
  };
}

function sparkleVars(colors: SparkleColors): CSSProperties {
  return {
    "--sparkles-first-color": colors.first,
    "--sparkles-second-color": colors.second,
  } as CSSProperties;
}
