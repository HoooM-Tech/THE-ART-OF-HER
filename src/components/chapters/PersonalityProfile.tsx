"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "../editorial/ChapterHeader";
import EditorialQuote from "../editorial/EditorialQuote";
import EditorialImage from "../editorial/EditorialImage";
import { ScrollReveal, StaggerContainer, StaggerItem, Parallax } from "../motion/ScrollReveal";
import { personalityProfile, littleThings } from "@/content/memories";

interface PersonalityProfileProps {
  onImageClick?: (src: string) => void;
}

export default function PersonalityProfile({ onImageClick }: PersonalityProfileProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="chapter-03-personality"
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-cream/40 border-b border-warm-grey overflow-hidden"
      aria-label="Chapter 03 — The Art of Being Her"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeader
          number="03"
          total="08"
          title="The Art of Being Her"
          subtitle="An Editorial Study"
          headline={personalityProfile.headline}
          supportingLine="An intimate exploration of grace, discernment, quiet steel, and unmistakable style."
        />

        {/* MODULE A: THE PERSONALITY PROFILE (Asymmetrical split with large portrait) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: 300-500 Word Essay */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="none" delay={0.05}>
              <div className="flex items-center justify-between border-b border-warm-grey/60 pb-3 text-xs font-mono uppercase tracking-widest text-taupe">
                <span className="text-burgundy font-semibold">MODULE A: THE PROFILE</span>
                <span>{personalityProfile.readTime}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-snug">
                Equilibrium in an age of noise.
              </h3>
            </ScrollReveal>

            <StaggerContainer staggerDelay={0.12} className="space-y-5 text-charcoal/90 font-serif text-base sm:text-lg leading-relaxed">
              {personalityProfile.body.map((para, i) => (
                <StaggerItem key={i} distance={16}>
                  <p className={i === 0 ? "editorial-drop-cap font-normal" : "font-light"}>
                    {para}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Small lifestyle triptych underneath profile */}
            <div className="pt-6 grid grid-cols-2 gap-4">
              <EditorialImage
                src="/images/photo-03.jpg"
                alt="Adventures and spontaneous joy"
                caption="Adventures on the open road"
                aspect="landscape"
                onClick={() => onImageClick && onImageClick("/images/photo-03.jpg")}
              />
              <EditorialImage
                src="/images/photo-05.jpg"
                alt="Golden hour recollections"
                caption="Golden light, warm spirit"
                aspect="landscape"
                onClick={() => onImageClick && onImageClick("/images/photo-05.jpg")}
              />
            </div>
          </div>

          {/* Right Column: Dominant Editorial Portrait (photo-11) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Parallax speed={0.06}>
              <EditorialImage
                src="/images/photo-11.jpg"
                alt="Editorial portrait feature"
                caption="Plate 03 — A Woman of Many Beautiful Things"
                date="2026 Studio Session"
                plateNumber="03"
                aspect="portrait"
                imageClassName="h-[650px] object-cover"
                onClick={() => onImageClick && onImageClick("/images/photo-11.jpg")}
              />

              <ScrollReveal delay={0.2} distance={20}>
                <div className="mt-6 p-6 bg-ivory border border-warm-grey/80 shadow-sm">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-burgundy font-semibold block mb-2">
                    EDITORIAL CURATOR NOTE
                  </span>
                  <p className="font-serif italic text-sm text-charcoal/80 leading-relaxed">
                    “She possesses a rare quality that cannot be rehearsed: an authentic ease in her own skin that makes everyone else exhale.”
                  </p>
                </div>
              </ScrollReveal>
            </Parallax>
          </div>
        </div>

        {/* MODULE C: THE DEFINING QUOTE */}
        <div className="my-16 md:my-24 py-8 border-y border-warm-grey">
          <EditorialQuote
            quote={personalityProfile.definingQuote.quote}
            author={personalityProfile.definingQuote.attribution}
            role="Issue No. 032 Editorial Board"
            fullViewport={false}
          />
        </div>

        {/* MODULE B: THE LITTLE THINGS (Editorial Index of 8 Personal Details) */}
        <div className="mt-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-warm-grey pb-4 mb-8">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-burgundy font-semibold">
                  MODULE B: THE INDEX
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mt-1">
                  The Little Things
                </h3>
              </div>
              <p className="font-serif italic text-sm text-taupe mt-2 md:mt-0">
                An editorial catalog of rituals, habits, and private sanctuaries.
              </p>
            </div>
          </ScrollReveal>

          {/* Thoughtfully Designed Asymmetrical Grid with Staggered Scroll Reveal and Interactive Hover Lift */}
          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {littleThings.map((item, idx) => (
              <StaggerItem key={item.id} distance={20}>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -5, borderColor: "#722F37" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="bg-ivory border border-warm-grey/60 p-6 flex flex-col justify-between h-full transition-colors group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-taupe mb-3">
                      <span className="text-burgundy font-semibold">{item.detailType}</span>
                      <span>0{idx + 1}</span>
                    </div>

                    <h4 className="font-serif text-lg text-charcoal font-normal group-hover:text-burgundy transition-colors">
                      {item.prompt}
                    </h4>

                    <p className="mt-3 font-serif italic text-sm text-charcoal/85 leading-relaxed">
                      “{item.response.replace(/^'|'$/g, '')}”
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-warm-grey/30 text-[9px] font-mono tracking-widest text-taupe/60 uppercase">
                    VERIFIED OBSERVATION
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Complementary Visual Rhythm: photo-07 & photo-10 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <EditorialImage
                src="/images/photo-07.jpg"
                alt="Intimate close-up portrait"
                caption="Quiet reflection between chapters"
                aspect="portrait"
                onClick={() => onImageClick && onImageClick("/images/photo-07.jpg")}
              />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal direction="up" delay={0.15}>
                <div className="bg-ivory p-8 sm:p-12 border border-warm-grey flex flex-col justify-center shadow-sm">
                  <span className="text-xs font-mono tracking-widest text-burgundy uppercase font-semibold">
                    THE SUM OF DETAILS
                  </span>
                  <p className="mt-4 font-serif text-2xl sm:text-3xl text-charcoal leading-snug font-normal">
                    A life is not measured solely in grand milestones, but in the texture of everyday kindness, shared coffee, and the quiet consistency of being true to who you are.
                  </p>
                  <div className="mt-6 flex items-center space-x-3 text-xs font-mono uppercase tracking-widest text-taupe">
                    <div className="w-8 h-[1px] bg-burgundy" />
                    <span>OBSERVATIONS FROM HER INNER CIRCLE</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
