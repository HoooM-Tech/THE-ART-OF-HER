"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Music, ExternalLink } from "lucide-react";
import { ChapterMeta } from "@/types";
import { celebrantContent } from "@/content/celebrant";
import { cn } from "@/lib/utils";

interface MobileIndexProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ChapterMeta[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
}

export default function MobileIndex({
  isOpen,
  onClose,
  chapters,
  activeChapterId,
  onSelectChapter,
}: MobileIndexProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-md text-ivory flex flex-col justify-between p-6 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Table of Contents"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-ivory/15 pb-5">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight uppercase">THE ART OF HER</span>
              <span className="text-[10px] font-mono tracking-widest text-burgundy uppercase">ISSUE NO. 032 — TABLE OF CONTENTS</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-ivory/80 hover:text-ivory focus:outline-none focus:ring-1 focus:ring-burgundy rounded transition-colors"
              aria-label="Close Index"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chapter List */}
          <nav className="my-auto py-6 overflow-y-auto max-h-[70vh]">
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.06,
                  },
                },
              }}
              className="space-y-4 sm:space-y-6"
            >
              {chapters.map((ch) => {
                const isActive = activeChapterId === ch.id;
                return (
                  <motion.li
                    key={ch.id}
                    variants={{
                      hidden: { opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <button
                      onClick={() => {
                        onSelectChapter(ch.id);
                        onClose();
                      }}
                      className={cn(
                        "w-full text-left group flex items-baseline justify-between transition-all py-2 border-b border-ivory/5 focus:outline-none",
                        isActive ? "text-ivory font-medium" : "text-ivory/70 hover:text-ivory"
                      )}
                    >
                      <div className="flex items-baseline space-x-4">
                        <span className="font-mono text-xs text-burgundy tracking-widest">
                          CH {ch.number}
                        </span>
                        <span className="font-serif text-xl sm:text-2xl group-hover:translate-x-1.5 transition-transform duration-200">
                          {ch.title}
                        </span>
                      </div>
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 text-burgundy opacity-0 group-hover:opacity-100 transition-opacity",
                          isActive && "opacity-100"
                        )}
                      />
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* Spotify Soundtrack Link in Mobile Index */}
          {celebrantContent.spotifyPlaylistUrl && (
            <a
              href={celebrantContent.spotifyPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="my-3 flex items-center justify-between p-3.5 bg-white/5 border border-ivory/15 hover:border-burgundy rounded transition-colors text-ivory text-xs font-mono tracking-widest uppercase group"
            >
              <span className="flex items-center space-x-2.5">
                <Music className="w-4 h-4 text-burgundy group-hover:text-[#1DB954] transition-colors" />
                <span>THE SOUNDTRACK OF HER</span>
              </span>
              <span className="text-[10px] text-ivory/60 font-sans tracking-normal italic flex items-center space-x-1">
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          )}

          {/* Footer Colophon Note */}
          <div className="border-t border-ivory/15 pt-4 flex justify-between items-center text-[10px] font-mono tracking-widest text-ivory/40 uppercase">
            <span>A PRIVATE BIRTHDAY EDITORIAL</span>
            <span>NOVEMBER 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
