import React from "react";
import { cn } from "@/lib/utils";

interface EditorialQuoteProps {
  quote: string;
  author: string;
  role?: string;
  fullViewport?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

export default function EditorialQuote({
  quote,
  author,
  role,
  fullViewport = false,
  theme = "light",
  className,
}: EditorialQuoteProps) {
  const isDark = theme === "dark";

  return (
    <blockquote
      className={cn(
        "relative flex flex-col justify-center my-12 md:my-16",
        fullViewport && "min-h-[50vh] md:min-h-[70vh] py-16 md:py-24",
        isDark ? "text-ivory" : "text-charcoal",
        className
      )}
    >
      {/* Decorative oversized quotation mark */}
      <span
        aria-hidden="true"
        className={cn(
          "font-serif text-7xl md:text-9xl leading-none select-none opacity-20 block mb-[-2rem] md:mb-[-3.5rem]",
          isDark ? "text-ivory/30" : "text-burgundy/40"
        )}
      >
        “
      </span>

      <p
        className={cn(
          "font-serif font-normal italic leading-[1.25] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl",
          isDark ? "text-ivory/95" : "text-charcoal"
        )}
      >
        {quote.replace(/^“|”$/g, "")}
      </p>

      {/* Attribution */}
      <footer className="mt-6 md:mt-8 flex items-center space-x-3 text-xs uppercase tracking-widest font-sans">
        <div className={cn("w-8 h-[1px]", isDark ? "bg-burgundy" : "bg-burgundy")} />
        <cite className="not-italic font-medium text-burgundy">{author}</cite>
        {role && (
          <>
            <span className={cn(isDark ? "text-ivory/30" : "text-taupe/40")}>•</span>
            <span className={cn("text-[11px]", isDark ? "text-ivory/60" : "text-taupe")}>{role}</span>
          </>
        )}
      </footer>
    </blockquote>
  );
}

