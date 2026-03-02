/**
 * FloatingScrollIcon
 * Scroll-linked parallax icon that flies in from far off-screen as the section
 * enters the viewport, settles at centre, then drifts back out as you scroll past.
 *
 * KEY: scroll transform lives on the OUTER wrapper, idle drift lives on an INNER
 * wrapper — this avoids framer-motion x/y conflicts between `style` MotionValues
 * and `animate` keyframes sharing the same element.
 */
import { type MotionValue, motion, useTransform } from "framer-motion";
import { type ComponentType } from "react";

export type FloatingIconDef = {
  icon: ComponentType<{ className?: string }>;
  /** Tailwind positioning classes, e.g. "left-6 top-12 sm:left-14" */
  className: string;
  /** Where the icon begins (scroll progress = 0) — use large values like ±900 */
  from: { x: number; y: number; rotate: number };
  /** Where the icon exits to (scroll progress = 1) — opposite corner */
  to: { x: number; y: number; rotate: number };
  /** Tailwind size classes for the pill, e.g. "w-16 h-16" */
  size?: string;
  /** Duration (seconds) of the slow idle float loop */
  loopDuration?: number;
};

export const FloatingScrollIcon = ({
  icon: Icon,
  className,
  from,
  to,
  slowScroll,
  size = "w-16 h-16",
  loopDuration = 42,
}: FloatingIconDef & { slowScroll: MotionValue<number> }) => {
  // 3-point scroll path: off-screen → settled → off-screen
  const x      = useTransform(slowScroll, [0, 0.5, 1], [from.x, 0, to.x]);
  const y      = useTransform(slowScroll, [0, 0.5, 1], [from.y, 0, to.y]);
  const rotate = useTransform(slowScroll, [0, 0.5, 1], [from.rotate, 0, to.rotate]);
  const scale  = useTransform(slowScroll, [0, 0.5, 1], [0.35, 1.08, 0.45]);
  const opacity = useTransform(
    slowScroll,
    [0, 0.25, 0.45, 0.55, 0.75, 1],
    [0, 0, 0.78, 0.78, 0, 0],
  );

  return (
    /* Outer: scroll-driven position — only style MotionValues here */
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{ x, y, rotate, scale, opacity }}
    >
      {/* Inner: idle gentle float loop — only animate here, no x/y conflict */}
      <motion.div
        animate={{
          x: [0, 7, -6, 4, 0],
          y: [0, -7, 5, -4, 0],
        }}
        transition={{
          duration: loopDuration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div
          className={`${size} rounded-2xl bg-primary/15 border border-primary/25 backdrop-blur-xl flex items-center justify-center shadow-[0_8px_70px_hsl(var(--primary)/0.38)]`}
        >
          <Icon className="w-[40%] h-[40%] text-primary" />
        </div>
      </motion.div>
    </motion.div>
  );
};
