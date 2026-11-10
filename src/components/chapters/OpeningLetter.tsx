"use client";

import React from "react";
import ChapterHeader from "../editorial/ChapterHeader";
import { openingEditorLetter } from "@/content/letters";
import { celebrantContent } from "@/content/celebrant";

interface OpeningLetterProps {
  onImageClick?: (src: string) => void;
}

export default function OpeningLetter({ onImageClick }: OpeningLetterProps) {
  return (
    <section
      id="chapter-02-letter"
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-ivory border-b border-warm-grey"
      aria-label="Chapter 02 — Dear Tosin"
    >
      <div className="max-w-7xl mx-auto">
        {/* Chapter Header */}
        <ChapterHeader
          number="02"
          total="08"
          title={`Dear ${celebrantContent.preferredName}`}
          subtitle="The Editor's Note"
          headline={openingEditorLetter.headline}
          supportingLine="A private introduction to why this publication exists."
        />

        {/* Two-Column Editorial Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Candid Portrait of Celebrant */}
          <div className="lg:col-span-5">
            <div
              onClick={() => onImageClick && onImageClick(openingEditorLetter.celebrantPortrait)}
              className="relative aspect-[3/4] overflow-hidden bg-cream border border-warm-grey shadow-md cursor-pointer group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={openingEditorLetter.celebrantPortrait}
                alt={`Candid portrait of ${celebrantContent.preferredName}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Minimal caption plate */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-espresso/80 backdrop-blur-sm text-ivory flex justify-between items-center text-xs">
                <span className="font-serif italic">Plate 02 — Unrehearsed warmth</span>
                <span className="font-mono text-[10px] text-burgundy uppercase">VIEW FRAME</span>
              </div>
            </div>

            <div className="mt-3 text-right">
              <span className="font-mono text-[10px] tracking-widest text-taupe uppercase">
                FIG. 02 — ARCHIVE OF HER
              </span>
            </div>
          </div>

          {/* Right: The Opening Editor's Letter */}
          <div className="lg:col-span-7 space-y-6">
            {/* Large Decorative Opening Quotation Mark */}
            <div className="text-burgundy/30 font-serif text-7xl sm:text-8xl leading-none select-none -mb-8">
              “
            </div>

            <div className="space-y-5 text-charcoal/90 font-serif text-lg sm:text-xl leading-relaxed">
              {openingEditorLetter.body.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={idx === 0 ? "editorial-drop-cap font-normal" : "font-light"}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature Block */}
            <div className="mt-10 pt-8 border-t border-warm-grey flex flex-col sm:flex-row items-baseline justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
                  {openingEditorLetter.signature}
                </p>
                <p className="text-xs font-serif italic text-taupe mt-1">
                  November 10, 2026 • Curated in strict confidence
                </p>
              </div>

              <div className="font-mono text-[11px] tracking-widest uppercase text-taupe/80 bg-cream/70 px-3 py-1 border border-warm-grey">
                EDITION NO. 032
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

