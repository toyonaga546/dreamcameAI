import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream Journal - 夢日記",
  description: "夢を記録するWebアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
        {children}
      </body>
    </html>
  );
}
