"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: shouldReduceMotion ? 1 : 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.9,
        delay: shouldReduceMotion ? 0 : 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const originClass =
    align === "center"
      ? "origin-center mx-auto"
      : align === "right"
      ? "origin-right ml-auto"
      : "origin-left";

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "relative py-8 md:py-12 transition-colors",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {/* Chapter Indicator */}
      <motion.div
        variants={itemVariants}
        className={cn(
          "flex items-center space-x-3 mb-4 text-xs font-mono uppercase tracking-widest",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
      >
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
      </motion.div>

      {/* Main Chapter Title */}
      <motion.h2
        variants={itemVariants}
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08]",
          isDark ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </motion.h2>

      {/* Expressive Sub-headline */}
      {headline && (
        <motion.p
          variants={itemVariants}
          className={cn(
            "mt-3 text-xs md:text-sm font-sans uppercase tracking-[0.2em] font-medium",
            isDark ? "text-burgundy" : "text-burgundy"
          )}
        >
          {headline}
        </motion.p>
      )}

      {/* Supporting Line in Italic Serif */}
      {supportingLine && (
        <motion.p
          variants={itemVariants}
          className={cn(
            "mt-4 text-lg md:text-xl font-serif italic max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
            isDark ? "text-ivory/80" : "text-taupe"
          )}
        >
          “{supportingLine.replace(/^“|”$/g, '')}”
        </motion.p>
      )}

      {/* Editorial Decorative Line (draws outward on scroll) */}
      <motion.div
        variants={lineVariants}
        style={{ willChange: "transform" }}
        className={cn(
          "mt-6 h-[1px] w-24",
          originClass,
          isDark ? "bg-ivory/20" : "bg-warm-grey"
        )}
      />
    </motion.header>
  );
}
