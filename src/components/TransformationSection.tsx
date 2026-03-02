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
    <section id="mission" className="py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-primary tracking-widest uppercase">
            The Transformation
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 text-foreground">
            The Pivot That Changed Everything
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bento-card relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/60 to-destructive/20" />
            <span className="text-xs font-semibold text-destructive tracking-widest uppercase mb-6 block">
              The Reality — Before
            </span>
            <div className="space-y-6">
              {beforeItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-sm text-secondary-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bento-card relative overflow-hidden animate-glow-pulse"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-6 block">
              The Transformation — After
            </span>
            <div className="space-y-6">
              {afterItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-secondary-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
