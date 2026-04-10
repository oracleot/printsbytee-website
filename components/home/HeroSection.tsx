"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
  return (
    <section className="relative w-full bg-[#0D0D0D] overflow-hidden">
      {/* 2-column image grid — full viewport height on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-screen overflow-hidden group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle dark overlay at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 md:opacity-80" />
          </div>
        ))}
      </div>

      {/* Centered text overlay — absolute positioned */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <span className="inline-block text-[#C9A84C] text-xs tracking-[0.4em] uppercase font-semibold mb-6 border border-[#C9A84C]/40 px-4 py-1">
            Ready-to-Wear African Fashion
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] mb-6 leading-[0.92] tracking-tight">
            WEAR YOUR{" "}
            <span className="text-[#C9A84C]">STORY</span>
          </h1>
          <p className="text-[#F5F0E8]/80 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Bold prints. Contemporary style. African heritage, reimagined for
            the modern woman.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-[#C9A84C] text-black px-10 py-5 font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#F5F0E8] transition-all duration-300 shadow-xl shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/40"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
