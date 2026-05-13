import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import { Syne } from 'next/font/google'
import { LenisProvider } from "@/lenis/LenisScroll";


const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})

const kaku = localFont({
  src: './fonts/HeiseiKakuGothic.woff2',
  variable: '--font-kaku',
  display: 'swap',
});
const futura = localFont({
  variable: "--font-futura",
  src: './fonts/Futura-Bold.woff2'
});
const Neulis_Neue = localFont({
  src: './fonts/Neulis_Neue.woff2',
  variable: '--font-neulis',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sayeed Shorif - Portfolio",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kaku.variable}  ${syne.variable} ${Neulis_Neue.variable} ${futura.variable} h-full antialiased `}
    >
      <body className="min-h-full  flex flex-col" suppressHydrationWarning>
        <LenisProvider>
          <main className="overflow-hidden">
            {children}
            <Footer />
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
