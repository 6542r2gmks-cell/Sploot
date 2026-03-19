import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sploot | Ready for the right dog",
  description:
    "Sploot screens readiness, curates dog matches, and guides owners through the critical first months after adoption.",
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
