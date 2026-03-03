import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { FloatingScrollCard } from "./FloatingScrollCard";
import { ImpactModal, type ModalData } from "./ImpactModal";
import { useState } from "react";

// ─── Image paths ───────────────────────────────────────────────────────────
// Drop your replacement images into:  public/images/customers/
// Then swap the filename below — no other changes needed.
const IMG = {
  accessibility:  "/images/customers/accessibility.jpg",
  trust:          "/images/customers/trust.jpg",
  independence:   "/images/customers/independence.jpg",
  inclusion:      "/images/customers/inclusion.jpg",
};

const stories = [
  {
    id: 0,
    image: IMG.accessibility,
    alt: "Elderly woman being helped to use a tablet by a nurse in a park",
    category: "Accessibility",
    title: "From Phone Queues to Instant Digital Access",
    accent: "#2563eb",
    modal: {
      mode: "simple" as const,
      overline: "Member Experience",
      title: "From Phone Queues to Instant Digital Access",
      description:
        "Margaret, 74, spent three weeks on hold trying to access her retirement savings. After the digital transformation, she completed the same process in under eight minutes on her tablet — without a single phone call.",
      image: IMG.accessibility,
      imageAlt: "Elderly woman being helped to use a tablet by a nurse in a park",
      bullets: [
        { value: "< 8 min", label: "average digital completion time" },
        { label: "Available 24/7 with no wait times" },
        { label: "Step-by-step guided journey with plain-language instructions" },
        { label: "Accessibility-first design — large text, screen-reader compatible" },
      ],
    } satisfies ModalData,
  },
  {
    id: 1,
    image: IMG.trust,
    alt: "Hands holding a glowing globe with a golden key, representing digital trust",
    category: "Trust & Transparency",
    title: "Giving Members Confidence at Every Step",
    accent: "#7c3aed",
    modal: {
      mode: "simple" as const,
      overline: "Member Trust",
      title: "Giving Members Confidence at Every Step",
      description:
        "Retirement decisions are among the most consequential a person will make. We redesigned the end-to-end journey so members feel informed, in control, and never second-guessing — with AML safeguards running invisibly in the background.",
      image: IMG.trust,
      imageAlt: "Hands holding a glowing globe with a golden key, representing digital trust",
      bullets: [
        { label: "Real-time eligibility confirmation before any form is submitted" },
        { label: "Plain-language explanations at each decision point" },
        { value: "−26.3pp", label: "reduction in ineligible starts" },
        { label: "Compliance built into the UX, invisible to the member" },
      ],
    } satisfies ModalData,
  },
  {
    id: 2,
    image: IMG.independence,
    alt: "Elderly man standing on a cliff overlooking a city at golden-hour sunset",
    category: "Independence",
    title: "Designing for the Members Who Need It Most",
    accent: "#059669",
    modal: {
      mode: "simple" as const,
      overline: "Inclusive Design",
      title: "Designing for the Members Who Need It Most",
      description:
        "Our user research programme involved over 300 hours with real members — including those with low digital literacy, cognitive load challenges, and physical limitations. Every design decision was validated against their lived experience.",
      image: IMG.independence,
      imageAlt: "Elderly man standing on a cliff overlooking a city at golden-hour sunset",
      bullets: [
        { value: "300+", label: "hours of member research across all segments" },
        { label: "Tested with members aged 60–85 across 4 states" },
        { label: "Reduced form steps by 40% after research insights" },
        { label: "WCAG 2.1 AA compliant across all digital touchpoints" },
      ],
    } satisfies ModalData,
  },
  {
    id: 3,
    image: IMG.inclusion,
    alt: "Diverse group of friends arm-in-arm looking at a scenic coastal mountain view",
    category: "Inclusion",
    title: "Retirement is Not One-Size-Fits-All",
    accent: "#dc2626",
    modal: {
      mode: "simple" as const,
      overline: "Diverse Members",
      title: "Retirement is Not One-Size-Fits-All",
      description:
        "Our member base spans cultures, languages, and life circumstances. We built the digital journey to flex around each individual — supporting CALD communities, blended families, and non-standard financial arrangements.",
      image: IMG.inclusion,
      imageAlt: "Diverse group of friends arm-in-arm looking at a scenic coastal mountain view",
      bullets: [
        { label: "Multi-language support for CALD member segments" },
        { label: "Flexible journey logic for non-standard withdrawal scenarios" },
        { label: "Guardian and power-of-attorney flows built in from day one" },
        { value: "4.5×", label: "growth in completions across all member cohorts" },
      ],
    } satisfies ModalData,
  },
];

const CustomerSection = () => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="customers" className="min-h-[120vh] py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/30" />

      <div className="section-container relative" ref={ref}>

        {/* Header */}
        <FloatingScrollCard
          scrollYProgress={scrollYProgress}
          direction="bottom"
          travel={500}
          stagger={0}
          className="text-center mb-14"
        >
          <span className="section-overline">Our Members</span>
          <h2 className="section-title">Putting our customers<br className="hidden sm:block" /> at the centre</h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-base">
            Every line of code, every design decision, every release — made with real people in mind.
          </p>
        </FloatingScrollCard>

        {/* Card grid — 2×2 on desktop, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {stories.map((story, i) => (
            <FloatingScrollCard
              key={story.id}
              scrollYProgress={scrollYProgress}
              direction={i % 2 === 0 ? "left" : "right"}
              travel={700}
              stagger={i + 1}
            >
              <div
                className="group rounded-2xl overflow-hidden bg-white border border-border/60 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
                onClick={() => setActiveModal(story.modal)}
                style={
                  {
                    "--accent": story.accent,
                  } as React.CSSProperties
                }
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Watercolor fade at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                  {/* Category pill */}
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[0.62rem] font-bold tracking-[0.14em] uppercase"
                    style={{ backgroundColor: story.accent }}
                  >
                    {story.category}
                  </span>
                </div>

                {/* Text */}
                <div className="px-6 pt-5 pb-6">
                  <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                    {story.title}
                  </h3>
                  {/* Accent underline — like Honor site */}
                  <div
                    className="mt-4 h-0.5 w-16 rounded-full transition-all duration-500 group-hover:w-32"
                    style={{ backgroundColor: story.accent }}
                  />
                </div>
              </div>
            </FloatingScrollCard>
          ))}
        </div>
      </div>

      <ImpactModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        data={activeModal}
      />
    </section>
  );
};

export default CustomerSection;
