import {
  type MotionValue,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { type ComponentType, useRef } from "react";
import { TrendingUp, Zap, Clock, ShieldCheck, Rocket } from "lucide-react";

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

type FloatingIconConfig = {
  icon: ComponentType<{ className?: string }>;
  className: string;
  xRange: [number, number];
  yRange: [number, number];
  rotateRange: [number, number];
  size: string;
  loopDuration: number;
  drift: [number, number, number];
};

const FloatingMetricIcon = ({
  item,
  index,
  slowScroll,
  reduceMotion,
}: {
  item: FloatingIconConfig;
  index: number;
  slowScroll: MotionValue<number>;
  reduceMotion: boolean | null;
}) => {
  const Icon = item.icon;
  // 3-point: icons arrive from far off (0), settle at center (0.5), then drift back out (1)
  const x = useTransform(slowScroll, [0, 0.5, 1], [item.xRange[0], 0, item.xRange[1]]);
  const y = useTransform(slowScroll, [0, 0.5, 1], [item.yRange[0], 0, item.yRange[1]]);
  const rotate = useTransform(slowScroll, [0, 0.5, 1], [item.rotateRange[0], 0, item.rotateRange[1]]);
  const opacity = useTransform(slowScroll, [0, 0.35, 0.5, 0.65, 1], [0, 0.55, 0.75, 0.55, 0]);
  const scale = useTransform(slowScroll, [0, 0.5, 1], [0.6, 1.1, 0.7]);

  return (
    <motion.div
      className={`absolute ${item.className}`}
      style={{ x, y, rotate, opacity, scale }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, item.drift[0] * 0.4, -item.drift[1] * 0.4, 0],
              y: [0, -item.drift[1] * 0.4, item.drift[2] * 0.4, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: item.loopDuration * 2 + index * 2,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      <div className={`${item.size} rounded-2xl bg-primary/15 border border-primary/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_55px_hsl(var(--primary)/0.32)]`}>
        <Icon className="w-6 h-6 text-primary/90" />
      </div>
    </motion.div>
  );
};

const floatingIcons: FloatingIconConfig[] = [
  {
    // top-left: enters from far top-left corner
    icon: TrendingUp,
    className: "left-4 top-16 sm:left-10",
    xRange: [-320, 200],
    yRange: [-280, 160],
    rotateRange: [-32, 22],
    size: "w-16 h-16",
    loopDuration: 48,
    drift: [18, 14, 12],
  },
  {
    // top-right: enters from far top-right corner
    icon: Zap,
    className: "right-4 top-20 sm:right-12",
    xRange: [300, -190],
    yRange: [-260, 180],
    rotateRange: [36, -26],
    size: "w-14 h-14",
    loopDuration: 52,
    drift: [16, 12, 10],
  },
  {
    // bottom-left: enters from far bottom-left corner
    icon: Clock,
    className: "left-4 bottom-16 sm:left-16",
    xRange: [-280, 180],
    yRange: [300, -200],
    rotateRange: [-28, 30],
    size: "w-20 h-20",
    loopDuration: 56,
    drift: [20, 16, 14],
  },
  {
    // bottom-right: enters from far bottom-right corner
    icon: ShieldCheck,
    className: "right-4 bottom-12 sm:right-16",
    xRange: [260, -180],
    yRange: [280, -170],
    rotateRange: [30, -24],
    size: "w-16 h-16",
    loopDuration: 50,
    drift: [16, 14, 12],
  },
  {
    // top-center: enters from far above
    icon: Rocket,
    className: "left-1/2 -translate-x-1/2 top-2",
    xRange: [-80, 100],
    yRange: [-320, 180],
    rotateRange: [-22, 18],
    size: "w-14 h-14",
    loopDuration: 60,
    drift: [14, 10, 8],
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

  // Very slow, heavy spring so icons lag far behind scroll
  const slowScroll = useSpring(scrollYProgress, {
    stiffness: 8,
    damping: 28,
    mass: 2.2,
  });

  return (
    <section id="impact" className="py-32 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          return (
            <FloatingMetricIcon
              key={`floating-${index}`}
              item={item}
              index={index}
              slowScroll={slowScroll}
              reduceMotion={reduceMotion}
            />
          );
        })}
      </div>
      
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
