import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export function PortfolioPage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Process />
      <Services />
      <Contact />
    </>
  );
}
