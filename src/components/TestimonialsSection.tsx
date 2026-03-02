import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Quote } from "lucide-react";
import { FloatingScrollCard } from "./FloatingScrollCard";

const testimonials = [
  {
    id: 0,
    name: "James Harrington",
    role: "Chief Executive Officer",
    company: "Regional Pension Trust",
    initials: "JH",
    gradient: "from-blue-500 to-indigo-500",
    quote:
      "This team redefined what's possible in retirement technology. The speed, the quality, the innovation — in 12 months they delivered what most organisations take 4 years to achieve. A genuine benchmark for the industry.",
  },
  {
    id: 1,
    name: "Priya Sharma",
    role: "Head of Digital Experience",
    company: "RetireWell Group",
    initials: "PS",
    gradient: "from-violet-500 to-purple-500",
    quote:
      "I've worked with engineering teams across three continents. The culture of delivery and psychological safety this team built is genuinely rare. They don't just ship features — they elevate everyone around them.",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Chief Risk Officer",
    company: "Ascent Superannuation",
    initials: "DC",
    gradient: "from-emerald-500 to-teal-500",
    quote:
      "A 26-point reduction in ineligible starts while growing completions 4.5×? I didn't think both were simultaneously achievable. This team proved me wrong — and I'm genuinely grateful they did.",
  },
  {
    id: 3,
    name: "Claire Beaumont",
    role: "VP of Operations",
    company: "Heritage Financial",
    initials: "CB",
    gradient: "from-rose-500 to-pink-500",
    quote:
      "The 'Innovation Island' award was no surprise to those of us who worked alongside them daily. Their AI-first methodology and clean architecture have become the gold standard across our entire group.",
  },
  {
    id: 4,
    name: "Marcus Webb",
    role: "Director of Compliance",
    company: "Summit Retirement",
    initials: "MW",
    gradient: "from-amber-500 to-orange-500",
    quote:
      "Making compliance invisible to the member while remaining airtight from a regulatory standpoint is an art form. This team nailed it — and delivered a customer experience that genuinely delights.",
  },
];

const AUTOPLAY_INTERVAL = 5500;

const TestimonialsSection = () => {
  const ref = useRef(null);
  const [activeId, setActiveId] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Auto-advance through testimonials
  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveId((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const handleSelect = (id: number) => {
    setIsPaused(true);
    setDirection(id > activeId ? 1 : -1);
    setActiveId(id);
    // Resume auto-advance after user interaction
    setTimeout(() => setIsPaused(false), AUTOPLAY_INTERVAL * 2);
  };

  const active = testimonials[activeId];

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir * 80,
      opacity: 0,
      scale: 0.97,
      rotate: dir * 1.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: -1,
    },
    exit: (dir: number) => ({
      x: -dir * 80,
      opacity: 0,
      scale: 0.97,
      rotate: -dir * 1.5,
    }),
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/20" />

      <div className="section-container relative" ref={ref}>
        {/* Section header */}
        <FloatingScrollCard
          scrollYProgress={scrollYProgress}
          direction="bottom"
          travel={700}
          className="text-center mb-20"
        >
          <h2 className="section-title">What people say</h2>
          <span className="section-overline">Voices that matter</span>
        </FloatingScrollCard>

        {/* Main layout: featured card + sidebar list */}
        <div className="flex flex-col lg:flex-row items-center gap-14 max-w-6xl mx-auto">

          {/* ── Left: stacked card deck ── */}
          <FloatingScrollCard
            scrollYProgress={scrollYProgress}
            direction="left"
            travel={700}
            delay={0.04}
            className="relative w-full lg:w-[58%] flex-shrink-0"
          >
            <div
              className="relative h-[400px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Ghost cards — stacked deck behind main card */}
              <div
                className="absolute w-full glass-panel rounded-3xl h-[330px]"
                style={{
                  transform: "rotate(4deg) translateY(20px) translateX(20px)",
                  opacity: 0.25,
                }}
              />
              <div
                className="absolute w-full glass-panel rounded-3xl h-[330px]"
                style={{
                  transform: "rotate(2deg) translateY(10px) translateX(10px)",
                  opacity: 0.50,
                }}
              />

              {/* Featured testimonial card */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeId}
                  custom={direction}
                  variants={reduceMotion ? {} : cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute w-full glass-panel rounded-3xl p-8 shadow-[0_24px_80px_hsl(var(--primary)/0.08)]"
                  style={{ transformOrigin: "center bottom" }}
                >
                  {/* Large quote mark */}
                  <div className="mb-5">
                    <Quote className="w-8 h-8 text-primary/30" />
                  </div>

                  {/* Quote text */}
                  <p className="text-base sm:text-[1.05rem] text-foreground leading-relaxed mb-8 font-medium min-h-[96px]">
                    "{active.quote}"
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${active.gradient} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-lg`}
                    >
                      {active.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {active.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {active.role}&nbsp;&middot;&nbsp;
                        <span className="font-medium">{active.company}</span>
                      </p>
                    </div>

                    {/* Progress dots */}
                    <div className="ml-auto flex items-center gap-2">
                      {testimonials.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleSelect(t.id)}
                          className={`rounded-full transition-all duration-300 ${
                            t.id === activeId
                              ? "w-5 h-1.5 bg-primary"
                              : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </FloatingScrollCard>

          {/* ── Right: testimonials list ── */}
          <FloatingScrollCard
            scrollYProgress={scrollYProgress}
            direction="right"
            travel={700}
            delay={0.07}
            className="w-full lg:w-[42%]"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground tracking-[0.18em] uppercase mb-1">
                Testimonials
              </p>
              <p className="text-sm text-muted-foreground">
                People who've seen it first-hand
              </p>
            </div>

            <div className="space-y-2">
              {testimonials.map((t) => (
                <motion.button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  whileHover={reduceMotion ? undefined : { x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                    t.id === activeId
                      ? "bg-primary/10 border border-primary/20 shadow-sm"
                      : "border border-transparent hover:bg-secondary"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 shadow-sm`}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        t.id === activeId
                          ? "text-foreground"
                          : "text-secondary-foreground"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.role}&nbsp;&middot;&nbsp;
                      <span className="font-medium">{t.company}</span>
                    </p>
                  </div>

                  {/* Active indicator dot */}
                  {t.id === activeId && (
                    <motion.div
                      layoutId="active-dot"
                      className="ml-auto w-2 h-2 rounded-full bg-primary flex-shrink-0"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </FloatingScrollCard>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
