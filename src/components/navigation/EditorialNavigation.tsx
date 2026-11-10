"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, BookOpen, Printer, Music } from "lucide-react";
import { chaptersMeta } from "@/content/chapters";
import { celebrantContent } from "@/content/celebrant";
import { scrollToSection, cn } from "@/lib/utils";
import MobileIndex from "./MobileIndex";
import ChapterIndicator from "./ChapterIndicator";

interface NavigationProps {
  onOpenKeepsake?: () => void;
}

export default function EditorialNavigation({ onOpenKeepsake }: NavigationProps) {
  const [activeChapterId, setActiveChapterId] = useState<string>("chapter-01-cover");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileIndexOpen, setIsMobileIndexOpen] = useState(false);

  // Global reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      setIsScrolled(window.scrollY > 80);

      // Detect active chapter based on section positions
      for (let i = chaptersMeta.length - 1; i >= 0; i--) {
        const ch = chaptersMeta[i];
        const el = document.getElementById(ch.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveChapterId(ch.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeChapter = chaptersMeta.find((c) => c.id === activeChapterId) || chaptersMeta[0];

  const primaryDesktopLinks = [
    { label: "THE ART OF HER", targetId: "chapter-01-cover" },
    { label: "HER STORY", targetId: "chapter-03-personality" },
    { label: "THE MEMORIES", targetId: "chapter-05-memories" },
    { label: "THE LETTERS", targetId: "chapter-06-letters" },
    { label: "32 REASONS", targetId: "chapter-07-reasons" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 no-print",
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md border-b border-warm-grey/60 py-3.5 shadow-sm"
            : "bg-transparent py-5 border-b border-transparent"
        )}
      >
        {/* Subtle Reading Progress Line */}
        <motion.div
          style={{ scaleX, willChange: "transform" }}
          className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-burgundy via-burgundy to-espresso origin-left z-50 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Masthead / Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("chapter-01-cover")}
              className="text-left group focus:outline-none"
            >
              <span className="font-serif text-lg sm:text-xl font-normal tracking-tight text-charcoal group-hover:text-burgundy transition-colors uppercase">
                THE ART OF HER
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-taupe uppercase">
                ISSUE 032 — PRIVATE EDITION
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-sans font-medium uppercase tracking-[0.18em]">
            {primaryDesktopLinks.map((link) => {
              const isCurrent =
                activeChapterId === link.targetId ||
                (link.targetId === "chapter-01-cover" && activeChapterId === "chapter-02-letter") ||
                (link.targetId === "chapter-03-personality" && activeChapterId === "chapter-04-years") ||
                (link.targetId === "chapter-07-reasons" && activeChapterId === "chapter-08-future");

              return (
                <button
                  key={link.targetId}
                  onClick={() => scrollToSection(link.targetId)}
                  className={cn(
                    "relative py-1 transition-colors text-xs focus:outline-none",
                    isCurrent
                      ? "text-burgundy font-semibold"
                      : "text-taupe hover:text-charcoal"
                  )}
                >
                  {link.label}
                  {isCurrent && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-burgundy rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Current Chapter Indicator & Index / PDF Keepsake */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Live Chapter Indicator */}
            <ChapterIndicator
              currentChapterNumber={activeChapter.number}
              currentChapterTitle={activeChapter.title}
              className="hidden sm:inline-flex"
            />

            {/* Keepsake PDF Print trigger */}
            {onOpenKeepsake && (
              <button
                onClick={onOpenKeepsake}
                title="View / Print Keepsake Edition"
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 border border-warm-grey bg-cream/50 hover:bg-burgundy hover:text-ivory text-charcoal text-[11px] font-mono uppercase tracking-wider rounded transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>KEEPSAKE</span>
              </button>
            )}

            {/* Spotify Soundtrack Trigger */}
            {celebrantContent.spotifyPlaylistUrl && (
              <a
                href={celebrantContent.spotifyPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Listen to The Soundtrack of Her on Spotify"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 border border-warm-grey bg-cream/50 hover:bg-espresso hover:text-ivory hover:border-espresso text-charcoal text-[11px] font-mono uppercase tracking-wider rounded transition-colors group"
              >
                <Music className="w-3.5 h-3.5 text-burgundy group-hover:text-[#1DB954] transition-colors" />
                <span>SOUNDTRACK</span>
              </a>
            )}

            {/* Index Trigger (Available on all screens, especially mobile) */}
            <button
              onClick={() => setIsMobileIndexOpen(true)}
              className="inline-flex items-center space-x-2 px-3 py-1.5 border border-charcoal/30 bg-charcoal text-ivory hover:bg-burgundy text-[11px] font-mono tracking-widest uppercase rounded transition-colors focus:outline-none focus:ring-1 focus:ring-burgundy"
              aria-label="Open Table of Contents"
            >
              <Menu className="w-4 h-4" />
              <span>INDEX</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Full Index Drawer */}
      <MobileIndex
        isOpen={isMobileIndexOpen}
        onClose={() => setIsMobileIndexOpen(false)}
        chapters={chaptersMeta}
        activeChapterId={activeChapterId}
        onSelectChapter={scrollToSection}
      />
    </>
  );
}

