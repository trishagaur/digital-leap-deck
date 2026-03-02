import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Zap, Clock, ShieldCheck, Rocket } from "lucide-react";
import { FloatingScrollIcon, type FloatingIconDef } from "./FloatingScrollIcon";

const metrics = [
  {
    icon: TrendingUp,
    stat: "4.5×",
    label: "Growth",
    description: "Increase in digital completions (29 → 132)",
  },
  {
    icon: Zap,
    stat: "4,400+",
    label: "Velocity",
    description: "Story points across 12 epics, ~220 per sprint",
  },
  {
    icon: Clock,
    stat: "~50%",
    label: "Efficiency",
    description: "Delivery time savings and $10,000+ annual infra savings",
  },
  {
    icon: ShieldCheck,
    stat: "40%",
    label: "Trust",
    description: "Conversion rate with -26.3pp reduction in ineligible starts",
  },
  {
    icon: Rocket,
    stat: "6",
    label: "Scale",
    description: "Major releases in Year-1 (Formation to July first mega-release)",
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -100 : 100,
    y: 40,
    rotateY: i % 2 === 0 ? -8 : 8,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      delay: 0.1 * i,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// Each icon launches from a far off-screen corner, settles mid-section, then drifts back out
const floatingIcons: FloatingIconDef[] = [
  {
    icon: TrendingUp,
    className: "left-6 top-14 sm:left-12",
    from: { x: -950, y: -700, rotate: -35 },
    to:   { x:  600, y:  500, rotate:  22 },
    size: "w-16 h-16",
    loopDuration: 44,
  },
  {
    icon: Zap,
    className: "right-6 top-20 sm:right-14",
    from: { x:  900, y: -650, rotate:  40 },
    to:   { x: -550, y:  480, rotate: -28 },
    size: "w-14 h-14",
    loopDuration: 50,
  },
  {
    icon: Clock,
    className: "left-8 bottom-16 sm:left-16",
    from: { x: -880, y:  720, rotate: -30 },
    to:   { x:  520, y: -520, rotate:  26 },
    size: "w-20 h-20",
    loopDuration: 54,
  },
  {
    icon: ShieldCheck,
    className: "right-8 bottom-14 sm:right-16",
    from: { x:  860, y:  680, rotate:  32 },
    to:   { x: -500, y: -490, rotate: -24 },
    size: "w-16 h-16",
    loopDuration: 48,
  },
  {
    icon: Rocket,
    className: "left-1/2 -translate-x-1/2 top-4",
    from: { x: -120, y: -800, rotate: -20 },
    to:   { x:  140, y:  600, rotate:  18 },
    size: "w-14 h-14",
    loopDuration: 58,
  },
];

const MetricsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Ultra-slow spring — icons trail far behind scroll, like Jeton
  const slowScroll = useSpring(scrollYProgress, {
    stiffness: 5,
    damping: 32,
    mass: 3.2,
  });

  return (
    <section id="impact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />

      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingIcons.map((item, i) => (
            <FloatingScrollIcon key={`mf-${i}`} {...item} slowScroll={slowScroll} />
          ))}
        </div>
      )}
      
      <div className="section-container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-overline">Impact Dashboard</span>
          <h2 className="section-title">Numbers That Speak</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
          {metrics.slice(0, 3).map((metric, i) => (
            <motion.div
              key={metric.label}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      rotateX: 2,
                      rotateY: i % 2 === 0 ? -2 : 2,
                    }
              }
              className="bento-card flex flex-col group relative overflow-hidden"
            >
              <motion.div
                className="absolute -right-5 -top-5 w-36 h-36 rounded-full bg-primary/20 blur-3xl"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.2, 1],
                        x: [0, -10, 8, 0],
                        y: [0, 8, -8, 0],
                        opacity: [0.3, 0.62, 0.3],
                      }
                }
                transition={{ duration: 16 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:scale-[1.35] transition-all duration-700">
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: [0, 8, -8, 0],
                          y: [0, -5, 4, 0],
                          x: [0, 3, -2, 0],
                        }
                  }
                  transition={{ duration: 12 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <metric.icon className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
              <span className="section-overline mb-2">{metric.label}</span>
              <span className="text-4xl lg:text-5xl font-bold text-foreground mb-3 tracking-tight">
                {metric.stat}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {metrics.slice(3).map((metric, i) => (
              <motion.div
                key={metric.label}
                custom={i + 3}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        rotateX: 2,
                        rotateY: i % 2 === 0 ? -2 : 2,
                      }
                }
                className="bento-card flex flex-col group relative overflow-hidden"
              >
                <motion.div
                  className="absolute -left-5 -bottom-5 w-36 h-36 rounded-full bg-primary/20 blur-3xl"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.2, 1],
                          x: [0, 8, -8, 0],
                          y: [0, -8, 8, 0],
                          opacity: [0.28, 0.58, 0.28],
                        }
                  }
                  transition={{ duration: 17 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:scale-[1.35] transition-all duration-700">
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: [0, -8, 8, 0],
                            y: [0, -5, 4, 0],
                            x: [0, -3, 2, 0],
                          }
                    }
                    transition={{ duration: 12.5 + i, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <metric.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>
                <span className="section-overline mb-2">{metric.label}</span>
                <span className="text-4xl lg:text-5xl font-bold text-foreground mb-3 tracking-tight">
                  {metric.stat}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
