/**
 * FloatingScrollCard
 *
 * Wraps any card content so it slides in from the edge of the viewport
 * as the section scrolls into view — driven by raw scrollYProgress.
 *
 * Scroll path (4 keyframes — mirrors FloatingScrollIcon):
 *   0    → 0.20  : card travels from off-screen edge to settled position
 *   0.20 → 0.80  : card rests in place (users reads the content)
 *   0.80 → 1     : card travels back off-screen as section leaves view
 *
 * "from" direction options:
 *   left  — enters from the left edge  (x: -vw, y: 0)
 *   right — enters from the right edge (x: +vw, y: 0)
 *   bottom — enters from the bottom    (x: 0,  y: +vh)
 *
 * Speed feel is controlled purely by the travel distance — because the
 * card moves that many pixels across the full 0→0.20 range of scroll,
 * increasing the distance makes it feel *slower* (more px per 1% scroll).
 * Default travel: 1 800 px so cards crawl on-screen over a long scroll.
 */
import { type MotionValue, motion, useTransform } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "left" | "right" | "bottom";

interface FloatingScrollCardProps {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  /** Which edge the card enters from */
  direction?: Direction;
  /** How many px the card travels — bigger = slower apparent movement */
  travel?: number;
  /** Extra Tailwind / style classes for the wrapper */
  className?: string;
  /** Stagger delay in seconds (0 → no delay) */
  delay?: number;
}

const directionDefaults: Record<Direction, { fromX: number; fromY: number; toX: number; toY: number }> = {
  left:   { fromX: -1800, fromY:   0, toX:  1800, toY:    0 },
  right:  { fromX:  1800, fromY:   0, toX: -1800, toY:    0 },
  bottom: { fromX:     0, fromY: 1800, toX:     0, toY: -1800 },
};

export const FloatingScrollCard = ({
  children,
  scrollYProgress,
  direction = "left",
  travel,
  className = "",
  delay = 0,
}: FloatingScrollCardProps) => {
  const defaults = directionDefaults[direction];
  const scale = travel ? travel / 1800 : 1;

  const fromX = defaults.fromX * scale;
  const fromY = defaults.fromY * scale;
  const toX   = defaults.toX   * scale;
  const toY   = defaults.toY   * scale;

  // With delay: shift the entry window forward so staggered cards each enter a
  // little later in the scroll range (0.04 per card feels like a natural cascade).
  const entryStart  = Math.min(0.02 + delay, 0.20);
  const entryEnd    = Math.min(entryStart + 0.20, 0.45);
  const exitStart   = 0.72;
  const exitEnd     = 0.92;

  const x = useTransform(
    scrollYProgress,
    [0, entryStart, entryEnd, exitStart, exitEnd, 1],
    [fromX, fromX * 0.6, 0, 0, toX * 0.6, toX],
  );
  const y = useTransform(
    scrollYProgress,
    [0, entryStart, entryEnd, exitStart, exitEnd, 1],
    [fromY, fromY * 0.6, 0, 0, toY * 0.6, toY],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, entryStart, entryEnd, exitStart, exitEnd, 1],
    [0, 0, 1, 1, 0, 0],
  );

  return (
    <motion.div
      className={className}
      style={{ x, y, opacity }}
    >
      {children}
    </motion.div>
  );
};
