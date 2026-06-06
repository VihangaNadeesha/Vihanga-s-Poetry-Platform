import type { Metadata } from "next";
import { Noto_Serif_Sinhala } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const sinhala = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-sinhala",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "ප්‍රේමය අනන්තයි | Premaya Ananthayi",
    template: "%s | ප්‍රේමය අනන්තයි"
  },
  description: "Sinhala-first romantic poetry platform for emotional writing, reactions, comments, and elegant reading.",
  openGraph: {
    title: "ප්‍රේමය අනන්තයි | Premaya Ananthayi",
    description: "තුන්කල් කාව්‍යමය ප්‍රේම ජවනිකාව",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="si" className={sinhala.variable}>
      <body className="min-h-screen bg-ink font-sans text-paper antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
