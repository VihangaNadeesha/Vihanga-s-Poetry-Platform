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
    default: "රෝස අකුරු | Rosa Akuru",
    template: "%s | රෝස අකුරු"
  },
  description: "Sinhala-first romantic poetry platform for emotional writing, reactions, comments, and elegant reading.",
  openGraph: {
    title: "රෝස අකුරු",
    description: "අකුරු අතර සැඟවුණු ආදර කතා",
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
