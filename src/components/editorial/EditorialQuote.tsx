"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.blockquote
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ willChange: "transform, opacity" }}
      className={cn(
        "relative flex flex-col justify-center my-12 md:my-16",
        fullViewport && "min-h-[50vh] md:min-h-[70vh] py-16 md:py-24",
        isDark ? "text-ivory" : "text-charcoal",
        className
      )}
    >
      {/* Decorative oversized quotation mark with floating motion */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: isDark ? 0.3 : 0.35, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
        className={cn(
          "font-serif text-7xl md:text-9xl leading-none select-none block mb-[-2rem] md:mb-[-3.5rem]",
          isDark ? "text-ivory" : "text-burgundy"
        )}
      >
        “
      </motion.span>

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
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ willChange: "transform" }}
          className="w-8 h-[1px] bg-burgundy origin-left"
        />
        <cite className="not-italic font-medium text-burgundy">{author}</cite>
        {role && (
          <>
            <span className={cn(isDark ? "text-ivory/30" : "text-taupe/40")}>•</span>
            <span className={cn("text-[11px]", isDark ? "text-ivory/60" : "text-taupe")}>{role}</span>
          </>
        )}
      </footer>
    </motion.blockquote>
  );
}
