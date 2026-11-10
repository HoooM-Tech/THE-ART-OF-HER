"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "../editorial/ChapterHeader";
import EditorialImage from "../editorial/EditorialImage";
import { ScrollReveal, Parallax, StaggerContainer, StaggerItem } from "../motion/ScrollReveal";
import { timelineActs } from "@/content/memories";
import { cn } from "@/lib/utils";

interface ThroughTheYearsProps {
  onImageClick?: (src: string) => void;
}

export default function ThroughTheYears({ onImageClick }: ThroughTheYearsProps) {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="chapter-04-years"
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-ivory border-b border-warm-grey overflow-hidden"
      aria-label="Chapter 04 — The Years That Made Her"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeader
          number="04"
          total="08"
          title="The Years That Made Her"
          subtitle="A Four-Act Retrospective"
          headline="EVERY VERSION OF HER."
          supportingLine="Every chapter brought her here."
        />

        {/* Subtle Editorial Timeline Indicator */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2 md:gap-4 items-center justify-between border-b border-warm-grey pb-4">
            <div className="flex flex-wrap gap-2">
              {timelineActs.map((act, idx) => (
                <button
                  key={act.act}
                  onClick={() => setActiveActIndex(idx)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors rounded-none focus:outline-none",
                    activeActIndex === idx
                      ? "text-ivory font-semibold border-espresso"
                      : "bg-cream/40 text-taupe border-warm-grey hover:border-burgundy hover:text-burgundy"
                  )}
                >
                  {activeActIndex === idx && (
                    <motion.div
                      layoutId="activeActPill"
                      className="absolute inset-0 bg-espresso -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{act.act}:</span>{" "}
                  <span className="font-sans font-medium">{act.title}</span>
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono tracking-widest text-taupe uppercase">
              CHRONOLOGICAL ESSAY • 1994 – 2026
            </span>
          </div>
        </ScrollReveal>

        {/* Vertical Photo Essay Acts */}
        <div className="mt-12 space-y-24 md:space-y-32">
          {timelineActs.map((actItem, actIdx) => (
            <div
              key={actItem.act}
              className={cn(
                "relative pt-8 transition-opacity duration-500",
                activeActIndex === actIdx ? "opacity-100" : "opacity-90"
              )}
            >
              {/* Act Header */}
              <ScrollReveal direction="up" distance={20}>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-warm-grey/60 pb-4 mb-10">
                  <div className="flex items-baseline space-x-4">
                    <span className="font-mono text-sm tracking-widest text-burgundy font-bold">
                      {actItem.act}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-normal">
                      {actItem.title}
                    </h3>
                  </div>

                  <div className="mt-2 md:mt-0 flex items-center space-x-3 text-xs font-mono tracking-widest uppercase text-taupe">
                    <span className="italic font-serif normal-case text-charcoal">{actItem.era}</span>
                  </div>
                </div>

                <p className="max-w-2xl font-serif text-lg text-charcoal/80 italic mb-10 leading-relaxed">
                  {actItem.description}
                </p>
              </ScrollReveal>

              {/* Dynamic Editorial Photo Layouts per Act */}
              {actIdx === 0 && (
                /* ACT I: Trio of early memories (vintage / nostalgic asymmetrical layout) */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                  <div className="md:col-span-5">
                    <Parallax speed={0.06}>
                      <EditorialImage
                        src={actItem.photos[0]?.src || "/images/photo-13.jpg"}
                        alt="Early childhood memory"
                        caption={actItem.photos[0]?.caption}
                        date="Archive"
                        aspect="portrait"
                        onClick={() => onImageClick && onImageClick(actItem.photos[0]?.src || "/images/photo-13.jpg")}
                      />
                    </Parallax>
                  </div>
                  <div className="md:col-span-4">
                    <Parallax speed={-0.04}>
                      <EditorialImage
                        src={actItem.photos[1]?.src || "/images/photo-14.jpg"}
                        alt="Formative footsteps"
                        caption={actItem.photos[1]?.caption}
                        date="Archive"
                        aspect="portrait"
                        onClick={() => onImageClick && onImageClick(actItem.photos[1]?.src || "/images/photo-14.jpg")}
                      />
                    </Parallax>
                  </div>
                  <div className="md:col-span-3">
                    <EditorialImage
                      src={actItem.photos[2]?.src || "/images/photo-15.jpg"}
                      alt="Bright dreamer"
                      caption={actItem.photos[2]?.caption}
                      date="Archive"
                      aspect="portrait"
                      onClick={() => onImageClick && onImageClick(actItem.photos[2]?.src || "/images/photo-15.jpg")}
                    />
                  </div>
                </div>
              )}

              {actIdx === 1 && (
                /* ACT II: Split composition (landscape friendship + school memories) */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7">
                    <EditorialImage
                      src={actItem.photos[0]?.src || "/images/photo-17.jpg"}
                      alt="School memories and teenage dreams"
                      caption={actItem.photos[0]?.caption}
                      date="Formative Era"
                      aspect="landscape"
                      onClick={() => onImageClick && onImageClick(actItem.photos[0]?.src || "/images/photo-17.jpg")}
                    />
                  </div>
                  <div className="md:col-span-5 space-y-6">
                    <EditorialImage
                      src={actItem.photos[1]?.src || "/images/photo-18.jpg"}
                      alt="Sisterhood and shared laughter"
                      caption={actItem.photos[1]?.caption}
                      aspect="landscape"
                      onClick={() => onImageClick && onImageClick(actItem.photos[1]?.src || "/images/photo-18.jpg")}
                    />
                    <ScrollReveal delay={0.15}>
                      <div className="p-6 bg-cream/50 border border-warm-grey shadow-sm">
                        <p className="font-serif italic text-sm text-charcoal/80 leading-relaxed">
                          “Those teenage classrooms and late-night calls laid the foundation for friendships that haven’t broken in two decades.”
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              )}

              {actIdx === 2 && (
                /* ACT III: Generous 4-part spread across the adventurous twenties */
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-6">
                      <Parallax speed={0.05}>
                        <EditorialImage
                          src={actItem.photos[0]?.src || "/images/photo-21.jpg"}
                          alt="Audacious twenties milestone"
                          caption={actItem.photos[0]?.caption}
                          aspect="portrait"
                          onClick={() => onImageClick && onImageClick(actItem.photos[0]?.src || "/images/photo-21.jpg")}
                        />
                      </Parallax>
                    </div>
                    <div className="md:col-span-6">
                      <Parallax speed={-0.03}>
                        <EditorialImage
                          src={actItem.photos[1]?.src || "/images/photo-22.jpg"}
                          alt="Quiet conviction and stepping into purpose"
                          caption={actItem.photos[1]?.caption}
                          aspect="portrait"
                          onClick={() => onImageClick && onImageClick(actItem.photos[1]?.src || "/images/photo-22.jpg")}
                        />
                      </Parallax>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-4">
                      <EditorialImage
                        src={actItem.photos[2]?.src || "/images/photo-24.jpg"}
                        alt="Milestone celebration"
                        caption={actItem.photos[2]?.caption}
                        aspect="portrait"
                        onClick={() => onImageClick && onImageClick(actItem.photos[2]?.src || "/images/photo-24.jpg")}
                      />
                    </div>
                    <div className="md:col-span-8">
                      <EditorialImage
                        src={actItem.photos[4]?.src || "/images/photo-26.jpg"}
                        alt="Road trips and spontaneous horizons"
                        caption={actItem.photos[4]?.caption}
                        aspect="landscape"
                        onClick={() => onImageClick && onImageClick(actItem.photos[4]?.src || "/images/photo-26.jpg")}
                      />
                    </div>
                  </div>
                </div>
              )}

              {actIdx === 3 && (
                /* ACT IV: Full-bleed and high-impact portraits for 32nd celebration */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7">
                    <Parallax speed={0.04}>
                      <EditorialImage
                        src={actItem.photos[0]?.src || "/images/photo-04.jpg"}
                        alt="Unapologetic poise at 32"
                        caption={actItem.photos[0]?.caption}
                        date="November 2026"
                        aspect="portrait"
                        imageClassName="max-h-[680px] object-cover"
                        onClick={() => onImageClick && onImageClick(actItem.photos[0]?.src || "/images/photo-04.jpg")}
                      />
                    </Parallax>
                  </div>

                  <div className="md:col-span-5 space-y-8">
                    <ScrollReveal direction="up" delay={0.1}>
                      <div className="p-8 bg-cream border border-warm-grey shadow-sm">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-burgundy font-semibold block mb-2">
                          THE CORONATION OF 32
                        </span>
                        <h4 className="font-serif text-2xl sm:text-3xl text-charcoal leading-snug">
                          Here stands a woman rooted in herself.
                        </h4>
                        <p className="mt-4 font-serif text-base text-charcoal/80 leading-relaxed italic">
                          Not a single trial was wasted. Every victory, every quiet doubt, every courageous leap has coalesced into the breathtaking woman before us today.
                        </p>
                      </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 gap-4">
                      <EditorialImage
                        src={actItem.photos[1]?.src || "/images/photo-06.jpg"}
                        alt="Joyful laughter"
                        caption="Pure unfiltered joy"
                        aspect="portrait"
                        onClick={() => onImageClick && onImageClick(actItem.photos[1]?.src || "/images/photo-06.jpg")}
                      />
                      <EditorialImage
                        src={actItem.photos[3]?.src || "/images/photo-12.jpg"}
                        alt="Stillness and peace"
                        caption="Centering at 32"
                        aspect="square"
                        onClick={() => onImageClick && onImageClick(actItem.photos[3]?.src || "/images/photo-12.jpg")}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
