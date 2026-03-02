import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-retiree.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <img
          src={heroImage}
          alt="Retiree couple confidently using digital services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </motion.div>

      <motion.div className="section-container relative z-10 pt-20" style={{ y: textY, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-5 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Team of the Year 2025
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.08] mb-6 tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block text-foreground"
            >
              Securing the Future:
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block gradient-text"
            >
              From 100% Manual
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block gradient-text"
            >
              to Fully Digital
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block text-foreground"
            >
              Retirement
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Delivering a critical digital capability and six major releases
            in our very first year of formation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-4"
          >
            <a
              href="#impact"
              className="group inline-flex items-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95"
            >
              See Our Impact
            </a>
            <a
              href="#mission"
              className="group inline-flex items-center px-7 py-3.5 rounded-full border border-border text-foreground font-medium text-sm transition-all duration-300 hover:bg-secondary hover:border-transparent hover:scale-105 active:scale-95"
            >
              Our Mission
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
