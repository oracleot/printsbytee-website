"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, Mail, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/shared/SocialIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PatternDivider } from "@/components/shared/PatternDivider";

interface FormData {
  name: string;
  email: string;
  productInterest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Reads the ?product= query param and pre-fills formData.productInterest.
 * useSearchParams requires Suspense boundary — this component IS the Suspense boundary.
 */
function ContactFormInner() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") ?? "";

  // Initialize with product param from URL (available via useSearchParams in Suspense context)
  const [formData, setFormData] = useState<FormData>(() => ({
    name: "",
    email: "",
    productInterest: productParam,
    message: "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", productInterest: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      {/* Hero Header */}
      <section className="pt-32 pb-12 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="contact-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="none" stroke="#C9A84C" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#contact-pattern)"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-black mt-4 mb-6">
            Contact Us
          </h1>
          <p className="text-black/70 text-lg max-w-2xl mx-auto">
            Have a question about our products or want to place a custom order? 
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-black mb-4">
                  Let&apos;s Connect
                </h2>
                <p className="text-black/70 leading-relaxed">
                  Whether you&apos;re looking for the perfect outfit for a special occasion, 
                  interested in a custom order, or just want to learn more about our brand, 
                  we&apos;re here to help. Reach out and let&apos;s start a conversation.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href="mailto:hello@printsbytee.co.uk"
                  className="flex items-center gap-3 text-black hover:text-emerald transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <span>hello@printsbytee.co.uk</span>
                </a>
                
                <a 
                  href="https://wa.me/447000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-black hover:text-emerald transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <span>WhatsApp: +44 7000 000000</span>
                </a>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-heading text-sm font-bold tracking-wider uppercase text-gold mb-4">
                  Follow Us
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com/printsbytee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-black hover:bg-gold hover:text-black transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com/printsbytee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-black hover:bg-gold hover:text-black transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://tiktok.com/@printsbytee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-black hover:bg-gold hover:text-black transition-colors"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Brand Story snippet */}
              <div className="p-6 bg-cream rounded-lg">
                <p className="text-sm text-black/70 italic">
                  &quot;We believe every woman deserves to wear her heritage with pride, 
                  without sacrificing comfort or contemporary style.&quot;
                </p>
              </div>
            </motion.div>

            {/* Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-cream p-6 sm:p-8 rounded-lg shadow-sm"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald mb-4" />
                    <h3 className="font-heading text-2xl font-semibold text-black mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-black/60 max-w-sm">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-black">
                        Name <span className="text-terracotta">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange("name")}
                        disabled={status === "loading"}
                        className={`w-full bg-offwhite border-border text-black placeholder:text-black/40 ${
                          errors.name ? "border-terracotta" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-terracotta">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-black">
                        Email <span className="text-terracotta">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange("email")}
                        disabled={status === "loading"}
                        className={`w-full bg-offwhite border-border text-black placeholder:text-black/40 ${
                          errors.email ? "border-terracotta" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-terracotta">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productInterest" className="text-sm font-medium text-black">
                        Product Interest <span className="text-black/50">(optional)</span>
                      </Label>
                      <Input
                        id="productInterest"
                        type="text"
                        placeholder="Which product or style are you interested in?"
                        value={formData.productInterest}
                        onChange={handleChange("productInterest")}
                        disabled={status === "loading"}
                        className="w-full bg-offwhite border-border text-black placeholder:text-black/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-black">
                        Message <span className="text-terracotta">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange("message")}
                        disabled={status === "loading"}
                        className={`w-full bg-offwhite border-border text-black placeholder:text-black/40 resize-none ${
                          errors.message ? "border-terracotta" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-terracotta">{errors.message}</p>
                      )}
                    </div>

                    {errorMessage && (
                      <p className="text-sm text-terracotta bg-terracotta/10 px-4 py-3 rounded">
                        {errorMessage}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-black text-cream hover:bg-emerald disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <PatternDivider />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite" />}>
      <ContactFormInner />
    </Suspense>
  );
}
