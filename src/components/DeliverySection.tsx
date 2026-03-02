import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Bot, GitBranch, ToggleRight, Code, Cpu, Layers } from "lucide-react";
import { FloatingScrollIcon, type FloatingIconDef } from "./FloatingScrollIcon";
import { FloatingScrollCard } from "./FloatingScrollCard";

const deliveryItems = [
  {
    icon: Bot,
    title: "AI-First Engineering",
    description:
      "100% AI adoption across the SDLC — reducing design effort, automating code generation, and accelerating every phase from ideation to deployment.",
  },
  {
    icon: GitBranch,
    title: "Modern Architecture",
    description:
      "Early adoption of the digital monorepo with reusable Micro-Frontends (MFEs), enabling consistent UI patterns and rapid feature delivery across products.",
  },
  {
    icon: ToggleRight,
    title: "Feature-Flag Driven Delivery",
    description:
      "Controlled rollouts with feature flags, enabling safe experimentation, progressive releases, and instant rollback capabilities.",
  },
];

const floatingIcons: FloatingIconDef[] = [
  {
    icon: Bot,
    className: "left-4 top-12 sm:left-10",
    from: { x: -1580, y: -1080, rotate: -38 },
    to:   { x:  1180, y:   900, rotate:  24 },
    size: "w-16 h-16",
    loopDuration: 68,
  },
  {
    icon: Code,
    className: "right-4 top-16 sm:right-12",
    from: { x:  1520, y: -1020, rotate:  42 },
    to:   { x: -1120, y:   860, rotate: -28 },
    size: "w-14 h-14",
    loopDuration: 74,
  },
  {
    icon: Layers,
    className: "left-6 bottom-14 sm:left-14",
    from: { x: -1480, y:  1180, rotate: -34 },
    to:   { x:  1080, y:  -980, rotate:  28 },
    size: "w-20 h-20",
    loopDuration: 80,
  },
  {
    icon: Cpu,
    className: "right-6 bottom-12 sm:right-14",
    from: { x:  1420, y:  1120, rotate:  36 },
    to:   { x: -1020, y:  -920, rotate: -26 },
    size: "w-14 h-14",
    loopDuration: 72,
  },
];

const DeliverySection = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section id="innovation" className="py-32 relative overflow-hidden">
      {/* Parallax background accent */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent"
        style={{ y: bgY }}
      />

      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingIcons.map((item, i) => (
            <FloatingScrollIcon key={`df-${i}`} {...item} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      )}

      <div className="section-container relative" ref={ref}>
        <FloatingScrollCard scrollYProgress={scrollYProgress} direction="bottom" travel={900} className="text-center mb-20">
          <span className="section-overline">The Delivery Engine</span>
          <h2 className="section-title">
            How We Built the Impossible
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-lg">
            Leveraging AI and modern engineering to achieve in one year what typically takes three.
          </p>
        </FloatingScrollCard>

        <div className="space-y-8 max-w-4xl mx-auto">
          {deliveryItems.map((item, i) => (
            <FloatingScrollCard
              key={item.title}
              scrollYProgress={scrollYProgress}
              direction={i % 2 === 0 ? "left" : "right"}
              travel={1800}
              delay={0.05 * i}
            >
              <div className="bento-card flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FloatingScrollCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
