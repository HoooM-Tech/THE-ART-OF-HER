"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { EditorialPhotograph } from "@/types";

interface LightboxProps {
  photos: EditorialPhotograph[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  // Touch swipe tracking for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      const next = (currentIndex + 1) % photos.length;
      onNavigate(next);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex !== null) {
      const prev = (currentIndex - 1 + photos.length) % photos.length;
      onNavigate(prev);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Editorial Image Viewer"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={onClose}
        >
          {/* Top Bar with Editorial Metadata & Close */}
          <div
            className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-5 z-20 border-b border-warm-grey/15 text-ivory/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 text-xs tracking-widest uppercase font-mono">
              <span className="text-burgundy font-semibold">ISSUE 032</span>
              <span className="text-warm-grey/40">/</span>
              <span>PLATE {String((currentIndex ?? 0) + 1).padStart(2, '0')} OF {String(photos.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-xs uppercase tracking-widest text-ivory/80 hover:text-ivory p-2 rounded transition-colors group focus:outline-none focus:ring-1 focus:ring-burgundy"
              aria-label="Close image viewer"
            >
              <span className="hidden sm:inline text-[11px] text-taupe group-hover:text-ivory transition-colors">ESC</span>
              <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
            </button>
          </div>

          {/* Navigation Controls */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-ivory/70 hover:text-ivory hover:bg-white/5 rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-burgundy"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-8 h-8 stroke-[1.2]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-ivory/70 hover:text-ivory hover:bg-white/5 rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-burgundy"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-8 h-8 stroke-[1.2]" />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative max-w-6xl max-h-[82vh] w-full mx-auto px-4 md:px-12 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[72vh] flex items-center justify-center overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentPhoto.src}
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="max-h-[72vh] max-w-full w-auto h-auto object-contain select-none transition-all duration-300"
              />
            </div>

            {/* Caption and Date */}
            <div className="mt-4 max-w-2xl text-center px-4">
              <p className="text-sm md:text-base font-serif text-ivory/90 italic leading-relaxed">
                {currentPhoto.caption}
              </p>
              {currentPhoto.date && (
                <div className="mt-1 flex items-center justify-center space-x-2 text-[11px] font-sans tracking-widest uppercase text-taupe">
                  <Calendar className="w-3 h-3 text-burgundy" />
                  <span>{currentPhoto.date}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
