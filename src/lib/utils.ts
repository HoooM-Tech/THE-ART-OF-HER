import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const navOffset = 70; // sticky header offset

    const lenis = (typeof window !== "undefined" && (window as any).__lenis);
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(element, { offset: -navOffset, duration: 1.2 });
      return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

