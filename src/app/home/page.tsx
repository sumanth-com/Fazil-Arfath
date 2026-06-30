import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioPage } from "@/components/PortfolioPage";
import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata("home");

export default function HomeAliasPage() {
  return (
    <>
      <JsonLd section="home" />
      <PortfolioPage />
    </>
  );
}
