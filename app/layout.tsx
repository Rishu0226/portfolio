import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishabh Dubey | Frontend Engineer – React & Next.js Specialist",
  description:
    "Frontend Engineer with 4+ years of experience building scalable, high-performance, SEO-optimized web apps using React.js and Next.js. Available for new opportunities.",
  keywords: [
    "Rishabh Dubey",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "Web Development",
    "SSR",
    "TypeScript",
    "JavaScript",
    "Muzaffarnagar",
    "India",
  ],
  authors: [{ name: "Rishabh Dubey", url: "https://github.com/Rishu0226" }],
  creator: "Rishabh Dubey",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Rishabh Dubey | Frontend Engineer – React & Next.js Specialist",
    description:
      "Frontend Engineer with 4+ years building scalable web applications using React.js and Next.js.",
    siteName: "Rishabh Dubey Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Dubey | Frontend Engineer",
    description:
      "Frontend Engineer with 4+ years building scalable web applications using React.js and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
