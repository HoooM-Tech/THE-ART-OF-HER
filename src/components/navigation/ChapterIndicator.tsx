"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ChapterIndicatorProps {
  currentChapterNumber: string;
  totalChapters?: string;
  currentChapterTitle?: string;
  className?: string;
}

export default function ChapterIndicator({
  currentChapterNumber,
  totalChapters = "08",
  currentChapterTitle,
  className,
}: ChapterIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center space-x-2.5 px-3 py-1 bg-cream/70 backdrop-blur-sm border border-warm-grey text-charcoal rounded-full text-[11px] font-mono tracking-widest uppercase shadow-sm select-none",
        className
      )}
      aria-label={`Current Chapter: ${currentChapterNumber} of ${totalChapters}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
      <span className="font-semibold text-burgundy">CH {currentChapterNumber}</span>
      <span className="text-warm-grey">/</span>
      <span className="text-taupe">{totalChapters}</span>
      {currentChapterTitle && (
        <>
          <span className="hidden sm:inline text-warm-grey">•</span>
          <span className="hidden sm:inline font-sans font-medium text-charcoal truncate max-w-[150px]">
            {currentChapterTitle}
          </span>
        </>
      )}
    </div>
  );
}

