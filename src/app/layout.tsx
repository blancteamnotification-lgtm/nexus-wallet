import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AmplitudeProvider } from "@/shared/components/AmplitudeProvider";
import { criticalCss } from "@/shared/styles/critical-css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Wallet",
  description: "NEXUS — new generation crypto wallet",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#08040d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body className="antialiased">
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
        />
        <AmplitudeProvider>{children}</AmplitudeProvider>
      </body>
    </html>
  );
}
