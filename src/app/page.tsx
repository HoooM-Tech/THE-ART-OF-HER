"use client";

import React, { useState } from "react";
import EditorialNavigation from "@/components/navigation/EditorialNavigation";
import Cover from "@/components/chapters/Cover";
import OpeningLetter from "@/components/chapters/OpeningLetter";
import PersonalityProfile from "@/components/chapters/PersonalityProfile";
import ThroughTheYears from "@/components/chapters/ThroughTheYears";
import PhotoDiaries from "@/components/chapters/PhotoDiaries";
import ThroughTheirEyes from "@/components/chapters/ThroughTheirEyes";
import ThirtyTwoReasons from "@/components/chapters/ThirtyTwoReasons";
import FinalChapter from "@/components/chapters/FinalChapter";
import ImageLightbox from "@/components/editorial/ImageLightbox";
import KeepsakeModal from "@/components/editorial/KeepsakeModal";
import { editorialPhotographs } from "@/content/photographs";

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);

  // Helper to open lightbox with any image src
  const handleImageClick = (src: string) => {
    const foundIndex = editorialPhotographs.findIndex((p) => p.src === src);
    if (foundIndex !== -1) {
      setLightboxIndex(foundIndex);
    } else {
      // Fallback: match by filename
      const filename = src.split("/").pop();
      const altIndex = editorialPhotographs.findIndex((p) => p.src.includes(filename || ""));
      setLightboxIndex(altIndex !== -1 ? altIndex : 0);
    }
  };

  return (
    <div className="relative min-h-screen bg-ivory text-charcoal font-sans selection:bg-burgundy selection:text-ivory">
      {/* Sticky Editorial Navigation */}
      <EditorialNavigation onOpenKeepsake={() => setIsKeepsakeOpen(true)} />

      {/* Main Single-Page Editorial Flow */}
      <main id="main-content" className="relative">
        {/* CHAPTER 01: THE COVER */}
        <Cover onImageClick={handleImageClick} />

        {/* CHAPTER 02: DEAR TOSIN */}
        <OpeningLetter onImageClick={handleImageClick} />

        {/* CHAPTER 03: THE ART OF BEING HER */}
        <PersonalityProfile onImageClick={handleImageClick} />

        {/* CHAPTER 04: THE YEARS THAT MADE HER */}
        <ThroughTheYears onImageClick={handleImageClick} />

        {/* CHAPTER 05: THE PEOPLE, THE PLACES, THE MEMORIES */}
        <PhotoDiaries onImageClick={handleImageClick} />

        {/* CHAPTER 06: THROUGH THEIR EYES */}
        <ThroughTheirEyes onImageClick={handleImageClick} />

        {/* CHAPTER 07: 32 REASONS WE LOVE YOU */}
        <ThirtyTwoReasons onImageClick={handleImageClick} />

        {/* CHAPTER 08: THE NEXT CHAPTER */}
        <FinalChapter
          onImageClick={handleImageClick}
          onOpenKeepsake={() => setIsKeepsakeOpen(true)}
        />
      </main>

      {/* Interactive Lightbox Viewer */}
      <ImageLightbox
        photos={editorialPhotographs}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />

      {/* Optional Keepsake Magazine Edition Modal */}
      <KeepsakeModal
        isOpen={isKeepsakeOpen}
        onClose={() => setIsKeepsakeOpen(false)}
      />
    </div>
  );
}

