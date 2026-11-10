"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Printer, BookOpen, Heart } from "lucide-react";
import { celebrantContent } from "@/content/celebrant";
import { openingEditorLetter, editorialLetters } from "@/content/letters";
import { personalityProfile, timelineActs, closingLetterContent } from "@/content/memories";
import { thirtyTwoReasons } from "@/content/reasons";

interface KeepsakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeepsakeModal({ isOpen, onClose }: KeepsakeModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-espresso/90 backdrop-blur-md flex flex-col items-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Keepsake Magazine Edition"
        >
      {/* Top Action Bar */}
      <div className="w-full max-w-4xl bg-ivory border-b border-warm-grey p-4 flex items-center justify-between shadow-lg sticky top-0 z-10 no-print">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-burgundy" />
          <div>
            <span className="font-serif text-lg font-medium text-charcoal">
              THE ART OF HER — KEEPSAKE PUBLICATION
            </span>
            <span className="block text-[10px] font-mono tracking-widest text-taupe uppercase">
              COMPLETE 6-PAGE PRINT & PDF EDITION
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-burgundy hover:bg-burgundy/90 text-ivory text-xs font-mono uppercase tracking-widest rounded shadow transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE AS PDF</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-taupe hover:text-charcoal hover:bg-cream rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Printable Magazine Keepsake Container */}
      <div className="w-full max-w-4xl bg-[#FFFFFF] text-[#24211F] p-8 sm:p-14 shadow-2xl my-6 border border-warm-grey">
        {/* ==================== PAGE 1: THE COVER ==================== */}
        <div className="min-h-[92vh] flex flex-col justify-between border-b-2 border-dashed border-warm-grey pb-12 mb-12">
          <div className="flex justify-between text-xs font-mono tracking-widest text-taupe uppercase border-b border-warm-grey pb-2">
            <span>{celebrantContent.issueNumber}</span>
            <span>{celebrantContent.publicationDate}</span>
            <span>PRIVATE BIRTHDAY EDITION</span>
          </div>

          <div className="text-center my-6">
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight uppercase">
              THE ART OF HER
            </h1>
            <p className="text-xs font-mono tracking-[0.25em] text-burgundy uppercase mt-2">
              A LIFE WORTH DOCUMENTING. A WOMAN WORTH CELEBRATING.
            </p>
          </div>

          <div className="max-w-md mx-auto aspect-[3/4] overflow-hidden bg-cream border border-warm-grey shadow-md my-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={celebrantContent.heroPhotograph}
              alt="Cover Portrait"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-wide">
              {celebrantContent.fullName}
            </h2>
            <p className="font-serif italic text-base text-taupe mt-1">
              Thirty-Two Years of Grace, Poise, and Love
            </p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-taupe mt-3">
              NOT FOR NEWSSTAND SALE • PRIVATE ARCHIVE
            </p>
          </div>
        </div>

        {/* ==================== PAGE 2: OPENING NOTE & PROFILE ==================== */}
        <div className="print-page-break border-b-2 border-dashed border-warm-grey pb-12 mb-12">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-burgundy mb-4 border-b border-warm-grey pb-2">
            <span>CHAPTER 02 & 03</span>
            <span>THE OPENING LETTER & PROFILE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            <div className="md:col-span-7 space-y-4 font-serif text-sm leading-relaxed text-charcoal/90">
              <h2 className="font-serif text-2xl font-normal mb-2">
                Before You Turn The Page…
              </h2>
              {openingEditorLetter.body.slice(0, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-serif italic text-burgundy text-sm font-medium pt-2">
                {openingEditorLetter.signature}
              </p>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="aspect-[3/4] overflow-hidden bg-cream border border-warm-grey">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={celebrantContent.openingPhotograph}
                  alt="Opening portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif italic text-xs text-taupe text-center">
                “An entire publication dedicated to the art of being her.”
              </p>
            </div>
          </div>

          <div className="p-6 bg-cream/30 border border-warm-grey space-y-3">
            <h3 className="font-serif text-xl font-normal text-charcoal">
              The Art of Being Her — Personality Profile
            </h3>
            <p className="font-serif text-xs leading-relaxed text-charcoal/80">
              {personalityProfile.body[0]}
            </p>
            <p className="font-serif text-xs leading-relaxed text-charcoal/80">
              {personalityProfile.body[1]}
            </p>
          </div>
        </div>

        {/* ==================== PAGE 3: LIFE TIMELINE ==================== */}
        <div className="print-page-break border-b-2 border-dashed border-warm-grey pb-12 mb-12">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-burgundy mb-4 border-b border-warm-grey pb-2">
            <span>CHAPTER 04</span>
            <span>THE YEARS THAT MADE HER (ACTS I – IV)</span>
          </div>

          <h2 className="font-serif text-3xl font-normal mb-6">
            Every Version of Her
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {timelineActs.map((act) => (
              <div key={act.act} className="border border-warm-grey/60 p-4 space-y-3">
                <div className="flex justify-between text-[11px] font-mono tracking-widest text-burgundy uppercase">
                  <span>{act.act}</span>
                  <span className="text-taupe">{act.era}</span>
                </div>
                <h4 className="font-serif text-lg font-normal text-charcoal">{act.title}</h4>
                <div className="aspect-[16/10] overflow-hidden bg-cream border border-warm-grey">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={act.photos[0]?.src || "/images/photo-01.jpg"}
                    alt={act.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-serif text-xs text-charcoal/80 italic">{act.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== PAGE 4: LETTERS FROM LOVED ONES ==================== */}
        <div className="print-page-break border-b-2 border-dashed border-warm-grey pb-12 mb-12">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-burgundy mb-4 border-b border-warm-grey pb-2">
            <span>CHAPTER 06</span>
            <span>THROUGH THEIR EYES — LETTERS</span>
          </div>

          <h2 className="font-serif text-3xl font-normal mb-6">
            The Woman We Know
          </h2>

          <div className="space-y-6">
            {editorialLetters.map((letter) => (
              <div key={letter.id} className="p-4 bg-cream/20 border border-warm-grey/60 keep-together">
                <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase text-burgundy mb-1">
                  <span>{letter.categoryLabel}</span>
                  <span>{letter.contributorName} ({letter.relationship})</span>
                </div>
                <h3 className="font-serif text-lg font-normal text-charcoal">
                  {letter.title}
                </h3>
                <div className="mt-2 space-y-1.5 font-serif text-xs leading-relaxed text-charcoal/90">
                  {letter.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <p className="font-serif italic text-xs text-burgundy mt-2 font-medium">
                  {letter.signature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== PAGE 5: ALL 32 REASONS WE LOVE YOU ==================== */}
        <div className="print-page-break border-b-2 border-dashed border-warm-grey pb-12 mb-12">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-burgundy mb-4 border-b border-warm-grey pb-2">
            <span>CHAPTER 07</span>
            <span>THIRTY-TWO REASONS (COMPLETE INDEX)</span>
          </div>

          <h2 className="font-serif text-3xl font-normal mb-6">
            32 Reasons We Love You
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[11px] font-serif leading-snug">
            {thirtyTwoReasons.map((r) => (
              <div key={r.number} className="border-b border-warm-grey/30 pb-2">
                <span className="font-mono text-burgundy font-semibold mr-1">{r.number}.</span>
                <span className="font-medium text-charcoal">{r.headline}:</span>{" "}
                <span className="text-taupe italic">{r.description}</span>
                {r.contributor && (
                  <span className="block text-[9px] font-mono text-burgundy/70 mt-0.5">
                    — {r.contributor}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==================== PAGE 6: THE NEXT CHAPTER & COLOPHON ==================== */}
        <div className="print-page-break flex flex-col justify-between min-h-[85vh] p-4">
          <div>
            <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-burgundy mb-4 border-b border-warm-grey pb-2">
              <span>CHAPTER 08</span>
              <span>THE NEXT CHAPTER & COLOPHON</span>
            </div>

            <h2 className="font-serif text-3xl font-normal mb-4">
              And The Story Continues.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-6">
              <div className="md:col-span-5 aspect-[3/4] overflow-hidden bg-cream border border-warm-grey shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={closingLetterContent.closingPhotograph}
                  alt="Closing Master Portrait"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-4 font-serif text-sm leading-relaxed text-charcoal/90">
                {closingLetterContent.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p className="font-serif italic text-burgundy pt-2 font-medium">
                  {closingLetterContent.signature}
                </p>
              </div>
            </div>
          </div>

          {/* Colophon Card */}
          <div className="p-8 bg-espresso text-ivory text-center space-y-3 mt-8">
            <h3 className="font-serif text-2xl font-light tracking-wide">
              {closingLetterContent.statement}
            </h3>
            <p className="font-serif text-lg font-normal text-burgundy">
              {closingLetterContent.subStatement}
            </p>
            <div className="pt-4 border-t border-ivory/20 flex justify-between text-[10px] font-mono tracking-widest text-ivory/60 uppercase">
              <span>THE ART OF HER • ISSUE 032</span>
              <span>CURATED WITH LOVE • NOVEMBER 2026</span>
              <span>END OF ISSUE 032</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
);
}
