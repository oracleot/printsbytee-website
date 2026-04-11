"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HeroOverlay } from "./HeroOverlay";

const HERO_IMAGES = [
  {
    src: "/lora-set-turquoise.jpg",
    alt: "Lora Set in Turquoise — bold ankara print",
  },
  {
    src: "/naya-jump-suite.jpg",
    alt: "Naya Jump Suite — structured and elegant",
  },
];

/** Radial vignette — dark from all edges, transparent center */
const VIGNETTE =
  "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.85) 100%)";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* ── Image grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className="relative w-full h-[50vh] md:min-h-screen overflow-hidden group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Radial vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: VIGNETTE }}
            />

            {/* Bottom gradient for section transition */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* ── Mobile text overlay (per image cell) ──── */}
            {index === 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center md:hidden">
                <HeroOverlay reducedMotion={prefersReducedMotion} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop text overlay (centered over both images) ── */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center">
        <HeroOverlay reducedMotion={prefersReducedMotion} />
      </div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { delay: 1.2, duration: 0.6 }
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={
            prefersReducedMotion ? { opacity: 0 } : { y: [0, 14, 0] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex flex-col items-center gap-2"
        >
          <span className="text-cream/60 text-xs tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
