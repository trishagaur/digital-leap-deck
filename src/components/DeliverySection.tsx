import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, GitBranch, ToggleRight } from "lucide-react";

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

const DeliverySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="innovation" className="py-32 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="section-container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium text-primary tracking-widest uppercase">
            The Delivery Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 text-foreground">
            How We Built the Impossible
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Leveraging AI and modern engineering to achieve in one year what typically takes three.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {deliveryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="bento-card flex items-start gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
