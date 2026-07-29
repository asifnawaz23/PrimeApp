import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryPopup from "@/components/InquiryPopup";
import PageTransition from "@/components/PageTransition";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Prime App Solutions | Premium Software Development Agency",
    template: "%s | Prime App Solutions",
  },
  description:
    "Prime App Solutions is an elite software development agency building high-performance web, mobile, blockchain, game development, and AI solutions.",
  metadataBase: new URL("https://primeappsolutions.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prime App Solutions | Premium Software Development Agency",
    description:
      "We design and build custom software, mobile apps, web applications, and AI integrations with premium, high-conversion engineering.",
    url: "https://primeappsolutions.site",
    siteName: "Prime App Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime App Solutions",
    description: "Premium Software Development Agency.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-gray-100 font-sans selection:bg-accent-violet/30 selection:text-accent-cyan">
        <AppProvider>
          {/* Subtle global noise overlay for texture */}
          <div className="noise-overlay" />
          
          {/* Gradient mesh ambient glows in background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-violet/10 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-cyan/5 blur-[120px] animate-pulse-slow" />
          </div>

          {/* Global wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <PageTransition>
              <main className="flex-grow relative z-10">{children}</main>
              <Footer />
            </PageTransition>
            <InquiryPopup />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
