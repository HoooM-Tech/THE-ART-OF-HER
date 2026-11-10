import React from "react";
import { cn } from "@/lib/utils";

interface ChapterHeaderProps {
  number: string;
  total?: string;
  title: string;
  subtitle?: string;
  headline?: string;
  supportingLine?: string;
  theme?: "light" | "dark";
  align?: "left" | "center" | "right";
  className?: string;
}

export default function ChapterHeader({
  number,
  total = "08",
  title,
  subtitle,
  headline,
  supportingLine,
  theme = "light",
  align = "left",
  className,
}: ChapterHeaderProps) {
  const isDark = theme === "dark";

  return (
    <header
      className={cn(
        "relative py-8 md:py-12 transition-colors",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {/* Chapter Indicator */}
      <div className="flex items-center space-x-3 mb-4 text-xs font-mono uppercase tracking-widest">
        <span
          className={cn(
            "px-2.5 py-0.5 border text-[11px] font-medium tracking-widest",
            isDark
              ? "border-ivory/20 text-ivory/70 bg-white/5"
              : "border-warm-grey text-taupe bg-cream/30"
          )}
        >
          CHAPTER {number} / {total}
        </span>
        {subtitle && (
          <>
            <span className={cn("text-warm-grey/50", isDark && "text-ivory/20")}>—</span>
            <span className={cn("text-xs tracking-widest uppercase", isDark ? "text-ivory/60" : "text-taupe")}>
              {subtitle}
            </span>
          </>
        )}
      </div>

      {/* Main Chapter Title */}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08]",
          isDark ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>

      {/* Expressive Sub-headline */}
      {headline && (
        <p
          className={cn(
            "mt-3 text-xs md:text-sm font-sans uppercase tracking-[0.2em] font-medium",
            isDark ? "text-burgundy" : "text-burgundy"
          )}
        >
          {headline}
        </p>
      )}

      {/* Supporting Line in Italic Serif */}
      {supportingLine && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl font-serif italic max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
            isDark ? "text-ivory/80" : "text-taupe"
          )}
        >
          “{supportingLine.replace(/^“|”$/g, '')}”
        </p>
      )}

      {/* Editorial Decorative Line */}
      <div
        className={cn(
          "mt-6 h-[1px] w-24",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto",
          isDark ? "bg-ivory/20" : "bg-warm-grey"
        )}
      />
    </header>
  );
}

