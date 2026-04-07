"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

export function HeroParallax() {
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* African fabric-inspired gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, #0D0D0D 0%, #1B4D3E 25%, #C9A84C 50%, #C75B39 75%, #0D0D0D 100%)
            `,
          }}
        />
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="hero-pattern-parallax" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
              <path d="M10 5 L15 10 L10 15 L5 10 Z" fill="none" stroke="#F5F0E8" strokeWidth="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-pattern-parallax)" />
          </svg>
        </div>
        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, #0D0D0D 70%)",
          }}
        />
      </motion.div>

      {/* Sparkles Background Layer */}
      <div className="absolute inset-0 z-10">
        <Sparkles
          starColor="#C9A84C"
          starSize={3}
          maxStars={80}
          speed={0.8}
          opacity={0.6}
        />
      </div>

      {/* Content Layer - moves slower for parallax depth */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-gold text-sm tracking-[0.3em] uppercase mb-6">
            Ready-to-Wear African Fashion
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-tight"
        >
          WEAR YOUR <span className="text-gold">STORY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-cream/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
        >
          Bold, beautiful African fashion for diaspora women. Premium prints that celebrate culture with contemporary style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gold text-black px-8 py-4 font-semibold text-base tracking-wide hover:bg-cream transition-colors duration-300 group"
          >
            SHOP NOW
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-cream/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-cream/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
