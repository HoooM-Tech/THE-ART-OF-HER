"use client";

import React, { useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { ChapterMeta } from "@/types";
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-md text-ivory flex flex-col justify-between p-6 sm:p-10 animate-fadeIn"
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
          className="p-2 text-ivory/80 hover:text-ivory focus:outline-none focus:ring-1 focus:ring-burgundy rounded"
          aria-label="Close Index"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Chapter List */}
      <nav className="my-auto py-6 overflow-y-auto max-h-[70vh]">
        <ul className="space-y-4 sm:space-y-6">
          {chapters.map((ch) => {
            const isActive = activeChapterId === ch.id;
            return (
              <li key={ch.id}>
                <button
                  onClick={() => {
                    onSelectChapter(ch.id);
                    onClose();
                  }}
                  className={cn(
                    "w-full text-left group flex items-baseline justify-between transition-all py-2 border-b border-ivory/5",
                    isActive ? "text-ivory font-medium" : "text-ivory/70 hover:text-ivory"
                  )}
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="font-mono text-xs text-burgundy tracking-widest">
                      CH {ch.number}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl group-hover:translate-x-1 transition-transform">
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
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Colophon Note */}
      <div className="border-t border-ivory/15 pt-4 flex justify-between items-center text-[10px] font-mono tracking-widest text-ivory/40 uppercase">
        <span>A PRIVATE BIRTHDAY EDITORIAL</span>
        <span>NOVEMBER 2026</span>
      </div>
    </div>
  );
}

