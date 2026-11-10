"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const LUXE_EASE = [0.16, 1, 0.3, 1] as const;

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  viewportAmount?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 32,
  duration = 0.85,
  className,
  viewportAmount = 0.15,
  once = true,
  ...rest
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount: viewportAmount,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const, // Luxe editorial easing
      }}
      style={{ willChange: "transform, opacity" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g., -0.2 for slower, 0.2 for faster
  className?: string;
}

export function Parallax({ children, speed = 0.15, className }: ParallaxProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = speed * 120;
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative overflow-visible", className)}>
      <motion.div
        style={{ y, willChange: "transform" }}
        transition={{ ease: "linear" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewportAmount?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.05,
  className,
  viewportAmount = 0.1,
  once = true,
  ...rest
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 24,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
} & HTMLMotionProps<"div">) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{ willChange: "transform, opacity" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
