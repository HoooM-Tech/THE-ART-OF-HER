"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EditorialLetter } from "@/types";
import { cn } from "@/lib/utils";

interface StandardLetterProps {
  letter: EditorialLetter;
  onImageClick?: (src: string) => void;
  reverse?: boolean;
  className?: string;
}

export default function StandardLetter({
  letter,
  onImageClick,
  reverse = false,
  className,
}: StandardLetterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ willChange: "transform, opacity" }}
      className={cn(
        "py-10 md:py-16 border-b border-warm-grey/50",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Photo Column */}
        {letter.image && (
          <div className={cn("md:col-span-5", reverse ? "md:order-2" : "md:order-1")}>
            <div
              onClick={() => onImageClick && onImageClick(letter.image!)}
              className="relative overflow-hidden cursor-pointer group bg-cream border border-warm-grey/40 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={letter.image}
                alt={letter.title}
                className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="p-2.5 bg-ivory text-[10px] font-mono tracking-widest uppercase text-taupe flex justify-between">
                <span>{letter.contributorName}</span>
                <span className="text-burgundy">ENLARGE</span>
              </div>
            </div>
          </div>
        )}

        {/* Text Column */}
        <div className={cn(letter.image ? "md:col-span-7" : "md:col-span-10 md:col-start-2", reverse ? "md:order-1" : "md:order-2")}>
          <div className="text-[11px] font-mono tracking-widest uppercase text-burgundy mb-2">
            {letter.categoryLabel}
          </div>

          <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal font-normal leading-tight">
            {letter.title}
          </h4>

          <div className="mt-2 text-xs font-sans uppercase tracking-widest text-taupe">
            <span>{letter.contributorName}</span> — <span className="italic font-serif normal-case">{letter.relationship}</span>
          </div>

          <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-charcoal/90 font-serif">
            {letter.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-warm-grey/30">
            <p className="font-serif italic text-base text-burgundy">{letter.signature}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
