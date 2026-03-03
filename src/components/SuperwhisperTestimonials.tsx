/**
 * SuperwhisperTestimonials
 *
 * Dark-background testimonials section modelled after superwhisper.com:
 * - Deep navy bg with ambient colour glow orbs
 * - Left: stacked card deck — ghost card behind + main card containing
 *   a glassmorphism outer panel (person header + paperclip) and a white
 *   inner "pinned note" card with the actual quote
 * - Right: "Testimonies" sidebar — list of names, active highlighted
 * - Auto-advances every 9 s; pauses on hover / manual selection
 *
 * The original TestimonialsSection.tsx is untouched.
 * To swap back, change the import in Index.tsx.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Paperclip } from "lucide-react";

const AUTOPLAY_MS = 9000;

const testimonials = [
  {
    id: 0,
    name: "James Harrington",
    role: "Chief Executive Officer",
    company: "Regional Pension Trust",
    initials: "JH",
    c1: "#3b82f6",
    c2: "#6366f1",
    quote:
      "This team redefined what's possible in retirement technology. The speed, the quality, the innovation — in 12 months they delivered what most organisations take 4 years to achieve. A genuine benchmark for the industry.",
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
      "I've worked with engineering teams across three continents. The culture of delivery and psychological safety this team built is genuinely rare. They don't just ship features — they elevate everyone around them.",
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
      "A 26-point reduction in ineligible starts while growing completions 4.5×? I didn't think both were simultaneously achievable. This team proved me wrong — and I'm genuinely grateful they did.",
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
      "The 'Innovation Island' award was no surprise to those who worked alongside them daily. Their AI-first methodology and clean architecture have become the gold standard across our entire group.",
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
];

const Avatar = ({
  initials,
  c1,
  c2,
  size = 40,
}: {
  initials: string;
  c1: string;
  c2: string;
  size?: number;
}) => (
  <div
    className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
    style={{
      width: size,
      height: size,
      fontSize: size * 0.3,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      boxShadow: `0 4px 14px ${c1}55`,
    }}
  >
    {initials}
  </div>
);

const SuperwhisperTestimonials = () => {
  const [activeId, setActiveId] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  /* Auto-advance */
  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(() => {
      setDir(1);
      setActiveId((p) => (p + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion]);

  const select = (id: number) => {
    if (id === activeId) return;
    setDir(id > activeId ? 1 : -1);
    setActiveId(id);
    setPaused(true);
    setTimeout(() => setPaused(false), AUTOPLAY_MS * 2);
  };

  const active = testimonials[activeId];

  const cardVariants = {
    enter: (d: number) => ({ y: d * 30, opacity: 0, scale: 0.97 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ y: -d * 30, opacity: 0, scale: 0.97 }),
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-28"
      style={{ background: "linear-gradient(170deg, #08080f 0%, #0d0d1a 60%, #08080f 100%)" }}
    >
      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "-20%",
            left: "-12%",
            background: "radial-gradient(circle, #6366f1 0%, transparent 65%)",
            opacity: 0.09,
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: "-15%",
            right: "-10%",
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 65%)",
            opacity: 0.08,
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: "35%",
            right: "28%",
            background: "radial-gradient(circle, #10b981 0%, transparent 65%)",
            opacity: 0.05,
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="section-container relative">
        {/* ── Section header ── */}
        <div className="text-center mb-20">
          <span
            className="text-xs font-bold tracking-[0.22em] uppercase"
            style={{ color: "#f472b6" }}
          >
            What people say
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Loved by those who matter
          </h2>
        </div>

        {/* ── Body: left card + right sidebar ── */}
        <div className="flex flex-col lg:flex-row items-start gap-14 max-w-5xl mx-auto">

          {/* ════ LEFT: stacked card deck ════ */}
          <div
            className="w-full lg:w-[58%] flex-shrink-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Relative container — sets the stacking context */}
            <div className="relative" style={{ minHeight: 360 }}>

              {/* Ghost card #2 — furthest back */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transform: "rotate(-4.5deg) translateY(18px) translateX(-10px)",
                }}
              />
              {/* Ghost card #1 */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transform: "rotate(-2.5deg) translateY(9px) translateX(-5px)",
                }}
              />

              {/* ── Active card (animated) ── */}
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={activeId}
                  custom={dir}
                  variants={reduceMotion ? {} : cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.05) 100%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
                  }}
                >
                  {/* Card header: avatar + name/role + paperclip */}
                  <div className="flex items-center gap-3.5 px-6 pt-6 pb-3">
                    <Avatar initials={active.initials} c1={active.c1} c2={active.c2} size={44} />
                    <div>
                      <p className="text-white font-semibold text-sm leading-snug">
                        {active.name}
                      </p>
                      <p className="text-white/40 text-xs leading-snug mt-0.5">
                        {active.role}
                        <span className="mx-1.5 text-white/20">·</span>
                        <span className="text-white/65">{active.company}</span>
                      </p>
                    </div>
                    {/* Paperclip decoration — right edge, at the card seam */}
                    <div className="ml-auto flex-shrink-0 text-white/20 rotate-45 translate-y-5">
                      <Paperclip className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Inner white "pinned note" card */}
                  <div className="px-4 pb-5">
                    <div
                      className="bg-white rounded-xl shadow-2xl overflow-hidden"
                      style={{ transform: "rotate(0.8deg)" }}
                    >
                      {/* Mini header inside the white card */}
                      <div
                        className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100/80"
                      >
                        <Avatar
                          initials={active.initials}
                          c1={active.c1}
                          c2={active.c2}
                          size={30}
                        />
                        <div>
                          <p className="text-gray-900 font-semibold text-xs leading-snug">
                            {active.name}
                          </p>
                          <p
                            className="text-xs leading-snug font-medium"
                            style={{ color: active.c1 }}
                          >
                            {active.company}
                          </p>
                        </div>
                      </div>

                      {/* Quote body */}
                      <div className="px-5 py-4">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          &ldquo;{active.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="px-4 pb-4">
                    <div
                      className="h-[2px] rounded-full w-full"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <motion.div
                        key={`${activeId}-bar`}
                        className="h-[2px] rounded-full"
                        style={{ background: `linear-gradient(90deg, ${active.c1}, ${active.c2})` }}
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ════ RIGHT: testimonies sidebar ════ */}
          <div className="w-full lg:w-[42%] pt-2">
            <div className="mb-7">
              <p className="text-white text-xl font-bold tracking-tight">Testimonies</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                Leaders who've seen it first-hand
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
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-200 w-full"
                    style={
                      isActive
                        ? {
                            background: "rgba(255,255,255,0.10)",
                            border: "1px solid rgba(255,255,255,0.14)",
                          }
                        : {
                            background: "transparent",
                            border: "1px solid transparent",
                          }
                    }
                  >
                    <Avatar initials={t.initials} c1={t.c1} c2={t.c2} size={36} />
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-sm font-semibold leading-snug"
                        style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-[11px] leading-snug mt-0.5" style={{ color: "rgba(255,255,255,0.32)" }}>
                        {t.role}
                        {" "}
                        <span style={{ color: isActive ? t.c1 : "rgba(255,255,255,0.45)" }}>
                          {t.company}
                        </span>
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="sw-active-dot"
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: active.c1 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 mt-8 px-4">
              {testimonials.map((t) => (
                <button
                  key={t.id}
                  onClick={() => select(t.id)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: t.id === activeId ? 24 : 6,
                    height: 6,
                    background:
                      t.id === activeId
                        ? `linear-gradient(90deg, ${active.c1}, ${active.c2})`
                        : "rgba(255,255,255,0.18)",
                  }}
                  aria-label={`View ${t.name}`}
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
