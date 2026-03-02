import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

      <div className="section-container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-overline">The Delivery Engine</span>
          <h2 className="section-title">
            How We Built the Impossible
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-lg">
            Leveraging AI and modern engineering to achieve in one year what typically takes three.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {deliveryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * i, ease: [0.22, 1, 0.36, 1] }}
              className="bento-card flex items-start gap-6 group"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
