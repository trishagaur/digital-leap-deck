/**
 * FloatingScrollIcon
 *
 * Icons fly in from far off-screen as the section scrolls into view.
 * Uses RAW scrollYProgress (no spring) so the full travel distance is always
 * covered — a spring that is too slow/heavy kills the visible movement.
 *
 * Scroll path (4 keyframes):
 *   0   → 0.38  : icon travels from far off-screen corner to settled position
 *   0.38→ 0.62  : icon rests at settled position (idle float loop visible)
 *   0.62→ 1     : icon travels back off-screen to opposite corner
 *
 * OUTER wrapper   → scroll-driven style (x/y/rotate/scale/opacity)
 * INNER wrapper   → idle CSS float loop via animate (no x/y conflict)
 */
import { type MotionValue, motion, useTransform } from "framer-motion";
import { type ComponentType } from "react";

export type FloatingIconDef = {
  icon: ComponentType<{ className?: string }>;
  /** Tailwind absolute-positioning classes */
  className: string;
  /** Entry origin — far off-screen, e.g. { x: -1400, y: -900, rotate: -38 } */
  from: { x: number; y: number; rotate: number };
  /** Exit destination — opposite corner */
  to: { x: number; y: number; rotate: number };
  /** Tailwind size classes, e.g. "w-16 h-16" */
  size?: string;
  /** Idle drift loop duration in seconds — keep 60+ for a barely-there float */
  loopDuration?: number;
};

export const FloatingScrollIcon = ({
  icon: Icon,
  className,
  from,
  to,
  scrollYProgress,        // raw, NO spring — spring kills travel distance
  size = "w-16 h-16",
  loopDuration = 65,
}: FloatingIconDef & { scrollYProgress: MotionValue<number> }) => {

  // Enter 0→0.38, hold 0.38→0.62, exit 0.62→1
  const x      = useTransform(scrollYProgress, [0, 0.38, 0.62, 1], [from.x,  0,  0, to.x]);
  const y      = useTransform(scrollYProgress, [0, 0.38, 0.62, 1], [from.y,  0,  0, to.y]);
  const rotate = useTransform(scrollYProgress, [0, 0.38, 0.62, 1], [from.rotate, 0, 0, to.rotate]);
  const scale  = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.3, 1.0, 1.08, 1.0, 0.35]);
  // Fade in quickly once entering, stay opaque through the hold, fade out on exit
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.32, 0.68, 0.90, 1],
    [0,  0.45, 0.50,  0.50,  0.45, 0],
  );

  return (
    /* OUTER: only scroll-driven MotionValues here */
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{ x, y, rotate, scale, opacity }}
    >
      {/* INNER: only idle animate here — zero x/y conflict with outer style */}
      <motion.div
        animate={{
          x: [0, 3, -2, 2, -1, 0],
          y: [0, -3, 2, -2, 3, 0],
        }}
        transition={{
          duration: loopDuration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div
          className={`${size} rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-xl flex items-center justify-center shadow-[0_8px_40px_hsl(var(--primary)/0.22)]`}
        >
          <Icon className="w-[42%] h-[42%] text-primary/60" />
        </div>
      </motion.div>
    </motion.div>
  );
};
