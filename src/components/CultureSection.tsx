import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Heart, MessageCircle, Award, Star, Users } from "lucide-react";
import { FloatingScrollIcon, type FloatingIconDef } from "./FloatingScrollIcon";
import { FloatingScrollCard } from "./FloatingScrollCard";

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

const floatingIcons: FloatingIconDef[] = [
  {
    icon: Heart,
    className: "left-4 top-12 sm:left-10",
    from: { x: -1560, y: -1060, rotate: -34 },
    to:   { x:  1160, y:   880, rotate:  22 },
    size: "w-16 h-16",
    loopDuration: 68,
  },
  {
    icon: Star,
    className: "right-4 top-16 sm:right-12",
    from: { x:  1500, y: -1000, rotate:  38 },
    to:   { x: -1100, y:   840, rotate: -26 },
    size: "w-12 h-12",
    loopDuration: 74,
  },
  {
    icon: Users,
    className: "left-6 bottom-14 sm:left-14",
    from: { x: -1460, y:  1160, rotate: -30 },
    to:   { x:  1060, y:  -960, rotate:  24 },
    size: "w-16 h-16",
    loopDuration: 80,
  },
  {
    icon: Award,
    className: "right-6 bottom-12 sm:right-14",
    from: { x:  1400, y:  1100, rotate:  32 },
    to:   { x: -1000, y:  -900, rotate: -22 },
    size: "w-14 h-14",
    loopDuration: 72,
  },
];

const CultureSection = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="culture" className="py-32 relative overflow-hidden">
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingIcons.map((item, i) => (
            <FloatingScrollIcon key={`cf-${i}`} {...item} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      )}
      <div className="section-container" ref={ref}>
        <FloatingScrollCard scrollYProgress={scrollYProgress} direction="bottom" travel={900} className="text-center mb-20">
          <span className="section-overline">Why We Win</span>
          <h2 className="section-title">Culture Is Our Superpower</h2>
        </FloatingScrollCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cultureItems.map((item, i) => (
            <FloatingScrollCard
              key={item.title}
              scrollYProgress={scrollYProgress}
              direction={i === 0 ? "left" : i === 2 ? "right" : "bottom"}
              travel={1800}
              delay={0.05 * i}
            >
              <div className="bento-card text-center group h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FloatingScrollCard>
          ))}
        </div>

        {/* Footer */}
        <FloatingScrollCard scrollYProgress={scrollYProgress} direction="bottom" travel={600} delay={0.12} className="mt-24 text-center">
          <div className="inline-block px-8 py-4 rounded-full border border-border bg-secondary/50 hover:bg-secondary transition-colors duration-300">
            <span className="text-sm text-muted-foreground">
              Built with conviction. Delivered with excellence.{" "}
              <span className="gradient-text font-semibold">Team of the Year 2025.</span>
            </span>
          </div>
        </FloatingScrollCard>
      </div>
    </section>
  );
};

export default CultureSection;
