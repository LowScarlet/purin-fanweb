import type { Metadata } from "next";
import { Permanent_Marker, Outfit } from "next/font/google";
import "../globals.css";
import { AudioProvider } from "@/components/context/AudioContext";
import { LoadingProvider } from "@/components/context/LoadingContext";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import PageTransitionSound from "@/components/ui/PageTransitionSound";
import { locales, Locale } from "@/lib/i18n/config";

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    metadataBase: new URL("https://fanweb-purin-kokoa.vercel.app"),
    title: isEn
      ? "Purin Kokoa (プリン・ココア) - Official Fan Portal"
      : "Purin Kokoa (プリン・ココア) - Portal Fan Resmi",
    description: isEn
      ? "Official Purin Kokoa fan portal - Live stream schedules, VTuber profile, cute voice clips, Purin's Apse Discord, and latest news!"
      : "Portal fan resmi Purin Kokoa - Jadwal live stream, profil VTuber, suara lucu, komunitas Discord Purin's Apse, dan berita terbaru!",
    keywords: [
      "Purin Kokoa",
      "VTuber",
      "Fan Portal",
      "Purin's Apse",
      "Cocoanuts",
      "Gunpla",
      "Livestream",
    ],
    authors: [{ name: "LowScarlet" }],
    openGraph: {
      title: "Purin Kokoa Official Fan Portal 🍮✨",
      description: "Your Sweet & Cozy Pudding VTuber Fan Portal",
      url: `https://fanweb-purin-kokoa.vercel.app/${locale}`,
      siteName: "Purin Kokoa Fanweb",
      images: [
        {
          url: "/bg.jpg",
          width: 1200,
          height: 630,
          alt: "Purin Kokoa Fan Portal",
        },
      ],
      locale: isEn ? "en_US" : "id_ID",
      type: "website",
    },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale: Locale = locale === "en" ? "en" : "id";

  return (
    <html
      lang={activeLocale}
      className={`${permanentMarker.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#fffcf8] text-[#42281d] font-sans antialiased selection:bg-[#fcaa94] selection:text-[#694231]">
        <I18nProvider locale={activeLocale}>
          <LoadingProvider>
            <AudioProvider>
              <LoadingScreen />
              <PageTransitionSound />
              {children}
            </AudioProvider>
          </LoadingProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
