import type { Metadata } from "next";
import { Outfit, Cormorant } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { GsapProvider } from "@/components/layout/GsapProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${SITE.person} — ${SITE.roleTitle} | ${SITE.name}`,
  description: `${SITE.tagline} Google Ads, SEO, and performance marketing for B2B SaaS and technology companies in Bangalore, India.`,
  keywords: [
    "Google Ads expert Bangalore",
    "SEO specialist India",
    "digital marketing freelancer",
    "performance marketing B2B SaaS",
    SITE.person,
    SITE.alsoKnownAs,
  ],
  openGraph: {
    title: `${SITE.person} — ${SITE.roleDetail}`,
    description: SITE.tagline,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} splash-pending`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("fazil-splash-seen")==="1"){document.documentElement.classList.remove("splash-pending");document.documentElement.classList.add("splash-ready");}}catch(e){document.documentElement.classList.remove("splash-pending");document.documentElement.classList.add("splash-ready");}`,
          }}
        />
      </head>
      <body className="bg-bg font-sans text-primary antialiased">
        <JsonLd />
        <SmoothScroll>
          <GsapProvider>
            <AppShell>
              <CustomCursor />
              <ScrollProgress />
              <SiteChrome>
                <Header />
              </SiteChrome>
              <main>{children}</main>
              <Footer />
            </AppShell>
          </GsapProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
