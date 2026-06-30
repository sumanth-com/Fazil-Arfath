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
import { GEO, SECTION_SEO, SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SECTION_SEO.home.title,
    template: `%s | ${SITE.name}`,
  },
  description: SECTION_SEO.home.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.person, url: SITE.linkedin }],
  creator: SITE.person,
  publisher: SITE.name,
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: SECTION_SEO.home.title,
    description: SECTION_SEO.home.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${SITE.personShort}`,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": GEO.regionCode,
    "geo.placename": GEO.locality,
    "geo.position": `${GEO.latitude};${GEO.longitude}`,
    ICBM: `${GEO.latitude}, ${GEO.longitude}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${outfit.variable} ${cormorant.variable} splash-pending`}
    >
      <head>
        <meta name="author" content={SITE.person} />
        <meta name="geo.region" content={GEO.regionCode} />
        <meta name="geo.placename" content={GEO.locality} />
        <meta name="geo.position" content={`${GEO.latitude};${GEO.longitude}`} />
        <meta name="ICBM" content={`${GEO.latitude}, ${GEO.longitude}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("fazil-splash-seen")==="1"){document.documentElement.classList.remove("splash-pending");document.documentElement.classList.add("splash-ready");}}catch(e){document.documentElement.classList.remove("splash-pending");document.documentElement.classList.add("splash-ready");}`,
          }}
        />
      </head>
      <body className="bg-bg font-sans text-primary antialiased">
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
