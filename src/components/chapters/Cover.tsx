"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { LUXE_EASE } from "@/components/motion/ScrollReveal";
import { celebrantContent } from "@/content/celebrant";
import { scrollToSection } from "@/lib/utils";

interface CoverProps {
  onImageClick?: (src: string) => void;
}

export default function Cover({ onImageClick }: CoverProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for cover elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mastheadY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const mastheadOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const sideLeftX = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const sideRightX = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const promptOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="chapter-01-cover"
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-4 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-warm-grey"
      aria-label="Magazine Cover — Issue 032"
    >
      {/* Top Editorial Metadata Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: LUXE_EASE }}
        className="w-full flex flex-wrap items-center justify-between border-b border-warm-grey/80 pb-3 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-taupe"
      >
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-burgundy">{celebrantContent.issueNumber}</span>
          <span>•</span>
          <span>{celebrantContent.publicationDate}</span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-burgundy/60" />
          <span>A PRIVATE BIRTHDAY SPECIAL EDITION</span>
        </div>
        <div className="text-right">
          <span>VOL. 32 / FOLIO 01</span>
        </div>
      </motion.div>

      {/* Main Cover Composition */}
      <div className="relative my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
        {/* Massive Editorial Masthead Overlap with Parallax */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : mastheadY,
            opacity: shouldReduceMotion ? 1 : mastheadOpacity,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: LUXE_EASE }}
          className="w-full text-center select-none z-10"
        >
          <h1 className="font-serif text-[14vw] sm:text-[13vw] md:text-[11vw] lg:text-[10rem] font-light tracking-[-0.04em] leading-[0.88] text-charcoal uppercase">
            THE ART OF HER
          </h1>
        </motion.div>

        {/* Hero Visual Portrait Frame with Editorial Side Notes */}
        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center -mt-4 sm:-mt-8 md:-mt-12 z-20">
          {/* Left Editorial Teaser Annotations */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : sideLeftX,
              willChange: "transform",
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: LUXE_EASE }}
            className="hidden md:block md:col-span-3 text-right space-y-6"
          >
            <div className="border-r-2 border-burgundy pr-4 space-y-1">
              <p className="text-[10px] font-mono tracking-widest uppercase text-burgundy font-semibold">
                FEATURE PROFILE
              </p>
              <h2 className="font-serif text-xl lg:text-2xl font-normal text-charcoal leading-tight">
                A Woman of Many Beautiful Things
              </h2>
              <p className="text-xs font-sans text-taupe leading-relaxed">
                Thirty-two years of grace, depth, and unapologetic warmth.
              </p>
            </div>

            <div className="border-r-2 border-warm-grey pr-4 space-y-1">
              <p className="text-[10px] font-mono tracking-widest uppercase text-taupe">
                INSIDE THIS EDITION
              </p>
              <p className="font-serif italic text-sm text-charcoal/80">
                Letters from the inner circle, 32 reasons we love you, and the photographic archive.
              </p>
            </div>
          </motion.div>

          {/* Centerpiece Dominant Portrait (60-80% viewport) with Parallax */}
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : portraitY,
              willChange: "transform",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: LUXE_EASE }}
            className="md:col-span-6 flex flex-col items-center"
          >
            <div
              onClick={() => onImageClick && onImageClick(celebrantContent.heroPhotograph)}
              className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] overflow-hidden bg-cream shadow-2xl border border-warm-grey cursor-pointer group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={celebrantContent.heroPhotograph}
                alt={`Cover Portrait of ${celebrantContent.preferredName}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />

              {/* Cover Subject Name Plate */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-espresso/90 via-espresso/50 to-transparent p-6 text-ivory text-center">
                <span className="block text-[11px] font-mono uppercase tracking-[0.3em] text-burgundy mb-1 font-semibold">
                  COVER SUBJECT
                </span>
                <span className="font-serif text-3xl sm:text-4xl tracking-wide uppercase font-light">
                  {celebrantContent.fullName}
                </span>
                <span className="block mt-1 text-xs font-serif italic text-ivory/80">
                  Thirty-Two Years of Poise & Purpose
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Annotations & Barcode Spec */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : sideRightX,
              willChange: "transform",
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: LUXE_EASE }}
            className="hidden md:block md:col-span-3 space-y-6"
          >
            <div className="border-l-2 border-warm-grey pl-4 space-y-1">
              <p className="text-[10px] font-mono tracking-widest uppercase text-burgundy font-semibold">
                CURATED BY
              </p>
              <p className="font-serif text-sm text-charcoal">
                Her family, partners, and lifelong friends
              </p>
              <p className="text-[11px] text-taupe font-mono">
                NOT FOR NEWSSTAND SALE
              </p>
            </div>

            {/* Stylized Magazine Barcode Spec */}
            <div className="border-l-2 border-warm-grey pl-4 pt-2">
              <div className="font-mono text-[9px] tracking-widest text-taupe mb-1">
                ISBN 0-32-1011-2026
              </div>
              <div className="flex space-x-[2px] h-9 items-end opacity-70">
                {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="bg-charcoal"
                      style={{
                        width: i % 3 === 0 ? "2px" : "1px",
                        height: `${Math.max(14, (h * 4))}px`,
                      }}
                    />
                  )
                )}
              </div>
              <div className="font-mono text-[9px] tracking-widest text-taupe mt-1">
                32ND BIRTHDAY EDITION
              </div>
            </div>
          </motion.div>
        </div>

        {/* Supporting Headline Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: LUXE_EASE }}
          className="mt-6 text-center max-w-2xl mx-auto px-4"
        >
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-burgundy font-medium">
            {celebrantContent.tagline}
          </p>
          <p className="mt-2 text-sm sm:text-base font-serif italic text-taupe">
            {celebrantContent.supportingStatement}
          </p>
        </motion.div>
      </div>

      {/* Subtle Interaction Prompt (fades out as you scroll down) */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : promptOpacity,
          willChange: "opacity",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full flex justify-center pt-2"
      >
        <button
          onClick={() => scrollToSection("chapter-02-letter")}
          className="group flex flex-col items-center space-y-2 text-taupe hover:text-burgundy transition-colors focus:outline-none"
          aria-label="Begin reading the story"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] group-hover:tracking-[0.3em] transition-all">
            BEGIN THE STORY
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-burgundy" />
        </button>
      </motion.div>
    </section>
  );
}
