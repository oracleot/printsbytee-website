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
  index,
}: {
  block: (typeof storyBlocks)[0];
  index: number;
}) {
  return (
    <div className="flex items-start gap-6 mb-16 last:mb-0">
      {/* Number indicator */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-cream font-bold text-lg"
        style={{ backgroundColor: block.accent }}
      >
        {index + 1}
      </div>
      <div className="flex-1 pt-2">
        <h3 className="font-heading text-2xl font-bold text-black mb-3">
          {block.title}
        </h3>
        <p className="text-black/70 text-lg leading-relaxed">
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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-cream relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="sticky-bg-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#1B4D3E" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#sticky-bg-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Sticky Text Panel */}
          <motion.div
            style={{ opacity, scale }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-sm tracking-[0.2em] uppercase font-medium"
            >
              Our Heritage
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl font-bold text-black mt-3 leading-tight"
            >
              Fashion That{" "}
              <span className="text-emerald">Celebrates Identity</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-black/70 text-lg leading-relaxed mt-6"
            >
              Every woman deserves to feel confident and beautiful. Our mission is to create fashion that honors tradition while embracing modern style.
            </motion.p>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mt-8"
            >
              <div className="w-12 h-px bg-emerald" />
              <span className="text-emerald font-medium">Bold & Beautiful</span>
            </motion.div>
          </motion.div>

          {/* Scrolling Story Blocks */}
          <div className="space-y-0">
            {storyBlocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <StoryBlock block={block} index={index} />
              </motion.div>
            ))}

            {/* Visual element - gradient card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl mt-12"
              style={{
                background:
                  "linear-gradient(135deg, #1B4D3E 0%, #0D0D0D 40%, #C9A84C 70%, #F5F0E8 100%)",
              }}
            >
              {/* Decorative overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="brand-pattern-sticky" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="none" stroke="#F5F0E8" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#brand-pattern-sticky)" />
                </svg>
              </div>

              {/* Label overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-cream/90 backdrop-blur-sm p-4">
                <p className="font-heading text-sm text-black tracking-wider">
                  @printsbytee
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
