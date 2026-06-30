import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioPage } from "@/components/PortfolioPage";
import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata("experience");

export default function ExperiencePage() {
  return (
    <>
      <JsonLd section="experience" />
      <PortfolioPage />
    </>
  );
}
