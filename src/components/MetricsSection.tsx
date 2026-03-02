import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

const MetricsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" className="py-32 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      
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
              className="bento-card flex flex-col group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <metric.icon className="w-6 h-6 text-primary" />
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
                className="bento-card flex flex-col group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <metric.icon className="w-6 h-6 text-primary" />
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
