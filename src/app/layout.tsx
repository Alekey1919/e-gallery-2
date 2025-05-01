import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "./css/globals.css";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-gallery",
  description: "The art of in-game photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bitter.variable} antialiased`}>{children}</body>
    </html>
  );
}
