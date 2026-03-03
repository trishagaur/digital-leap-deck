/**
 * Inline chart components used in the right pane of ImpactModal (detailed mode).
 * All use Tailwind + minimal inline styles — no external chart lib required.
 */

/* ─── Growth: completions 29 → 132 ─────────────────────────────────────── */
export const GrowthChart = () => (
  <div className="w-full text-white flex flex-col items-center gap-2">
    <p className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase mb-4">
      Digital Completions
    </p>

    {/* Bars */}
    <div className="flex items-end justify-center gap-10 w-full">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white/70 text-lg font-bold">29</span>
        <div className="w-12 bg-white/25 rounded-t-xl" style={{ height: 36 }} />
        <span className="text-white/50 text-xs">Before</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-2xl font-black">132</span>
        <div className="w-12 bg-white rounded-t-xl" style={{ height: 130 }} />
        <span className="text-white/50 text-xs">After</span>
      </div>
    </div>

    {/* Big stat */}
    <div className="w-full mt-4 pt-4 border-t border-white/20 text-center">
      <p className="text-white text-4xl font-black">4.5×</p>
      <p className="text-white/60 text-xs mt-1">Growth in one year</p>
    </div>
  </div>
);

/* ─── Velocity: 12 epics, 4 400+ SP ────────────────────────────────────── */
export const VelocityChart = () => (
  <div className="w-full text-white flex flex-col items-center gap-4">
    <p className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
      12 Epics Delivered
    </p>

    {/* Epic grid */}
    <div className="grid grid-cols-4 gap-2 w-full">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl flex items-center justify-center text-xs font-bold text-white/80"
          style={{ background: `rgba(255,255,255,${0.10 + (i / 11) * 0.25})` }}
        >
          E{i + 1}
        </div>
      ))}
    </div>

    {/* Three-stat row */}
    <div className="w-full flex justify-between text-center gap-2 pt-3 border-t border-white/20">
      <div>
        <p className="text-white text-xl font-black">4,400+</p>
        <p className="text-white/50 text-[0.62rem] mt-0.5">Story Points</p>
      </div>
      <div className="w-px bg-white/20" />
      <div>
        <p className="text-white text-xl font-black">~220</p>
        <p className="text-white/50 text-[0.62rem] mt-0.5">Per Sprint</p>
      </div>
      <div className="w-px bg-white/20" />
      <div>
        <p className="text-white text-xl font-black">6</p>
        <p className="text-white/50 text-[0.62rem] mt-0.5">Releases</p>
      </div>
    </div>
  </div>
);

/* ─── Efficiency: before/after delivery time ────────────────────────────── */
export const EfficiencyChart = () => (
  <div className="w-full text-white flex flex-col gap-5">
    <p className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase text-center">
      Delivery Time
    </p>

    {/* Bars */}
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between text-xs mb-2">
          <span className="text-white/70 font-medium">Before</span>
          <span className="text-white/70">100%</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full" />
      </div>
      <div>
        <div className="flex justify-between text-xs mb-2">
          <span className="text-white font-semibold">After</span>
          <span className="text-white font-bold">~50%</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full">
          <div className="h-3 bg-white rounded-full" style={{ width: "50%" }} />
        </div>
      </div>
    </div>

    {/* Big stat */}
    <div className="pt-4 border-t border-white/20 text-center">
      <p className="text-white text-4xl font-black">~50%</p>
      <p className="text-white/60 text-xs mt-1">Faster + $10K+ saved annually</p>
    </div>
  </div>
);

/* ─── Trust: member conversion funnel ──────────────────────────────────── */
export const TrustChart = () => (
  <div className="w-full text-white flex flex-col gap-4">
    <p className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase text-center mb-1">
      Member Journey
    </p>

    {[
      { label: "Members Started", pct: 100 },
      { label: "Qualified", pct: 66 },
      { label: "Completed", pct: 40 },
    ].map((row) => (
      <div key={row.label}>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-white/70">{row.label}</span>
          <span className="text-white font-semibold">{row.pct}%</span>
        </div>
        <div className="h-2.5 bg-white/15 rounded-full">
          <div className="h-2.5 bg-white rounded-full" style={{ width: `${row.pct}%` }} />
        </div>
      </div>
    ))}

    <div className="pt-4 border-t border-white/20 text-center">
      <p className="text-white text-3xl font-black">−26.3pp</p>
      <p className="text-white/60 text-xs mt-1">Reduction in ineligible starts</p>
    </div>
  </div>
);

/* ─── AI SDLC: phase pipeline ───────────────────────────────────────────── */
export const AISDLCChart = () => (
  <div className="w-full text-white flex flex-col gap-3">
    <p className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase text-center mb-2">
      AI-Augmented SDLC
    </p>

    {[
      { phase: "Design", tool: "Figma AI" },
      { phase: "Develop", tool: "Copilot + Gen" },
      { phase: "Test", tool: "Auto Scaffold" },
      { phase: "Deploy", tool: "AI Planning" },
    ].map((row) => (
      <div key={row.phase} className="flex items-center gap-3">
        <span className="text-white/70 text-xs w-14 flex-shrink-0 font-medium">
          {row.phase}
        </span>
        <div className="flex-1 h-2 bg-white/15 rounded-full">
          <div className="h-2 bg-white rounded-full w-full" />
        </div>
        <span className="text-white/50 text-[0.6rem] w-20 text-right flex-shrink-0">
          {row.tool}
        </span>
      </div>
    ))}

    <div className="pt-4 mt-1 border-t border-white/20 text-center">
      <p className="text-white text-3xl font-black">100%</p>
      <p className="text-white/60 text-xs mt-1">AI adoption across every phase</p>
    </div>
  </div>
);
