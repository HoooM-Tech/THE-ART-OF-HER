"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ChapterHeader from "../editorial/ChapterHeader";
import EditorialImage from "../editorial/EditorialImage";
import { ScrollReveal, Parallax } from "../motion/ScrollReveal";
import { memoryCollections } from "@/content/memories";
import { cn } from "@/lib/utils";

interface PhotoDiariesProps {
  onImageClick?: (src: string) => void;
}

export default function PhotoDiaries({ onImageClick }: PhotoDiariesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  const displayedCollections =
    selectedCategory === "all"
      ? memoryCollections
      : memoryCollections.filter((c) => c.id === selectedCategory);

  return (
    <section
      id="chapter-05-memories"
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-cream/30 border-b border-warm-grey overflow-hidden"
      aria-label="Chapter 05 — The People, The Places, The Memories"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeader
          number="05"
          total="08"
          title="The People, The Places, The Memories"
          subtitle="The Photographic Archive"
          headline="LIFE, AS SHE LIVED IT."
          supportingLine="A collection of moments worth keeping."
        />

        {/* Category Filter Pills (Editorial Groupings) */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-warm-grey pb-5">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors focus:outline-none",
                  selectedCategory === "all"
                    ? "text-ivory font-semibold border-espresso"
                    : "bg-ivory text-taupe border-warm-grey hover:border-burgundy"
                )}
              >
                {selectedCategory === "all" && (
                  <motion.div
                    layoutId="activePhotoCategory"
                    className="absolute inset-0 bg-espresso -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                COMPLETE ARCHIVE ({memoryCollections.reduce((acc, c) => acc + c.photos.length, 0)})
              </button>

              {memoryCollections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setSelectedCategory(col.id)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors focus:outline-none",
                    selectedCategory === col.id
                      ? "text-ivory font-semibold border-burgundy"
                      : "bg-ivory text-taupe border-warm-grey hover:border-burgundy"
                  )}
                >
                  {selectedCategory === col.id && (
                    <motion.div
                      layoutId="activePhotoCategory"
                      className="absolute inset-0 bg-burgundy -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {col.name} ({col.photos.length})
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono tracking-widest text-taupe uppercase">
              CLICK ANY PHOTOGRAPH TO VIEW FULL PLATE
            </span>
          </div>
        </ScrollReveal>

        {/* Dynamic Editorial Visual Rhythm for Each Collection */}
        <div className="mt-12 space-y-20 md:space-y-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-20 md:space-y-28"
            >
              {displayedCollections.map((col, colIdx) => (
                <div key={col.id} className="relative">
                  {/* Collection Heading */}
                  <ScrollReveal direction="up" distance={20}>
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-warm-grey/50 pb-3 mb-8">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-burgundy uppercase font-semibold">
                          COLLECTION 0{colIdx + 1}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                          {col.name}
                        </h3>
                      </div>
                      <p className="font-serif italic text-sm text-taupe mt-1 md:mt-0 max-w-md md:text-right">
                        {col.caption}
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Alternating editorial layouts per collection */}
                  {col.id === "unposed" && (
                    /* Asymmetrical dynamic spread */
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5">
                          <Parallax speed={0.06}>
                            <EditorialImage
                              src={col.photos[0]?.src || "/images/photo-02.jpg"}
                              alt="Unposed candid warmth"
                              caption={col.photos[0]?.caption}
                              aspect="portrait"
                              onClick={() => onImageClick && onImageClick(col.photos[0]?.src || "/images/photo-02.jpg")}
                            />
                          </Parallax>
                        </div>
                        <div className="md:col-span-7 space-y-6">
                          <EditorialImage
                            src={col.photos[1]?.src || "/images/photo-10.jpg"}
                            alt="Playful snapshot"
                            caption={col.photos[1]?.caption}
                            aspect="landscape"
                            onClick={() => onImageClick && onImageClick(col.photos[1]?.src || "/images/photo-10.jpg")}
                          />
                          <EditorialImage
                            src={col.photos[2]?.src || "/images/photo-16.jpg"}
                            alt="Laughter with friends"
                            caption={col.photos[2]?.caption}
                            aspect="square"
                            onClick={() => onImageClick && onImageClick(col.photos[2]?.src || "/images/photo-16.jpg")}
                          />
                        </div>
                      </div>

                      {/* Horizontal Triptych for unposed moments */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                        {col.photos.slice(3, 6).map((photo) => (
                          <EditorialImage
                            key={photo.id}
                            src={photo.src}
                            alt={photo.alt}
                            caption={photo.caption}
                            aspect="portrait"
                            onClick={() => onImageClick && onImageClick(photo.src)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {col.id === "adventures" && (
                    /* Wide landscape spread + paired travel shots */
                    <div className="space-y-8">
                      <div className="w-full">
                        <Parallax speed={0.04}>
                          <EditorialImage
                            src={col.photos[0]?.src || "/images/photo-03.jpg"}
                            alt="Open road journey"
                            caption={col.photos[0]?.caption}
                            aspect="landscape"
                            imageClassName="max-h-[580px] object-cover"
                            onClick={() => onImageClick && onImageClick(col.photos[0]?.src || "/images/photo-03.jpg")}
                          />
                        </Parallax>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {col.photos.slice(1).map((photo) => (
                          <EditorialImage
                            key={photo.id}
                            src={photo.src}
                            alt={photo.alt}
                            caption={photo.caption}
                            aspect="landscape"
                            onClick={() => onImageClick && onImageClick(photo.src)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {col.id === "people" && (
                    /* Portrait pairs + warm collective memories */
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-6 space-y-6">
                        <EditorialImage
                          src={col.photos[0]?.src || "/images/photo-08.jpg"}
                          alt="Gathering with cherished companions"
                          caption={col.photos[0]?.caption}
                          aspect="landscape"
                          onClick={() => onImageClick && onImageClick(col.photos[0]?.src || "/images/photo-08.jpg")}
                        />
                        <EditorialImage
                          src={col.photos[1]?.src || "/images/photo-17.jpg"}
                          alt="Early friendships"
                          caption={col.photos[1]?.caption}
                          aspect="landscape"
                          onClick={() => onImageClick && onImageClick(col.photos[1]?.src || "/images/photo-17.jpg")}
                        />
                      </div>

                      <div className="md:col-span-6 space-y-6">
                        <EditorialImage
                          src={col.photos[2]?.src || "/images/photo-18.jpg"}
                          alt="Sisterhood bonds"
                          caption={col.photos[2]?.caption}
                          aspect="landscape"
                          onClick={() => onImageClick && onImageClick(col.photos[2]?.src || "/images/photo-18.jpg")}
                        />
                        <EditorialImage
                          src={col.photos[3]?.src || "/images/photo-20.jpg"}
                          alt="Family anchors"
                          caption={col.photos[3]?.caption}
                          aspect="portrait"
                          imageClassName="max-h-[460px] object-cover"
                          onClick={() => onImageClick && onImageClick(col.photos[3]?.src || "/images/photo-20.jpg")}
                        />
                      </div>
                    </div>
                  )}

                  {col.id === "celebrations" && (
                    /* Vibrant celebration spread */
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-7">
                          <Parallax speed={0.05}>
                            <EditorialImage
                              src={col.photos[0]?.src || "/images/photo-23.jpg"}
                              alt="Editorial celebration"
                              caption={col.photos[0]?.caption}
                              aspect="square"
                              onClick={() => onImageClick && onImageClick(col.photos[0]?.src || "/images/photo-23.jpg")}
                            />
                          </Parallax>
                        </div>
                        <div className="md:col-span-5 space-y-6">
                          <EditorialImage
                            src={col.photos[1]?.src || "/images/photo-24.jpg"}
                            alt="Toast to life"
                            caption={col.photos[1]?.caption}
                            aspect="portrait"
                            onClick={() => onImageClick && onImageClick(col.photos[1]?.src || "/images/photo-24.jpg")}
                          />
                          <ScrollReveal delay={0.15}>
                            <div className="p-6 bg-ivory border border-warm-grey shadow-sm">
                              <span className="font-mono text-[10px] tracking-widest uppercase text-burgundy block mb-1">
                                CELEBRATION ANNOTATION
                              </span>
                              <p className="font-serif italic text-sm text-charcoal/80">
                                “No milestone is ever too small to raise a glass and celebrate the people who make life extraordinary.”
                              </p>
                            </div>
                          </ScrollReveal>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {col.photos.slice(2).map((photo) => (
                          <EditorialImage
                            key={photo.id}
                            src={photo.src}
                            alt={photo.alt}
                            caption={photo.caption}
                            aspect="portrait"
                            onClick={() => onImageClick && onImageClick(photo.src)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
