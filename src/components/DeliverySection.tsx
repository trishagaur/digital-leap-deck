import { useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Bot, GitBranch, ToggleRight, Code, Cpu, Layers } from "lucide-react";
import { FloatingScrollIcon, type FloatingIconDef } from "./FloatingScrollIcon";
import { FloatingScrollCard } from "./FloatingScrollCard";
import { ImpactModal, type ModalData } from "./ImpactModal";
import { AISDLCChart } from "./ModalCharts";

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

const deliveryModals: ModalData[] = [
  {
    mode: "detailed",
    overline: "AI Engineering",
    title: "100% AI Adoption Across the SDLC",
    description:
      "Every phase from design to deployment was accelerated by AI tooling — reducing effort while improving consistency and quality.",
    bullets: [
      { label: "Design: Figma AI + component generation" },
      { label: "Development: GitHub Copilot + code generation" },
      { label: "Testing: Automated test scaffolding and coverage" },
      { label: "Deployment: AI-assisted release planning" },
    ],
    chart: <AISDLCChart />,
    accentGradient: "bg-gradient-to-br from-indigo-600 to-blue-700",
  },
  {
    mode: "simple",
    overline: "Architecture",
    title: "Digital Monorepo Architecture",
    description:
      "We adopted a digital monorepo early, building reusable Micro-Frontends (MFEs) that allowed consistent patterns across products and enabled teams to ship faster with zero duplication.",
    bullets: [
      { label: "Single source of truth across all products" },
      { label: "Reusable MFE component library" },
      { label: "Consistent UI patterns across 3 products" },
      { label: "Rapid feature delivery with no duplication" },
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
    imageAlt: "Server racks and network infrastructure representing modern architecture",
  },
  {
    mode: "simple",
    overline: "Delivery",
    title: "Safe, Progressive Delivery",
    description:
      "Feature flags gave us a deployment superpower: ship code without risk, experiment safely, and roll back instantly when needed.",
    bullets: [
      { label: "Progressive rollouts from 1% → 100% of users" },
      { label: "A/B experimentation without code branches" },
      { label: "Instant rollback capability in under 30 seconds" },
      { label: "Dark launches for compliance validation" },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    imageAlt: "Dashboard with data charts and toggle controls representing feature-flag delivery",
  },
];

const DeliverySection = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section id="innovation" className="min-h-[130vh] py-20 relative overflow-hidden">
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
        <FloatingScrollCard scrollYProgress={scrollYProgress} direction="bottom" travel={500} stagger={0} className="text-center mb-12">
          <span className="section-overline">The Delivery Engine</span>
          <h2 className="section-title">
            How We Built the Impossible
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Leveraging AI and modern engineering to achieve in one year what typically takes three.
          </p>
        </FloatingScrollCard>

        <div className="space-y-8 max-w-4xl mx-auto">
          {deliveryItems.map((item, i) => (
            <FloatingScrollCard
              key={item.title}
              scrollYProgress={scrollYProgress}
              direction={i % 2 === 0 ? "left" : "right"}
              travel={700}
              stagger={i + 1}
            >
              <div
                className="bento-card flex items-start gap-6 group cursor-pointer"
                onClick={() => setActiveModal(deliveryModals[i])}
              >
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
      <ImpactModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        data={activeModal}
      />
    </section>
  );
};

export default DeliverySection;
