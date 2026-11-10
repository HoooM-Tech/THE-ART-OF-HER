import React from "react";
import { cn } from "@/lib/utils";

interface ImageCaptionProps {
  caption?: string;
  date?: string;
  plateNumber?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
  theme?: "light" | "dark";
}

export default function ImageCaption({
  caption,
  date,
  plateNumber,
  align = "left",
  className,
  theme = "light",
}: ImageCaptionProps) {
  if (!caption && !date && !plateNumber) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "mt-3 text-xs leading-relaxed font-sans",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-2">
        {plateNumber && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-burgundy font-semibold">
            FIG. {typeof plateNumber === "number" ? String(plateNumber).padStart(2, "0") : plateNumber}
          </span>
        )}
        {caption && (
          <span className={cn("font-serif italic text-sm", isDark ? "text-ivory/80" : "text-taupe")}>
            {caption}
          </span>
        )}
        {date && (
          <span className={cn("text-[10px] uppercase font-mono tracking-widest", isDark ? "text-ivory/40" : "text-taupe/60")}>
            [{date}]
          </span>
        )}
      </div>
    </div>
  );
}

