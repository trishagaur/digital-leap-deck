import { motion } from "framer-motion";
import heroImage from "@/assets/hero-retiree.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Retiree couple confidently using digital services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="section-container relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <span className="text-xs font-medium text-primary tracking-widest uppercase">
              Team of the Year 2025
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
            <span className="text-foreground">Securing the Future:</span>
            <br />
            <span className="gradient-text">From 100% Manual</span>
            <br />
            <span className="gradient-text">to Fully Digital</span>
            <br />
            <span className="text-foreground">Retirement</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Delivering a critical digital capability and six major releases
            in our very first year of formation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex gap-4"
          >
            <a
              href="#impact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              See Our Impact
            </a>
            <a
              href="#mission"
              className="inline-flex items-center px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary/50 transition-colors"
            >
              Our Mission
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
