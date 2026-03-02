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
  const x = useTransform(slowScroll, [0, 1], item.xRange);
  const y = useTransform(slowScroll, [0, 1], item.yRange);
  const rotate = useTransform(slowScroll, [0, 1], item.rotateRange);
  const opacity = useTransform(slowScroll, [0, 0.5, 1], [0.2, 0.45, 0.2]);

  return (
    <motion.div
      className={`absolute ${item.className}`}
      style={{ x, y, rotate, opacity }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 12, -10, 0],
              y: [0, -10, 8, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 14 + index * 1.8,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      <div className={`${item.size} rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.18)]`}>
        <Icon className="w-6 h-6 text-primary/90" />
      </div>
    </motion.div>
  );
};

const floatingIcons: FloatingIconConfig[] = [
  {
    icon: TrendingUp,
    className: "left-2 top-10 sm:left-8",
    xRange: [-90, 70],
    yRange: [-50, 80],
    rotateRange: [-18, 14],
    size: "w-14 h-14",
  },
  {
    icon: Zap,
    className: "right-2 top-20 sm:right-10",
    xRange: [80, -60],
    yRange: [-40, 90],
    rotateRange: [22, -16],
    size: "w-12 h-12",
  },
  {
    icon: Clock,
    className: "left-4 bottom-12 sm:left-14",
    xRange: [-70, 55],
    yRange: [70, -45],
    rotateRange: [-14, 18],
    size: "w-16 h-16",
  },
  {
    icon: ShieldCheck,
    className: "right-2 bottom-8 sm:right-14",
    xRange: [70, -50],
    yRange: [65, -35],
    rotateRange: [18, -12],
    size: "w-14 h-14",
  },
  {
    icon: Rocket,
    className: "left-1/2 -translate-x-1/2 top-0",
    xRange: [-20, 25],
    yRange: [-60, 40],
    rotateRange: [-12, 10],
    size: "w-12 h-12",
  },
];

const MetricsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const slowScroll = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 20,
    mass: 0.7,
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
                className="absolute -right-2 -top-2 w-24 h-24 rounded-full bg-primary/10 blur-2xl"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.12, 1],
                        opacity: [0.35, 0.55, 0.35],
                      }
                }
                transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/25 group-hover:scale-125 transition-all duration-500">
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: [0, 5, -5, 0],
                          y: [0, -2, 1, 0],
                        }
                  }
                  transition={{ duration: 7 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
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
                  className="absolute -left-2 -bottom-2 w-24 h-24 rounded-full bg-primary/10 blur-2xl"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }
                  }
                  transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/25 group-hover:scale-125 transition-all duration-500">
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: [0, -4, 4, 0],
                            y: [0, -2, 1, 0],
                          }
                    }
                    transition={{ duration: 7.4 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
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
