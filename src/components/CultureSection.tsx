import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Heart, MessageCircle, Award, Star, Users } from "lucide-react";
import { FloatingScrollIcon, type FloatingIconDef } from "./FloatingScrollIcon";

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
    from: { x: -910, y: -670, rotate: -30 },
    to:   { x:  570, y:  510, rotate:  20 },
    size: "w-16 h-16",
    loopDuration: 46,
  },
  {
    icon: Star,
    className: "right-4 top-16 sm:right-12",
    from: { x:  870, y: -640, rotate:  34 },
    to:   { x: -530, y:  490, rotate: -24 },
    size: "w-12 h-12",
    loopDuration: 52,
  },
  {
    icon: Users,
    className: "left-6 bottom-14 sm:left-14",
    from: { x: -850, y:  700, rotate: -26 },
    to:   { x:  500, y: -490, rotate:  22 },
    size: "w-16 h-16",
    loopDuration: 54,
  },
  {
    icon: Award,
    className: "right-6 bottom-12 sm:right-14",
    from: { x:  830, y:  660, rotate:  28 },
    to:   { x: -470, y: -470, rotate: -20 },
    size: "w-14 h-14",
    loopDuration: 48,
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 60,
    x: (i - 1) * -80,
    scale: 0.9,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.15 * i,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const CultureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const slowScroll = useSpring(scrollYProgress, {
    stiffness: 5,
    damping: 32,
    mass: 3.2,
  });

  return (
    <section id="culture" className="py-32 relative overflow-hidden">
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingIcons.map((item, i) => (
            <FloatingScrollIcon key={`cf-${i}`} {...item} slowScroll={slowScroll} />
          ))}
        </div>
      )}
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-overline">Why We Win</span>
          <h2 className="section-title">Culture Is Our Superpower</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cultureItems.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="bento-card text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-full border border-border bg-secondary/50 hover:bg-secondary transition-colors duration-300">
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
