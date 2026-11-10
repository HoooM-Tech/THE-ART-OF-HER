"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ChapterHeader from "../editorial/ChapterHeader";
import FeatureLetter from "../editorial/FeatureLetter";
import StandardLetter from "../editorial/StandardLetter";
import EditorialQuote from "../editorial/EditorialQuote";
import { ScrollReveal } from "../motion/ScrollReveal";
import { editorialLetters } from "@/content/letters";
import { cn } from "@/lib/utils";

interface ThroughTheirEyesProps {
  onImageClick?: (src: string) => void;
}

export default function ThroughTheirEyes({ onImageClick }: ThroughTheirEyesProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    { id: "all", label: "ALL VOICES" },
    { id: "The Ones Who Chose Her", label: "THE ONES WHO CHOSE HER" },
    { id: "The Ones Who Raised Her", label: "THE ONES WHO RAISED HER" },
    { id: "The Ones Who Grew With Her", label: "THE ONES WHO GREW WITH HER" },
    { id: "The Ones Who Admire Her", label: "THE ONES WHO ADMIRE HER" },
  ];

  const filteredLetters =
    selectedFilter === "all"
      ? editorialLetters
      : editorialLetters.filter((l) => l.categoryLabel === selectedFilter);

  return (
    <section
      id="chapter-06-letters"
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-ivory border-b border-warm-grey overflow-hidden"
      aria-label="Chapter 06 — Through Their Eyes"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeader
          number="06"
          total="08"
          title="Through Their Eyes"
          subtitle="The Emotional Centerpiece"
          headline="THE WOMAN WE KNOW."
          supportingLine="As told by the people who love her."
        />

        {/* Editorial Categories Navigation */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-warm-grey pb-5">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors focus:outline-none",
                    selectedFilter === cat.id
                      ? "text-ivory font-semibold border-burgundy"
                      : "bg-cream/40 text-taupe border-warm-grey hover:border-burgundy"
                  )}
                >
                  {selectedFilter === cat.id && (
                    <motion.div
                      layoutId="activeLetterFilter"
                      className="absolute inset-0 bg-burgundy -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono tracking-widest text-taupe uppercase">
              {filteredLetters.length} OF {editorialLetters.length} CONTRIBUTIONS
            </span>
          </div>
        </ScrollReveal>

        {/* Editorial Letters Feed with Distinct Visual Presentations (Type A, B, C) */}
        <div className="mt-12 space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-12"
            >
              {filteredLetters.map((letter, idx) => {
                if (letter.type === "feature") {
                  return (
                    <FeatureLetter
                      key={letter.id}
                      letter={letter}
                      onImageClick={onImageClick}
                    />
                  );
                }

                if (letter.type === "pull-quote") {
                  return (
                    <div key={letter.id} className="py-8 border-y border-warm-grey my-12 bg-cream/20 px-6 sm:px-12 shadow-sm">
                      <div className="text-[11px] font-mono tracking-widest text-burgundy uppercase mb-2">
                        {letter.categoryLabel}
                      </div>
                      <EditorialQuote
                        quote={letter.body[0]}
                        author={letter.contributorName}
                        role={letter.relationship}
                        fullViewport={false}
                      />
                    </div>
                  );
                }

                // Standard Letter (Type B)
                return (
                  <StandardLetter
                    key={letter.id}
                    letter={letter}
                    onImageClick={onImageClick}
                    reverse={idx % 2 === 1}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
