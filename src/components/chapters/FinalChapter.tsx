"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "../editorial/ChapterHeader";
import { ScrollReveal, Parallax, StaggerContainer, StaggerItem } from "../motion/ScrollReveal";
import { closingLetterContent } from "@/content/memories";
import { celebrantContent } from "@/content/celebrant";
import { scrollToSection } from "@/lib/utils";
import { ArrowUp, Download, Heart } from "lucide-react";

interface FinalChapterProps {
  onImageClick?: (src: string) => void;
  onOpenKeepsake?: () => void;
}

export default function FinalChapter({
  onImageClick,
  onOpenKeepsake,
}: FinalChapterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="chapter-08-future"
      className="py-16 md:py-32 px-4 sm:px-6 lg:px-12 bg-espresso text-ivory border-b border-warm-grey/20 relative overflow-hidden"
      aria-label="Chapter 08 — The Next Chapter"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeader
          number="08"
          total="08"
          title="The Next Chapter"
          subtitle="The Epilogue & Colophon"
          headline={closingLetterContent.title}
          supportingLine="The best is yet to come. Happy 32nd Birthday."
          theme="dark"
        />

        {/* Master Visual & Closing Letter Split Spread */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Dominant Final Portrait (photo-28) with Parallax */}
          <div className="lg:col-span-6">
            <Parallax speed={0.06}>
              <ScrollReveal direction="left" distance={30}>
                <div
                  onClick={() => onImageClick && onImageClick(closingLetterContent.closingPhotograph)}
                  className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-ivory/20 shadow-2xl cursor-pointer group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={closingLetterContent.closingPhotograph}
                    alt={`Final master portrait of ${celebrantContent.preferredName}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                  />

                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-espresso via-espresso/60 to-transparent flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-burgundy uppercase block">
                        THE FINAL MASTER PLATE
                      </span>
                      <span className="font-serif text-2xl tracking-wide">
                        {celebrantContent.preferredName} at 32
                      </span>
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-ivory/60 uppercase">
                      EXPAND
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </Parallax>
          </div>

          {/* Closing Letter & Declarations */}
          <div className="lg:col-span-6 space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="border-b border-ivory/15 pb-4">
                <span className="text-xs font-mono tracking-[0.2em] text-burgundy uppercase font-semibold">
                  AN EPILOGUE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal mt-2 leading-tight">
                  Gratitude for who you are. Excitement for all you will be.
                </h3>
              </div>
            </ScrollReveal>

            <StaggerContainer staggerDelay={0.12} className="space-y-5 text-ivory/80 font-serif text-lg sm:text-xl leading-relaxed">
              {closingLetterContent.body.map((para, i) => (
                <StaggerItem key={i} distance={16}>
                  <p className={i === 0 ? "editorial-drop-cap font-normal" : "font-light"}>
                    {para}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Closing Statement */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="pt-6 border-t border-ivory/15 space-y-3">
                <p className="font-serif text-2xl sm:text-3xl text-burgundy font-normal tracking-wide">
                  {closingLetterContent.statement}
                </p>
                <p className="font-serif text-xl sm:text-2xl text-ivory font-light">
                  HAPPY 32ND BIRTHDAY, {celebrantContent.preferredName.toUpperCase()}.
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-ivory/60 flex items-center space-x-2">
                  <span>{closingLetterContent.signature}</span>
                  <motion.span
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy inline" />
                  </motion.span>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Editorial Colophon */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="mt-24 pt-16 border-t border-ivory/20 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono uppercase tracking-widest text-ivory/60">
            <div>
              <span className="block text-ivory font-serif text-lg mb-1 normal-case tracking-normal">
                The Art of Her
              </span>
              <p>Issue No. 032 • Private Edition</p>
              <p>A Private Birthday Publication</p>
            </div>

            <div>
              <span className="block text-burgundy font-semibold mb-1">
                CURATED WITH LOVE
              </span>
              <p>Published: November 10, 2026</p>
              <p>Occasion: 32nd Birthday Special</p>
            </div>

            <div className="md:text-right">
              <span className="block text-ivory mb-1">END OF ISSUE 032</span>
              <p>© 2026 All Rights Reserved by Her Loved Ones</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Final Interactive Controls: Revisit Story & Download Keepsake */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-ivory/10 no-print">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => scrollToSection("chapter-01-cover")}
              className="group flex items-center space-x-2.5 px-6 py-3 border border-ivory/30 bg-transparent hover:bg-ivory hover:text-espresso text-ivory text-xs font-mono uppercase tracking-[0.2em] transition-all"
              aria-label="Revisit the story from the beginning"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              <span>REVISIT THE STORY ↑</span>
            </motion.button>

            {onOpenKeepsake && (
              <motion.button
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={onOpenKeepsake}
                className="group flex items-center space-x-2.5 px-6 py-3 border border-burgundy bg-burgundy hover:bg-burgundy/90 text-ivory text-xs font-mono uppercase tracking-[0.2em] transition-all shadow-lg"
                aria-label="Download Keepsake Edition"
              >
                <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                <span>DOWNLOAD THE EDITION</span>
              </motion.button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
