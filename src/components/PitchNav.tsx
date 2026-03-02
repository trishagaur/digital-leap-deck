import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const navItems = [
  {
    label: "The Mission",
    subs: ["The Manual Reality", "Strategic Alignment", "Stakeholder Map"],
    href: "#mission",
  },
  {
    label: "Innovation",
    subs: ["AI-First SDLC", "Digital Monorepo", "Reusable Architecture"],
    href: "#innovation",
  },
  {
    label: "Impact",
    subs: ["Growth Metrics", "Efficiency Gains", "Client Trust"],
    href: "#impact",
  },
  {
    label: "Why Us",
    subs: ["Team DNA", "Culture of Feedback", "The Year-1 Journey"],
    href: "#culture",
  },
];

const PitchNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[44px] glass-nav transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="section-container h-full flex items-center justify-between">
        <a href="#hero" className="text-sm font-semibold gradient-text tracking-wide">
          TEAM OF THE YEAR
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
                <ChevronDown className="w-3 h-3" />
              </a>

              {openDropdown === i && (
                <div className="absolute top-full left-0 mt-0 glass-panel rounded-lg py-2 min-w-[200px] animate-fade-up">
                  {item.subs.map((sub) => (
                    <a
                      key={sub}
                      href={item.href}
                      className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden text-xs text-muted-foreground">☰</div>
      </div>
    </nav>
  );
};

export default PitchNav;
