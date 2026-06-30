import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioPage } from "@/components/PortfolioPage";
import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <JsonLd section="services" />
      <PortfolioPage />
    </>
  );
}
