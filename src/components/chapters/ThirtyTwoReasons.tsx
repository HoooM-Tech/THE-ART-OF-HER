"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ChapterHeader from "../editorial/ChapterHeader";
import EditorialImage from "../editorial/EditorialImage";
import { ScrollReveal, Parallax } from "../motion/ScrollReveal";
import { thirtyTwoReasons } from "@/content/reasons";
import { cn } from "@/lib/utils";

interface ThirtyTwoReasonsProps {
  onImageClick?: (src: string) => void;
}

export default function ThirtyTwoReasons({ onImageClick }: ThirtyTwoReasonsProps) {
  const [selectedSequence, setSelectedSequence] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Divide into 4 sequences of 8
  const sequence1 = thirtyTwoReasons.slice(0, 8);   // 01 - 08: Essence & Presence
  const sequence2 = thirtyTwoReasons.slice(8, 16);  // 09 - 16: Heart & Character
  const sequence3 = thirtyTwoReasons.slice(16, 24); // 17 - 24: Style & Everyday Magic
  const sequence4 = thirtyTwoReasons.slice(24, 32); // 25 - 32: The 32nd Year & Beyond

  const sequences = [
    { title: "I. ESSENCE & PRESENCE", subtitle: "Reasons 01 to 08", items: sequence1 },
    { title: "II. HEART & CHARACTER", subtitle: "Reasons 09 to 16", items: sequence2 },
    { title: "III. STYLE & EVERYDAY MAGIC", subtitle: "Reasons 17 to 24", items: sequence3 },
    { title: "IV. THE 32ND YEAR & BEYOND", subtitle: "Reasons 25 to 32", items: sequence4 },
  ];

  const displayedSequences =
    selectedSequence !== null
      ? [sequences[selectedSequence]]
      : sequences;

  return (
    <section
      id="chapter-07-reasons"
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-cream/25 border-b border-warm-grey overflow-hidden"
      aria-label="Chapter 07 — 32 Reasons We Love You"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeader
          number="07"
          total="08"
          title="32 Reasons We Love You"
          subtitle="Thirty-Two Reflections"
          headline="THIRTY-TWO REASONS."
          supportingLine="As though we could ever stop at 32."
        />

        {/* Sequence Filter Navigation */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-warm-grey pb-5">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSequence(null)}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors focus:outline-none",
                  selectedSequence === null
                    ? "text-ivory font-semibold border-espresso"
                    : "bg-ivory text-taupe border-warm-grey hover:border-burgundy"
                )}
              >
                {selectedSequence === null && (
                  <motion.div
                    layoutId="activeReasonSequence"
                    className="absolute inset-0 bg-espresso -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                ALL 32 REASONS
              </button>

              {sequences.map((seq, idx) => (
                <button
                  key={seq.title}
                  onClick={() => setSelectedSequence(idx)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors focus:outline-none",
                    selectedSequence === idx
                      ? "text-ivory font-semibold border-burgundy"
                      : "bg-ivory text-taupe border-warm-grey hover:border-burgundy"
                  )}
                >
                  {selectedSequence === idx && (
                    <motion.div
                      layoutId="activeReasonSequence"
                      className="absolute inset-0 bg-burgundy -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  PART {idx + 1} ({seq.subtitle})
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono tracking-widest text-taupe uppercase">
              A PROGRESSION FROM 01 TO 32
            </span>
          </div>
        </ScrollReveal>

        {/* 4 Sequences of 8 with Editorial Variation */}
        <div className="mt-14 space-y-20 md:space-y-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSequence !== null ? `seq-${selectedSequence}` : "all-seqs"}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-20 md:space-y-28"
            >
              {displayedSequences.map((seq) => (
                <div key={seq.title} className="relative">
                  {/* Sequence Intertitle */}
                  <ScrollReveal direction="up" distance={20}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-warm-grey/60 pb-3 mb-10">
                      <div className="flex items-baseline space-x-3">
                        <span className="text-xs font-mono tracking-widest text-burgundy uppercase font-semibold">
                          SEQUENCE
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                          {seq.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs tracking-widest text-taupe uppercase mt-1 sm:mt-0">
                        {seq.subtitle}
                      </span>
                    </div>
                  </ScrollReveal>

                  {/* Varied Editorial Layout */}
                  <div className="space-y-10">
                    {seq.items.map((item, itemIdx) => {
                      const isEven = itemIdx % 2 === 0;
                      const isStatement = item.number === "01" || item.number === "16" || item.number === "26" || item.number === "32";

                      if (isStatement) {
                        /* Full-width dramatic editorial statement with scroll reveal */
                        return (
                          <ScrollReveal key={item.number} direction="up" distance={32}>
                            <div className="p-8 sm:p-14 bg-ivory border-y md:border border-warm-grey relative overflow-hidden shadow-sm">
                              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
                                <div className="flex items-baseline space-x-4">
                                  <span className="font-serif text-6xl sm:text-7xl lg:text-8xl text-burgundy/40 font-light leading-none select-none">
                                    {item.number}
                                  </span>
                                  <div>
                                    <span className="text-[10px] font-mono tracking-widest text-taupe uppercase">
                                      KEY OBSERVATION
                                    </span>
                                    <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-normal leading-tight mt-1">
                                      {item.headline}
                                    </h4>
                                  </div>
                                </div>

                                {item.contributor && (
                                  <span className="font-mono text-xs uppercase tracking-widest text-burgundy">
                                    — {item.contributor}
                                  </span>
                                )}
                              </div>

                              <p className="mt-6 font-serif italic text-lg sm:text-xl text-charcoal/85 max-w-3xl leading-relaxed">
                                “{item.description}”
                              </p>

                              {item.photo && (
                                <div className="mt-8 max-w-md">
                                  <EditorialImage
                                    src={item.photo}
                                    alt={item.headline}
                                    caption={`Reason ${item.number} in practice`}
                                    aspect="landscape"
                                    onClick={() => onImageClick && onImageClick(item.photo!)}
                                  />
                                </div>
                              )}
                            </div>
                          </ScrollReveal>
                        );
                      }

                      // Alternating left/right editorial blocks
                      return (
                        <ScrollReveal key={item.number} direction="up" distance={20}>
                          <div
                            className={cn(
                              "grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-warm-grey/30",
                              isEven ? "" : "md:flex-row-reverse"
                            )}
                          >
                            {/* Oversized Number & Headline */}
                            <div className="md:col-span-5 flex items-baseline space-x-4">
                              <span className="font-serif text-4xl sm:text-5xl text-burgundy/60 font-light leading-none min-w-[3rem]">
                                {item.number}
                              </span>
                              <div>
                                <h4 className="font-serif text-xl sm:text-2xl text-charcoal font-normal">
                                  {item.headline}
                                </h4>
                                {item.contributor && (
                                  <span className="text-[11px] font-mono tracking-widest text-taupe uppercase block mt-1">
                                    CONTRIBUTED BY {item.contributor}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Description & Optional Photo */}
                            <div className="md:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                              <p className="font-serif text-base sm:text-lg text-charcoal/80 leading-relaxed italic flex-1">
                                “{item.description}”
                              </p>

                              {item.photo && (
                                <div className="w-24 sm:w-32 flex-shrink-0">
                                  <motion.div
                                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                    onClick={() => onImageClick && onImageClick(item.photo!)}
                                    className="aspect-square bg-cream border border-warm-grey cursor-pointer overflow-hidden group shadow-sm"
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.photo}
                                      alt={item.headline}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                  </motion.div>
                                </div>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
