import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar"; 
import Footer from "./components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umbrella Corporation Agricultura",
  description: "Plataforma generada para una plataforma muestra de Agricultura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <link rel="icon" href="/plataforma/public/icons/logo1.svg" sizes="any" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar /> {/* Barra de Navegación */}
        <main className="">{children}</main>
        <Footer /> {/* Pie de pàgina */}
      </body>
    </html>
  );
}
