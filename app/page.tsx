import { HeroParallax } from "@/components/home/HeroParallax";
import { StickyScrollReveal } from "@/components/home/StickyScrollReveal";
import { BentoGrid } from "@/components/home/BentoGrid";
import { AnimatedTestimonials } from "@/components/home/AnimatedTestimonials";
import { PatternDivider } from "@/components/shared/PatternDivider";
// NewsletterForm hidden until API integration is complete
// import { NewsletterForm } from "@/components/home/NewsletterForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { products as allProducts } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroParallax />
      <StickyScrollReveal />
      <BentoGrid products={allProducts} />
      <AnimatedTestimonials />
      <PatternDivider />
      {/* <NewsletterForm /> — hidden until API integration is complete */}
      <WhatsAppButton />
    </>
  );
}
