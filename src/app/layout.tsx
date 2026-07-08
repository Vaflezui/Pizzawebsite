import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Pekarnya Pitsa Smayl — Піца та випічка у Києві",
  description: "Mini Pekarnya Pitsa Smayl — затишна міні-пекарня та піцерія у Києві на вулиці Героїв Дніпра 41.",
};

import { Nunito, Pacifico } from 'next/font/google';

const nunito = Nunito({ subsets: ['cyrillic', 'latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-body' });
const pacifico = Pacifico({ subsets: ['cyrillic', 'latin'], weight: '400', variable: '--font-accent' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${nunito.variable} ${pacifico.variable}`}>{children}</body>
    </html>
  );
}
