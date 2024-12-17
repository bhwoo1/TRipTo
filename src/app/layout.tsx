import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PagePadding from "@/components/layout/PagePadding";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRipTo. | 가고 싶은 곳이 어디든",
  description: "TRipTo. | 가고 싶은 곳이 어디든",
  icons: {
		icon: "/favicon-16x16.png",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SideBar>
          <Header><Footer><PagePadding>{children}</PagePadding></Footer></Header>
        </SideBar>
      </body>
    </html>
  );
}
