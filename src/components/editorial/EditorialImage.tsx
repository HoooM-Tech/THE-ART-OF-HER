"use client";

import React, { useRef, useState, useEffect } from "react";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageCaption from "./ImageCaption";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  plateNumber?: string | number;
  aspect?: "portrait" | "landscape" | "square" | "natural";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  onClick?: () => void;
  bleed?: boolean;
  theme?: "light" | "dark";
}

export default function EditorialImage({
  src,
  alt,
  caption,
  date,
  plateNumber,
  aspect = "natural",
  className,
  imageClassName,
  onClick,
  bleed = false,
  theme = "light",
}: EditorialImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const aspectClasses = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
    natural: "aspect-auto",
  };

  return (
    <figure className={cn("group relative flex flex-col", bleed && "-mx-4 sm:-mx-8 lg:-mx-16", className)}>
      <div
        onClick={onClick}
        className={cn(
          "relative overflow-hidden bg-cream/60 transition-all duration-300 cursor-pointer",
          aspectClasses[aspect],
          "border border-warm-grey/40 group-hover:border-burgundy/60 shadow-sm"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]",
            imageClassName
          )}
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-espresso/85 text-ivory text-[11px] uppercase tracking-widest px-3 py-1.5 flex items-center space-x-1.5 backdrop-blur-sm shadow-md">
            <Maximize2 className="w-3.5 h-3.5 text-burgundy" />
            <span>View Full Frame</span>
          </span>
        </div>
      </div>

      <ImageCaption
        caption={caption}
        date={date}
        plateNumber={plateNumber}
        theme={theme}
      />
    </figure>
  );
}

