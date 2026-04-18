import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const fontSyne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const fontDmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shamanth Poojary — Portfolio",
  description: "Portfolio of Shamanth Poojary, a Full-Stack Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSyne.variable} ${fontDmSans.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex relative overflow-x-hidden" suppressHydrationWarning>
        {/* Animated Background Orbs for Glassmorphism Context */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-dark-300 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] min-w-[300px] min-h-[300px] rounded-full bg-brand/10 blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] min-w-[400px] min-h-[400px] rounded-full bg-[rgba(104,160,99,0.1)] blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] min-w-[250px] min-h-[250px] rounded-full bg-[rgba(38,77,228,0.1)] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <Sidebar />
        <main className="flex-1 lg:ml-[80px] w-full max-w-full pb-16 lg:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
