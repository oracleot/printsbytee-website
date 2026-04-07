"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const storyBlocks = [
  {
    id: "founding",
    title: "Born from Heritage",
    content:
      "PrintsbyTee was born from a desire to bridge the gap between traditional African elegance and modern ready-to-wear fashion. We believe every woman deserves to wear her heritage with pride.",
    accent: "#1B4D3E",
  },
  {
    id: "craftsmanship",
    title: "Crafted with Care",
    content:
      "Each piece tells a story — of craftsmanship, culture, and the vibrant women who inspire us. From rich emerald tones inspired by West African royal courts to warm terracotta savanna sunsets.",
    accent: "#C9A84C",
  },
  {
    id: "community",
    title: "Made for You",
    content:
      "Our designs celebrate the modern diaspora woman — confident, bold, and beautiful. We create fashion that makes you feel seen, celebrated, and connected to your roots.",
    accent: "#C75B39",
  },
];

function StoryBlock({
  block,
}: {
  block: (typeof storyBlocks)[0];
}) {
  return (
    <div className="flex items-start gap-5 mb-12 last:mb-0">
      {/* Accent line */}
      <div
        className="flex-shrink-0 w-1 h-16 rounded-full mt-1"
        style={{ backgroundColor: block.accent }}
      />
      <div className="flex-1">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-black mb-2">
          {block.title}
        </h3>
        <p className="text-black/70 text-base leading-relaxed">
          {block.content}
        </p>
      </div>
    </div>
  );
}

export function StickyScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gold text-xs tracking-[0.3em] uppercase font-semibold"
          >
            Our Heritage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 leading-[1.1]"
          >
            Fashion That{" "}
            <span className="text-emerald">Celebrates</span>{" "}
            <span className="text-gold">Identity</span>
          </motion.h2>
        </div>

        {/* Main Content Grid - 2 columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT: Sticky Panel with gradient background */}
          <motion.div
            style={{ opacity, scale }}
            className="lg:sticky lg:top-24 lg:self-start rounded-2xl overflow-hidden shadow-2xl"
          >
            <div
              className="relative aspect-[4/5] p-8 lg:p-10 flex flex-col justify-end"
              style={{
                background:
                  "linear-gradient(160deg, #1B4D3E 0%, #0D0D0D 50%, #C9A84C 100%)",
              }}
            >
              {/* Decorative diamond pattern */}
              <div className="absolute inset-0 opacity-15">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="sticky-diamond" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="none" stroke="#F5F0E8" strokeWidth="0.4" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#sticky-diamond)" />
                </svg>
              </div>

              {/* Gold accent corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-gold/30" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/30" />

              {/* Content overlay */}
              <div className="relative z-10">
                <div className="bg-gold/90 backdrop-blur-sm px-4 py-2 inline-block mb-4">
                  <span className="font-heading text-sm text-black font-bold tracking-wider">
                    @printsbytee
                  </span>
                </div>
                <blockquote className="font-heading text-2xl lg:text-3xl text-cream font-semibold leading-snug">
                  &ldquo;Every thread tells a story of culture, confidence, and timeless elegance.&rdquo;
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Scrolling Story Blocks */}
          <div className="space-y-8 pt-4">
            {storyBlocks.map((block) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <StoryBlock block={block} />
              </motion.div>
            ))}

            {/* Quote card - connecting the narrative */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black rounded-xl p-8 mt-8"
            >
              <p className="text-cream/90 text-lg leading-relaxed mb-4">
                We create fashion that honors tradition while embracing modern style — for women who carry their heritage with pride.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-gold" />
                <span className="text-gold text-sm font-medium tracking-wider uppercase">
                  Our Mission
                </span>
              </div>
            </motion.div>

            {/* Visual accent block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative aspect-[16/9] rounded-xl overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #C75B39 0%, #1B4D3E 50%, #0D0D0D 100%)",
                }}
              />
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="accent-diamond" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="none" stroke="#F5F0E8" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#accent-diamond)" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-cream/60 text-sm tracking-[0.2em] uppercase">
                  Bold · Beautiful · Heritage
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}