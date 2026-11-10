"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EditorialLetter } from "@/types";
import { cn } from "@/lib/utils";

interface FeatureLetterProps {
  letter: EditorialLetter;
  onImageClick?: (src: string) => void;
  className?: string;
}

export default function FeatureLetter({
  letter,
  onImageClick,
  className,
}: FeatureLetterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ willChange: "transform, opacity" }}
      className={cn(
        "relative bg-cream/35 border-t border-b md:border border-warm-grey p-6 sm:p-10 md:p-14 my-12 md:my-20 transition-all shadow-sm",
        className
      )}
    >
      {/* Editorial Category & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-warm-grey/60 pb-4 mb-8 text-xs font-mono tracking-widest uppercase text-taupe">
        <span className="text-burgundy font-semibold">{letter.categoryLabel}</span>
        <span>{letter.dateOrMemory || "Issue 032 Exclusive"}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Large Portrait / Photograph if provided */}
        {letter.image && (
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              onClick={() => onImageClick && onImageClick(letter.image!)}
              className="relative overflow-hidden cursor-pointer group bg-cream border border-warm-grey/50 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={letter.image}
                alt={letter.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="p-3 bg-ivory/95 border-t border-warm-grey/40 text-[11px] font-mono tracking-widest uppercase text-taupe flex justify-between items-center">
                <span>PORTRAIT WITH CELEBRANT</span>
                <span className="text-burgundy">VIEW</span>
              </div>
            </div>
          </div>
        )}

        {/* Generous Reading Column */}
        <div className={cn("order-1 lg:order-2", letter.image ? "lg:col-span-7" : "lg:col-span-10 lg:col-start-2")}>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-charcoal font-normal tracking-tight">
            {letter.title}
          </h3>

          <div className="mt-3 flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-taupe">
            <span className="font-medium text-charcoal">{letter.contributorName}</span>
            <span>•</span>
            <span className="italic font-serif normal-case">{letter.relationship}</span>
          </div>

          {/* Letter Body with Editorial Typography */}
          <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-charcoal/90 font-serif">
            {letter.body.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  index === 0 && "editorial-drop-cap leading-relaxed",
                  "text-justify-subtle"
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-10 pt-6 border-t border-warm-grey/40">
            <p className="font-serif italic text-lg sm:text-xl text-burgundy">
              {letter.signature}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
