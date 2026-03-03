/**
 * SuperwhisperTestimonials v2
 *
 * Light theme — matches the rest of the site exactly.
 * 8 testimonials (5 real + 3 placeholders ready to fill in).
 * 5-card visible stack: 1 active + 4 ghost cards always showing.
 *
 * "Fly to front" effect:
 *   All 8 cards are rendered simultaneously as absolute divs.
 *   Each card's transform (rotate, x, y, scale, opacity) is driven by its
 *   current rank = (id − activeId + n) % n.
 *   Clicking a card snaps its zIndex to 50 INSTANTLY (Framer Motion does not
 *   interpolate zIndex), then spring-animates position from ghost coords to
 *   rank-0. That is the "card flying out of the stack" effect.
 *
 * Image support:
 *   Set avatarUrl on any testimonial to show a circular headshot photo.
 *   Leave it undefined to use the gradient-initials fallback.
 */
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

const AUTOPLAY_MS = 9000;
const CARD_H = 340; // px — every card in the stack has this fixed height

// ── Stack positions ─────────────────────────────────────────────────────────
// rank 0 = active (front)  |  ranks 1–4 = ghost cards  |  rank ≥ 5 = hidden
// Large CCW rotation + left/down offset gives a clearly visible fanned deck.
// The generous offsets mean each rank-transition animates across a long arc,
// giving the "card sweeping out of the pile" feel.
const STACK = [
  { rotate: 0,   x: 0,    y: 0,   scale: 1,    opacity: 1,    zIndex: 50 },
  { rotate: -5,  x: -30,  y: 28,  scale: 0.96, opacity: 0.82, zIndex: 40 },
  { rotate: -9,  x: -60,  y: 56,  scale: 0.91, opacity: 0.62, zIndex: 30 },
  { rotate: -13, x: -90,  y: 84,  scale: 0.86, opacity: 0.44, zIndex: 20 },
  { rotate: -17, x: -120, y: 112, scale: 0.81, opacity: 0.26, zIndex: 10 },
];
// Cards ranked ≥ 5 sit well off-screen — they sweep through this position
// on their way to/from the active slot, creating the "orbit" arc.
const HIDDEN_POS = { rotate: -22, x: -155, y: 145, scale: 0.76, opacity: 0, zIndex: 5 };

const getRank = (id: number, activeId: number, n: number) =>
  (id - activeId + n) % n;

const getPos = (rank: number) =>
  rank < STACK.length ? STACK[rank] : HIDDEN_POS;

// ── Testimonials data ────────────────────────────────────────────────────────
// To add a person photo: set avatarUrl to any https:// image URL.
// Entries id 5–7 are placeholders — fill in real content when ready.
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  initials: string;
  c1: string;
  c2: string;
  avatarUrl?: string;
  placeholder?: boolean;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 0,
    name: "James Harrington",
    role: "Chief Executive Officer",
    company: "Regional Pension Trust",
    initials: "JH",
    c1: "#3b82f6",
    c2: "#6366f1",
    quote:
      "This team redefined what’s possible in retirement technology. The speed, the quality, the innovation — in 12 months they delivered what most organisations take 4 years to achieve. A genuine benchmark for the industry.",
  },
  {
    id: 1,
    name: "Priya Sharma",
    role: "Head of Digital Experience",
    company: "RetireWell Group",
    initials: "PS",
    c1: "#8b5cf6",
    c2: "#a855f7",
    quote:
      "I’ve worked with engineering teams across three continents. The culture of delivery and psychological safety this team built is genuinely rare. They don’t just ship features — they elevate everyone around them.",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Chief Risk Officer",
    company: "Ascent Superannuation",
    initials: "DC",
    c1: "#10b981",
    c2: "#059669",
    quote:
      "A 26-point reduction in ineligible starts while growing completions 4.5×? I didn’t think both were simultaneously achievable. This team proved me wrong — and I’m genuinely grateful they did.",
  },
  {
    id: 3,
    name: "Claire Beaumont",
    role: "VP of Operations",
    company: "Heritage Financial",
    initials: "CB",
    c1: "#f43f5e",
    c2: "#ec4899",
    quote:
      "The ‘Innovation Island’ award was no surprise to those who worked alongside them daily. Their AI-first methodology and clean architecture have become the gold standard across our entire group.",
  },
  {
    id: 4,
    name: "Marcus Webb",
    role: "Director of Compliance",
    company: "Summit Retirement",
    initials: "MW",
    c1: "#f59e0b",
    c2: "#f97316",
    quote:
      "Making compliance invisible to the member while remaining airtight from a regulatory standpoint is an art form. This team nailed it — and delivered a customer experience that genuinely delights.",
  },
  {
    id: 5,
    name: "Sarah Mitchell",
    role: "Chief Digital Officer",
    company: "Pinnacle Super",
    initials: "SM",
    c1: "#0ea5e9",
    c2: "#06b6d4",
    quote:
      "What struck me most wasn't just the speed — it was the quality of thinking at every level. They didn't build features; they built a platform that can evolve with the industry. That kind of foresight is extraordinarily rare.",
  },
  {
    id: 6,
    name: "Robert Tan",
    role: "Head of Engineering",
    company: "Apex Retirement",
    initials: "RT",
    c1: "#84cc16",
    c2: "#22c55e",
    quote:
      "Handing over a deeply complex legacy system to any team is a leap of faith. This team not only caught it — they rebuilt it better. The test coverage, the documentation, the architecture decisions were all best-in-class.",
  },
  {
    id: 7,
    name: "Lisa Park",
    role: "Director of Member Services",
    company: "Horizon Fund",
    initials: "LP",
    c1: "#a78bfa",
    c2: "#818cf8",
    quote:
      "Member NPS jumped 34 points within six months of the new experience going live. Contact centre volume dropped 22%. Those two numbers tell the whole story — this team made members genuinely happier.",
  },
];

// ── Avatar ───────────────────────────────────────────────────────────────────
// Shows a circular photo when avatarUrl is provided; otherwise renders a
// gradient circle with the person’s initials.
const Avatar = ({
  name,
  initials,
  c1,
  c2,
  avatarUrl,
  size = 44,
}: {
  name: string;
  initials: string;
  c1: string;
  c2: string;
  avatarUrl?: string;
  size?: number;
}) => {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ring-2 ring-white/80 shadow-sm"
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * 0.32),
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        boxShadow: `0 4px 14px ${c1}40`,
      }}
    >
      {initials}
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
const SuperwhisperTestimonials = () => {
  const [activeId, setActiveId] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const n = testimonials.length;

  // Autoplay: advance every AUTOPLAY_MS ms unless paused or reduced-motion
  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(() => setActiveId((p) => (p + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion, n]);

  const select = (id: number) => {
    if (id === activeId) return;
    setActiveId(id);
    // Pause autoplay for two cycles after a manual selection
    setPaused(true);
    setTimeout(() => setPaused(false), AUTOPLAY_MS * 2);
  };

  const active = testimonials[activeId];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Subtle gradient background — matches other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-secondary/20" />

      <div className="section-container relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-overline">What people say</span>
          <h2 className="section-title">Loved by those who matter</h2>
        </div>

        {/* Two-column body */}
        <div className="flex flex-col lg:flex-row items-start gap-14 max-w-5xl mx-auto">

          {/* ═══ LEFT: stacked card deck ═══ */}
          <div
            className="w-full lg:w-[58%] flex-shrink-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/*
              Container sizing:
                height  = CARD_H + max-ghost-y(40) + buffer(20) = CARD_H + 60
                marginLeft = max-ghost-x(29) + buffer(3) = 32
              overflow: visible lets rotated ghost-card edges peek outside.
            */}
            <div
              className="relative"
              style={{ height: CARD_H + 145, marginLeft: 124, overflow: "visible" }}
            >
              {testimonials.map((t) => {
                const rank = getRank(t.id, activeId, n);
                const pos = getPos(rank);
                const isActive = rank === 0;

                return (
                  <motion.div
                    key={t.id}
                    className="absolute"
                    style={{
                      top: 0,
                      left: 0,
                      right: 0,
                      height: CARD_H,
                      cursor: isActive ? "default" : "pointer",
                    }}
                    animate={pos}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            // Slow, weighty spring — card sweeps a long arc
                            rotate: {
                              type: "spring",
                              stiffness: 75,
                              damping: 14,
                              mass: 2.0,
                            },
                            x: {
                              type: "spring",
                              stiffness: 75,
                              damping: 14,
                              mass: 2.0,
                            },
                            y: {
                              type: "spring",
                              stiffness: 75,
                              damping: 14,
                              mass: 2.0,
                            },
                            scale: {
                              type: "spring",
                              stiffness: 75,
                              damping: 14,
                              mass: 2.0,
                            },
                            // Opacity follows a slower fade
                            opacity: { duration: 0.5, ease: "easeOut" },
                            // zIndex snaps instantly — clicked card appears on
                            // top IMMEDIATELY, then springs into position
                            zIndex: { duration: 0 },
                          }
                    }
                    onClick={isActive ? undefined : () => select(t.id)}
                  >
                    <div
                      className={[
                        "w-full h-full rounded-2xl flex flex-col overflow-hidden",
                        isActive
                          ? "glass-panel"
                          : "bg-white border border-border/70",
                      ].join(" ")}
                      style={
                        !isActive
                          ? { boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)" }
                          : isActive
                          ? { boxShadow: `0 20px 60px ${active.c1}1a, 0 4px 20px rgba(0,0,0,0.07)` }
                          : undefined
                      }

                    >
                      {/* Card header: avatar + name/role */}
                      <div className="flex items-center gap-3 px-6 py-4 border-b border-border/40 flex-shrink-0">
                        <Avatar
                          name={t.name}
                          initials={t.initials}
                          c1={t.c1}
                          c2={t.c2}
                          avatarUrl={t.avatarUrl}
                          size={44}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground leading-snug">
                            {t.name}
                          </p>
                          <p className="text-xs text-muted-foreground leading-snug mt-0.5 truncate">
                            {t.role}
                            <span className="mx-1.5">·</span>
                            <span className="font-medium" style={{ color: t.c1 }}>
                              {t.company}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Quote body */}
                      <div className="flex-1 px-6 py-5 overflow-hidden">
                        <Quote
                          className="w-6 h-6 mb-3 flex-shrink-0"
                          style={{ color: `${t.c1}55` }}
                        />
                        <p className="text-sm leading-relaxed line-clamp-6 text-foreground/80">
                          “{t.quote}”
                        </p>
                      </div>

                      {/* Progress bar — active card only */}
                      {isActive && (
                        <div className="px-6 pb-4 flex-shrink-0">
                          <div className="h-[3px] rounded-full bg-border/50 overflow-hidden">
                            <motion.div
                              key={activeId}
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${active.c1}, ${active.c2})`,
                              }}
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: AUTOPLAY_MS / 1000,
                                ease: "linear",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground/40 mt-4 ml-2 select-none">
              Click any card in the stack to bring it forward
            </p>
          </div>

          {/* ═══ RIGHT: name sidebar ═══ */}
          <div className="w-full lg:w-[42%] pt-1">
            <div className="mb-5">
              <p className="text-base font-bold text-foreground tracking-tight">
                Testimonies
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Leaders who’ve seen it first-hand
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {testimonials.map((t) => {
                const isActive = t.id === activeId;
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => select(t.id)}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={[
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-left w-full transition-colors duration-200",
                      isActive
                        ? "bg-primary/10 border border-primary/15"
                        : "border border-transparent hover:bg-secondary/80",
                    ].join(" ")}
                  >
                    <Avatar
                      name={t.name}
                      initials={t.initials}
                      c1={t.c1}
                      c2={t.c2}
                      avatarUrl={t.avatarUrl}
                      size={36}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-semibold leading-snug ${
                          isActive ? "text-foreground" : "text-foreground/55"
                        }`}
                      >
                        {t.name}
                      </p>
                      <p className="text-[11px] leading-snug mt-0.5 text-muted-foreground truncate">
                        {t.role}
                        {" · "}
                        <span style={{ color: isActive ? t.c1 : undefined }}>
                          {t.company}
                        </span>
                      </p>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="sw-v2-dot"
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: active.c1 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Pill dot indicators */}
            <div className="flex items-center gap-2 mt-6 px-4 flex-wrap">
              {testimonials.map((t) => (
                <button
                  key={t.id}
                  onClick={() => select(t.id)}
                  aria-label={`View ${t.name}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: t.id === activeId ? 22 : 6,
                    height: 6,
                    background:
                      t.id === activeId
                        ? `linear-gradient(90deg, ${active.c1}, ${active.c2})`
                        : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuperwhisperTestimonials;
