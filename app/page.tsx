import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PatternDivider } from "@/components/shared/PatternDivider";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { products as allProducts } from "@/lib/data";

export default function HomePage() {
  // Import products from data file
  return (
    <>
      <Hero />
      <BrandStory />
      <FeaturedProducts products={allProducts} />
      <PatternDivider />
      <NewsletterForm />
      <WhatsAppButton />
    </>
  );
}