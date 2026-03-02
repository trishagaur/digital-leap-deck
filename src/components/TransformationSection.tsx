import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Phone, Clock, Shield, Zap, Smartphone } from "lucide-react";

const TransformationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const beforeItems = [
    { icon: FileText, label: "Paper withdrawal forms" },
    { icon: Phone, label: "Phone-based processing" },
    { icon: Clock, label: "100% manual journey" },
  ];

  const afterItems = [
    { icon: Smartphone, label: "Always-on digital self-service" },
    { icon: Shield, label: "AML safeguards built-in" },
    { icon: Zap, label: "Fast, frictionless experience" },
  ];

  return (
    <section id="mission" className="py-32 relative overflow-hidden">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-overline">The Transformation</span>
          <h2 className="section-title">
            The Pivot That Changed Everything
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before - flies in from left */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bento-card relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/60 to-destructive/10" />
            <span className="text-xs font-semibold text-destructive tracking-widest uppercase mb-6 block">
              The Reality — Before
            </span>
            <div className="space-y-6">
              {beforeItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + 0.1 * i }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-sm text-secondary-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* After - flies in from right */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bento-card relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/30" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-6 block">
              The Transformation — After
            </span>
            <div className="space-y-6">
              {afterItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + 0.1 * i }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-secondary-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
