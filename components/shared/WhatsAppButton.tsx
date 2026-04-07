"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

function normalizePhoneNumber(raw?: string): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 10 ? digits : undefined;
}

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  message = "Hi, I'm interested in PrintsbyTee products",
  className = ""
}: WhatsAppButtonProps) {
  const whatsappNumber = normalizePhoneNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Small delay to ensure page has loaded and hero is in DOM
    const timer = setTimeout(() => {
      const hero = document.getElementById("hero");
      if (!hero) {
        // No hero element — show button immediately
        setVisible(true);
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            setVisible(true);
            observerRef.current?.disconnect();
          }
        },
        { threshold: 0 }
      );

      observerRef.current.observe(hero);
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  if (!whatsappNumber) return null;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`fixed bottom-5 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-3 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow group ${className}`}
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium text-sm whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-48 transition-all duration-300 ease-in-out">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}