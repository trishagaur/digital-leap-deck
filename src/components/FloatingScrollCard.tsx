/**
 * FloatingScrollCard
 *
 * Wraps any card content so it slides in from the edge of the viewport
 * as the section scrolls into view — driven by raw scrollYProgress.
 *
 * Timing (with offset: ["start end", "end start"]):
 *   • Cards stay hidden until the section is ~30 % scrolled into view
 *     (i.e. approaching the viewport centre — "waiting for the section")
 *   • Entry spans 26 % of the scroll range → slow, deliberate glide
 *   • Hold zone 0.56 → 0.68 (card fully visible while section is centred)
 *   • Exit spans 0.68 → 0.86
 *
 * Travel distance (default 800 px):
 *   Enough to start just off-screen, so the ENTIRE animation is visible
 *   to the reader — unlike 1 800 px where most movement is off-screen
 *   and makes the visible portion feel fast/abrupt.
 *
 * Direction: left | right | bottom
 *   Cards from the same row use left / bottom / right so they never
 *   need to cross each other's paths.
 */
import { type MotionValue, motion, useTransform } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "left" | "right" | "bottom";

interface FloatingScrollCardProps {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  /** Which edge the card enters from */
  direction?: Direction;
  /** How many px the card travels. Default 800 — fully visible glide. */
  travel?: number;
  /** Extra Tailwind / style classes for the wrapper */
  className?: string;
  /** Stagger offset added to entryStart (capped at 0.10). */
  delay?: number;
}

// Unit direction vectors: [fromX, fromY, toX, toY]
const DIR: Record<Direction, [number, number, number, number]> = {
  left:   [-1,  0,  1,  0],
  right:  [ 1,  0, -1,  0],
  bottom: [ 0,  1,  0, -1],
};

export const FloatingScrollCard = ({
  children,
  scrollYProgress,
  direction = "left",
  travel = 800,
  className = "",
  delay = 0,
}: FloatingScrollCardProps) => {
  const [fdx, fdy, tdx, tdy] = DIR[direction];
  const fromX = fdx * travel;
  const fromY = fdy * travel;
  const toX   = tdx * travel;
  const toY   = tdy * travel;

  // Cards wait until section is ~30% scrolled in (near centre) then glide in
  // over 26% of the scroll range — the wider the window, the slower the feel.
  const d          = Math.min(delay, 0.10);
  const entryStart = 0.30 + d;
  const entryEnd   = entryStart + 0.26;   // max ~0.56
  const exitStart  = 0.68;
  const exitEnd    = 0.86;

  // Card stays at full offset until entryStart, then slides directly to 0
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
  // Fade-in starts halfway through entry so translate + opacity arrive together
  const opacity = useTransform(
    scrollYProgress,
    [0, entryStart, Math.min(entryStart + 0.14, entryEnd), exitStart, exitEnd, 1],
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
