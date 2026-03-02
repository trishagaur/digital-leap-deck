import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, MessageCircle, Award } from "lucide-react";

const cultureItems = [
  {
    icon: Heart,
    title: "One-Team Culture",
    description: "High trust, high energy, and high performance. We operate as one unit — no silos, no ego, just shared purpose.",
  },
  {
    icon: MessageCircle,
    title: "Psychological Safety",
    description: "Feedback from peers and compliance is taken as a gift, not a threat. We grow by challenging each other openly.",
  },
  {
    icon: Award,
    title: "Recognized Excellence",
    description: 'Winners of "Innovation Island" and "Dream Team" awards — validation of a culture that delivers exceptional outcomes.',
  },
];

const CultureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="culture" className="py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-primary tracking-widest uppercase">
            Why We Win
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 text-foreground">
            Culture Is Our Superpower
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cultureItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="bento-card text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full border border-border bg-card/50">
            <span className="text-sm text-muted-foreground">
              Built with conviction. Delivered with excellence.{" "}
              <span className="gradient-text font-semibold">Team of the Year 2025.</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CultureSection;
