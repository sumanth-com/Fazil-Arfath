import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioPage } from "@/components/PortfolioPage";
import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd section="contact" />
      <PortfolioPage />
    </>
  );
}
