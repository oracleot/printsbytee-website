"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* 2-column image grid — 50vh per image on mobile, full viewport on desktop */}
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
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Text zone — below image grid on dark background */}
      <div className="bg-black py-16 md:py-24 px-4">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.9, ease: "easeOut" }
          }
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6 border border-gold/40 px-4 py-1">
            Ready-to-Wear African Fashion
          </span>

          <h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-[0.92] tracking-tight"
            style={{
              textShadow: "0 2px 30px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5)",
            }}
          >
            WEAR YOUR <span className="text-gold">STORY</span>
          </h1>

          <p className="text-cream/80 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Bold prints. Contemporary style. African heritage, reimagined for the modern woman.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gold text-black px-10 py-5 font-bold text-sm tracking-[0.15em] uppercase hover:bg-cream transition-all duration-300 shadow-xl shadow-gold/20 hover:shadow-gold/40"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="mailto:hello@printsbytee.co.uk"
              className="inline-flex items-center gap-2 text-cream/80 hover:text-gold text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300 border-b border-cream/30 hover:border-gold pb-0.5"
            >
              Custom Orders
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={prefersReducedMotion ? { opacity: 0 } : { y: [0, 14, 0] }}
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
