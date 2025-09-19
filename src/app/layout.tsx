import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const globalData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/global?populate=*`);
const global = await globalData.json();

export const metadata: Metadata = {
  title: global.data.propertyName,
  description: global.data.description,
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --global-primary-color: ${global?.data?.primaryColor};
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header
          logo={global?.data?.logo?.url}
          navItems={global?.data?.topNavItems}
        />
        {children}
        <Footer
          {...global?.data}
        />
      </body>
    </html>
  );
}
