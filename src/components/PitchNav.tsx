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
      className={`fixed top-0 left-0 right-0 z-50 h-[44px] glass-nav transition-all duration-500 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="section-container h-full flex items-center justify-center">
        {/* Logo - absolute left */}
        <a href="#hero" className="absolute left-6 lg:left-8 text-sm font-semibold text-foreground tracking-wide">
          GPS- Retirement Capability
        </a>

        {/* Center-aligned nav */}
        <div className="hidden md:flex items-center gap-0">
          {navItems.map((item, i) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground transition-all duration-300 rounded-full hover:bg-secondary"
              >
                {item.label}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdown === i ? 'rotate-180' : ''}`} />
              </a>

              {openDropdown === i && (
                <div className="absolute top-full left-0 mt-1 glass-panel rounded-xl py-2 min-w-[200px] animate-fade-up shadow-lg">
                  {item.subs.map((sub) => (
                    <a
                      key={sub}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg mx-1"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden absolute right-6 text-xs text-muted-foreground">☰</div>
      </div>
    </nav>
  );
};

export default PitchNav;
