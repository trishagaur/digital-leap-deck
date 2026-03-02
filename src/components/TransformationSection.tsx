import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { FileText, Phone, Clock, Shield, Zap, Smartphone, RefreshCw, Sparkles } from "lucide-react";
import { FloatingScrollIcon, type FloatingIconDef } from "./FloatingScrollIcon";
import { FloatingScrollCard } from "./FloatingScrollCard";

const floatingIcons: FloatingIconDef[] = [
  {
    icon: FileText,
    className: "left-4 top-12 sm:left-10",
    from: { x: -1550, y: -1050, rotate: -36 },
    to:   { x:  1150, y:   880, rotate:  24 },
    size: "w-14 h-14",
    loopDuration: 68,
  },
  {
    icon: Sparkles,
    className: "right-4 top-16 sm:right-12",
    from: { x:  1500, y: -1000, rotate:  40 },
    to:   { x: -1100, y:   850, rotate: -28 },
    size: "w-12 h-12",
    loopDuration: 74,
  },
  {
    icon: RefreshCw,
    className: "left-6 bottom-14 sm:left-14",
    from: { x: -1450, y:  1150, rotate: -32 },
    to:   { x:  1050, y:  -950, rotate:  26 },
    size: "w-16 h-16",
    loopDuration: 80,
  },
  {
    icon: Shield,
    className: "right-6 bottom-12 sm:right-14",
    from: { x:  1400, y:  1100, rotate:  34 },
    to:   { x:  -980, y:  -900, rotate: -24 },
    size: "w-14 h-14",
    loopDuration: 72,
  },
];

const TransformationSection = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

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
    <section id="mission" className="min-h-[120vh] py-20 relative overflow-hidden">
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingIcons.map((item, i) => (
            <FloatingScrollIcon key={`tf-${i}`} {...item} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      )}
      <div className="section-container" ref={ref}>
        <FloatingScrollCard scrollYProgress={scrollYProgress} direction="bottom" travel={500} stagger={0} className="text-center mb-12">
          <span className="section-overline">The Transformation</span>
          <h2 className="section-title">
            The Pivot That Changed Everything
          </h2>
        </FloatingScrollCard>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before - flies in very slowly from left */}
          <FloatingScrollCard scrollYProgress={scrollYProgress} direction="left" travel={700} stagger={1}>
            <div className="bento-card relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/60 to-destructive/10" />
            <span className="text-xs font-semibold text-destructive tracking-widest uppercase mb-6 block">
              The Reality — Before
            </span>
            <div className="space-y-6">
                {beforeItems.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <span className="text-sm text-secondary-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingScrollCard>
          {/* After - flies in very slowly from right */}
          <FloatingScrollCard scrollYProgress={scrollYProgress} direction="right" travel={700} stagger={2}>
            <div className="bento-card relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/30" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-6 block">
              The Transformation — After
            </span>
            <div className="space-y-6">
                {afterItems.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-secondary-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingScrollCard>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
