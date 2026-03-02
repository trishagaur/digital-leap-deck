/**
 * FloatingScrollCard
 *
 * Cards slide in from an edge as their section scrolls to the viewport centre.
 * The section itself uses min-h-[140vh] so there is enough scroll room for a
 * slow, graceful animation that the user watches happen — not a flash.
 *
 * Timing (offset: ["start end", "end start"]  →  0 = bottom of viewport, 1 = top):
 *   0.00 → entryStart : card waits off-screen (section still entering from below)
 *   entryStart → entryEnd : slow glide into resting position  (28 % of range)
 *   entryEnd   → 0.72    : card rests (user is reading the section)
 *   0.72       → 0.88    : card exits off-screen as section scrolls out
 *
 * entryStart = 0.28 + stagger so the header is already settled before cards start.
 * Travel = 700 px — visible glide, not an off-screen sprint.
 */
import { type MotionValue, motion, useTransform } from "framer-motion";
import { type ReactNode } from "react";

export type Direction = "left" | "right" | "bottom";

interface FloatingScrollCardProps {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  direction?: Direction;
  /** px card travels. Default 700. */
  travel?: number;
  className?: string;
  /** Stagger index: 0 = header, 1 = first card, 2 = second, … */
  stagger?: number;
}

const DIR: Record<Direction, [number, number, number, number]> = {
  left:   [-1,  0,  1,  0],
  right:  [ 1,  0, -1,  0],
  bottom: [ 0,  1,  0, -1],
};

export const FloatingScrollCard = ({
  children,
  scrollYProgress,
  direction = "left",
  travel = 700,
  className = "",
  stagger = 0,
}: FloatingScrollCardProps) => {
  const [fdx, fdy, tdx, tdy] = DIR[direction];
  const fromX = fdx * travel;
  const fromY = fdy * travel;
  const toX   = tdx * travel;
  const toY   = tdy * travel;

  // For a 130vh section with offset ["start end","end start"], total scroll range = 230vh.
  // The section header (top of content) reaches the viewport top at progress ≈ 100/230 = 0.435.
  // We need ALL cards to finish entering BEFORE that point so nothing is still sliding
  // when the header is at the top.
  //
  // stagger=0 → entry 0.05→0.27   (header arrives first)
  // stagger=1 → entry 0.075→0.295
  // stagger=5 → entry 0.175→0.395  (last card settles at 0.395 < 0.435 ✓)
  //
  // exitStart=0.72 gives a 0.325 dwell (≈75vh reading room) before anything leaves.
  const entryStart = 0.05 + stagger * 0.025;
  const entryEnd   = entryStart + 0.22;          // 22 % window — graceful but early
  const exitStart  = 0.72;
  const exitEnd    = 0.90;

  const x = useTransform(
    scrollYProgress,
    [0, entryStart, entryEnd, exitStart, exitEnd, 1],
    [fromX, fromX, 0, 0, toX, toX],
  );
  const y = useTransform(
    scrollYProgress,
    [0, entryStart, entryEnd, exitStart, exitEnd, 1],
    [fromY, fromY, 0, 0, toY, toY],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, entryStart, Math.min(entryStart + 0.12, entryEnd), exitStart, exitEnd, 1],
    [0, 0, 1, 1, 0, 0],
  );

  return (
    <motion.div className={className} style={{ x, y, opacity }}>
      {children}
    </motion.div>
  );
};
