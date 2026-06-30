import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioPage } from "@/components/PortfolioPage";
import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata("process");

export default function ProcessPage() {
  return (
    <>
      <JsonLd section="process" />
      <PortfolioPage />
    </>
  );
}
