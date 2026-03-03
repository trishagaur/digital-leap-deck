import { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { TrendingUp, Zap, Clock, ShieldCheck, Rocket } from "lucide-react";
import { FloatingScrollIcon, type FloatingIconDef } from "./FloatingScrollIcon";
import { FloatingScrollCard } from "./FloatingScrollCard";
import { ImpactModal, type ModalData } from "./ImpactModal";
import { GrowthChart, VelocityChart, EfficiencyChart, TrustChart } from "./ModalCharts";

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

// True off-screen distances — icons travel the full viewport width/height
const floatingIcons: FloatingIconDef[] = [
  {
    icon: TrendingUp,
    className: "left-6 top-14 sm:left-12",
    from: { x: -1600, y: -1100, rotate: -42 },
    to:   { x:  1200, y:   900, rotate:  28 },
    size: "w-16 h-16",
    loopDuration: 68,
  },
  {
    icon: Zap,
    className: "right-6 top-20 sm:right-14",
    from: { x:  1550, y: -1050, rotate:  46 },
    to:   { x: -1150, y:   880, rotate: -32 },
    size: "w-14 h-14",
    loopDuration: 74,
  },
  {
    icon: Clock,
    className: "left-8 bottom-16 sm:left-16",
    from: { x: -1500, y:  1200, rotate: -38 },
    to:   { x:  1100, y: -1000, rotate:  30 },
    size: "w-20 h-20",
    loopDuration: 80,
  },
  {
    icon: ShieldCheck,
    className: "right-8 bottom-14 sm:right-16",
    from: { x:  1450, y:  1150, rotate:  38 },
    to:   { x: -1050, y:  -950, rotate: -28 },
    size: "w-16 h-16",
    loopDuration: 72,
  },
  {
    icon: Rocket,
    className: "left-1/2 -translate-x-1/2 top-4",
    from: { x:  -200, y: -1400, rotate: -26 },
    to:   { x:   220, y:  1200, rotate:  22 },
    size: "w-14 h-14",
    loopDuration: 76,
  },
];

const metricModals: ModalData[] = [
  {
    mode: "detailed",
    overline: "Growth",
    title: "Accelerating Digital Outcomes",
    description:
      "By removing manual friction and leveraging over 300 hours of user research, we saw an immediate and sustained performance uplift across the full member journey.",
    bullets: [
      { value: "4.5×", label: "increase in digital completions (29 → 132)" },
      { value: "+12.8pp", label: "conversion lift in the first six months" },
      { label: "Driven by redesigned UX and AML automation" },
    ],
    chart: <GrowthChart />,
    accentGradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
  },
  {
    mode: "detailed",
    overline: "Velocity",
    title: "AI-First Release Engine",
    description:
      "Our squad adopted 100% AI across the SDLC — reducing design effort, automating code generation, and accelerating every phase from ideation to deployment.",
    bullets: [
      { value: "12 epics", label: "delivered across Year-1" },
      { value: "4,400+", label: "story points at ~220 per sprint" },
      { value: "6", label: "major releases with zero critical incidents" },
    ],
    chart: <VelocityChart />,
    accentGradient: "bg-gradient-to-br from-violet-600 to-purple-700",
  },
  {
    mode: "detailed",
    overline: "Efficiency",
    title: "Doing More with Less",
    description:
      "AI tooling and monorepo architecture compressed timelines dramatically while cutting infrastructure spend — proving you don’t need more resources, just smarter ones.",
    bullets: [
      { value: "~50%", label: "reduction in delivery cycle time" },
      { value: "$10,000+", label: "annual infrastructure savings" },
      { label: "Design-to-deploy cycle reduced by half" },
    ],
    chart: <EfficiencyChart />,
    accentGradient: "bg-gradient-to-br from-teal-600 to-emerald-700",
  },
  {
    mode: "detailed",
    overline: "Trust",
    title: "Building Member Trust at Scale",
    description:
      "AML safeguards and an improved UX drove a step-change in conversion quality — more completions, far fewer ineligible starts.",
    bullets: [
      { value: "40%", label: "digital completion conversion rate" },
      { value: "−26.3pp", label: "reduction in ineligible starts" },
      { label: "Fully compliant, automated end-to-end journey" },
    ],
    chart: <TrustChart />,
    accentGradient: "bg-gradient-to-br from-rose-600 to-pink-700",
  },
  {
    mode: "simple",
    overline: "Scale",
    title: "Six Major Milestones in Year One",
    description:
      "From Formation release to the July mega-release, the team shipped six major product releases — a pace most squads take three years to achieve.",
    bullets: [
      { value: "Q1", label: "Formation Release — foundation architecture" },
      { value: "Q2", label: "Core Digital Withdrawal + AML Integration" },
      { value: "Q2", label: "UX Overhaul — member experience redesign" },
      { value: "Q3", label: "July Mega-Release — full digital self-service" },
      { label: "6 releases, zero critical production incidents" },
    ],
  },
];

const MetricsSection = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="impact" className="min-h-[130vh] py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />

      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map((item, i) => (
            <FloatingScrollIcon key={`mf-${i}`} {...item} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      )}
      
      <div className="section-container relative" ref={ref}>
        <FloatingScrollCard scrollYProgress={scrollYProgress} direction="bottom" travel={500} stagger={0} className="text-center mb-12">
          <span className="section-overline">Impact Dashboard</span>
          <h2 className="section-title">Numbers That Speak</h2>
        </FloatingScrollCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {metrics.slice(0, 3).map((metric, i) => (
            <FloatingScrollCard
              key={metric.label}
              scrollYProgress={scrollYProgress}
              direction={i === 0 ? "left" : i === 1 ? "bottom" : "right"}
              travel={700}
              stagger={i + 1}
            >
            <div
              className="bento-card flex flex-col group relative overflow-hidden h-full cursor-pointer"
              onClick={() => setActiveModal(metricModals[i])}
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
            </div>
            </FloatingScrollCard>
          ))}

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {metrics.slice(3).map((metric, i) => (
              <FloatingScrollCard
                key={metric.label}
                scrollYProgress={scrollYProgress}
                direction={i === 0 ? "left" : "right"}
                travel={700}
                stagger={i + 4}
              >
              <div
                className="bento-card flex flex-col group relative overflow-hidden h-full cursor-pointer"
                onClick={() => setActiveModal(metricModals[i + 3])}
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
              </div>
              </FloatingScrollCard>
            ))}
          </div>
        </div>
      </div>
      <ImpactModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        data={activeModal}
      />
    </section>
  );
};

export default MetricsSection;
