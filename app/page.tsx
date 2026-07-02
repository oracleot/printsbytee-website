import { HeroSection } from "@/components/home/HeroSection";
import { StickyScrollReveal } from "@/components/home/StickyScrollReveal";
import { AnimatedTestimonials } from "@/components/home/AnimatedTestimonials";
import { PatternDivider } from "@/components/shared/PatternDivider";
// NewsletterForm hidden until API integration is complete
// import { NewsletterForm } from "@/components/home/NewsletterForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StickyScrollReveal />
      <AnimatedTestimonials />
      <PatternDivider />
      {/* <NewsletterForm /> — hidden until API integration is complete */}
      <WhatsAppButton />
    </>
  );
}
