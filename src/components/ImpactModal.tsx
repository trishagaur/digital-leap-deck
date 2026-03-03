import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ModalBullet {
  label: string;
  value?: string;
}

export interface ModalData {
  mode: "simple" | "detailed";
  overline?: string;
  title: string;
  description: string;
  bullets?: ModalBullet[];
  /** ReactNode rendered in the coloured right pane (detailed mode only) */
  chart?: ReactNode;
  /** Tailwind gradient classes for right pane — default blue→indigo */
  accentGradient?: string;
}

interface ImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

export const ImpactModal = ({ isOpen, onClose, data }: ImpactModalProps) => {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && data && (
        /* ── Backdrop ── */
        <motion.div
          key="modal-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px) saturate(160%) brightness(0.7)",
            WebkitBackdropFilter: "blur(12px) saturate(160%) brightness(0.7)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          {/* ── Panel ── */}
          <motion.div
            className={`relative bg-white rounded-[24px] shadow-2xl overflow-hidden max-w-[90vw] max-h-[85vh] ${
              data.mode === "detailed" ? "flex w-[860px]" : "w-[520px]"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/[0.06] hover:bg-black/[0.14] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* ── Left / single pane ── */}
            <div
              className={`p-10 flex flex-col justify-center overflow-y-auto ${
                data.mode === "detailed" ? "w-[60%] border-r border-gray-100" : "w-full"
              }`}
            >
              {data.overline && (
                <span className="inline-flex w-fit px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-4">
                  {data.overline}
                </span>
              )}
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
                {data.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {data.description}
              </p>
              {data.bullets && data.bullets.length > 0 && (
                <ul className="space-y-3">
                  {data.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[3px] w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      <span className="text-sm text-gray-600 leading-snug">
                        {b.value && (
                          <span className="font-semibold text-gray-900">{b.value}&nbsp;</span>
                        )}
                        {b.label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Right pane — detailed mode only ── */}
            {data.mode === "detailed" && data.chart && (
              <div
                className={`w-[40%] flex items-center justify-center p-8 ${
                  data.accentGradient ?? "bg-gradient-to-br from-blue-600 to-indigo-700"
                }`}
              >
                {data.chart}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
