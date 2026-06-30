import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioPage } from "@/components/PortfolioPage";
import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd section="about" />
      <PortfolioPage />
    </>
  );
}
