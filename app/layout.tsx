import type { Metadata } from "next";
import { Permanent_Marker, Outfit } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/components/context/AudioContext";
import { LoadingProvider } from "@/components/context/LoadingContext";
import LoadingScreen from "@/components/ui/LoadingScreen";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://fanweb-purin-kokoa.vercel.app"),
  title: "Purin Kokoa (プリン・ココア) - Official Fan Portal",
  description: "Portal fan resmi Purin Kokoa - Jadwal live stream, profil VTuber, suara lucu, komunitas Discord Purin's Apse, dan berita terbaru!",
  keywords: ["Purin Kokoa", "VTuber", "Fan Portal", "Purin's Apse", "Cocoanuts", "Gunpla", "Livestream"],
  authors: [{ name: "LowScarlet" }],
  openGraph: {
    title: "Purin Kokoa Official Fan Portal 🍮✨",
    description: "Your Sweet & Cozy Pudding VTuber Fan Portal",
    url: "https://fanweb-purin-kokoa.vercel.app",
    siteName: "Purin Kokoa Fanweb",
    images: [
      {
        url: "/bg.jpg",
        width: 1200,
        height: 630,
        alt: "Purin Kokoa Fan Portal",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${permanentMarker.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fffcf8] text-[#42281d] font-sans antialiased selection:bg-[#fcaa94] selection:text-[#694231]">
        <LoadingProvider>
          <AudioProvider>
            <LoadingScreen />
            {children}
          </AudioProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
