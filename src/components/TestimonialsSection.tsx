import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

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

const AUTOPLAY_INTERVAL = 10000;

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [activeId, setActiveId] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      setSlideDir(1);
      setActiveId((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const handleSelect = (id: number) => {
    setIsPaused(true);
    setSlideDir(id > activeId ? 1 : -1);
    setActiveId(id);
    setTimeout(() => setIsPaused(false), AUTOPLAY_INTERVAL * 2);
  };

  const active = testimonials[activeId];

  const cardVariants = {
    enter: (d: number) => ({ y: d * 36, opacity: 0, scale: 0.98 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ y: -d * 36, opacity: 0, scale: 0.98 }),
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-secondary/20" />

      <div className="section-container relative" ref={ref}>
        {/* Section header — fades in on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
            What people say
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mt-3">
            Loved by those who matter
          </h2>
        </motion.div>

        {/* Two-column layout: large card left, name list right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 max-w-6xl mx-auto items-start">

          {/* LEFT: stacked card deck */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative">
              {/* Ghost deck: two rotated cards behind active */}
              <div
                className="absolute inset-0 glass-panel rounded-3xl pointer-events-none"
                style={{
                  transform: "rotate(3deg) translateY(14px) translateX(14px)",
                  opacity: 0.28,
                }}
              />
              <div
                className="absolute inset-0 glass-panel rounded-3xl pointer-events-none"
                style={{
                  transform: "rotate(1.5deg) translateY(7px) translateX(7px)",
                  opacity: 0.52,
                }}
              />

              {/* Active testimonial — slides up/down on change */}
              <AnimatePresence mode="wait" custom={slideDir}>
                <motion.div
                  key={activeId}
                  custom={slideDir}
                  variants={reduceMotion ? {} : cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="relative glass-panel rounded-3xl p-10 shadow-[0_24px_80px_hsl(var(--primary)/0.07)]"
                >
                  <Quote className="w-10 h-10 text-primary/20 mb-6" />

                  <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-10 font-medium">
                    &ldquo;{active.quote}&rdquo;
                  </p>

                  {/* Author row + progress dots */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${active.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}
                    >
                      {active.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{active.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {active.role}&nbsp;&middot;&nbsp;
                        <span className="font-medium">{active.company}</span>
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 flex-shrink-0">
                      {testimonials.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleSelect(t.id)}
                          aria-label={`View ${t.name}`}
                          className={`rounded-full transition-all duration-300 ${
                            t.id === activeId
                              ? "w-6 h-2 bg-primary"
                              : "w-2 h-2 bg-muted-foreground/25 hover:bg-muted-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: selectable name list */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5">
              <p className="text-xs font-semibold text-muted-foreground tracking-[0.18em] uppercase mb-0.5">
                Testimonials
              </p>
              <p className="text-sm text-muted-foreground">
                People who have seen it first-hand
              </p>
            </div>

            <div className="space-y-1.5">
              {testimonials.map((t) => (
                <motion.button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                    t.id === activeId
                      ? "bg-primary/10 border border-primary/20 shadow-sm"
                      : "border border-transparent hover:bg-secondary/80"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 shadow-sm`}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold leading-snug ${
                        t.id === activeId ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">{t.role}</p>
                    <p className="text-xs text-muted-foreground font-medium leading-snug">
                      {t.company}
                    </p>
                  </div>
                  {t.id === activeId && (
                    <motion.div
                      layoutId="active-dot"
                      className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
