import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Zap, Clock, ShieldCheck, Rocket } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    stat: "4.5×",
    label: "Growth",
    description: "Increase in digital completions (29 → 132)",
    span: "md:col-span-1",
  },
  {
    icon: Zap,
    stat: "4,400+",
    label: "Velocity",
    description: "Story points across 12 epics, ~220 per sprint",
    span: "md:col-span-1",
  },
  {
    icon: Clock,
    stat: "~50%",
    label: "Efficiency",
    description: "Delivery time savings and $10,000+ annual infra savings",
    span: "md:col-span-1",
  },
  {
    icon: ShieldCheck,
    stat: "40%",
    label: "Trust",
    description: "Conversion rate with -26.3pp reduction in ineligible starts",
    span: "md:col-span-1",
  },
  {
    icon: Rocket,
    stat: "6",
    label: "Scale",
    description: "Major releases in Year-1 (Formation to July first mega-release)",
    span: "md:col-span-1",
  },
];

const MetricsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" className="py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-primary tracking-widest uppercase">
            Impact Dashboard
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 text-foreground">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Top row: 3 cards */}
          {metrics.slice(0, 3).map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bento-card flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-primary tracking-widest uppercase mb-2">
                {metric.label}
              </span>
              <span className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                {metric.stat}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}

          {/* Bottom row: 2 cards centered */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {metrics.slice(3).map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + 0.1 * i }}
                className="bento-card flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary tracking-widest uppercase mb-2">
                  {metric.label}
                </span>
                <span className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
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
