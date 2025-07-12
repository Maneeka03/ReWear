import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyberpunk",
  description: "Created with Cyberpunk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
