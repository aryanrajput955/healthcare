import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Script from "next/script";
import { AuthProvider } from "./authprovider";
import { Metadata } from "next";

export const metadata = {
  metadataBase: new URL("https://www.indiem.tech"), // ✅ Add this line
  title: "Expert Health Insurance Claims Service Patients | Indiem",
  description:
    "Specialized healthcare claims service for hospitals and patients in India. Expert processing, appeals, faster settlements. Risk-free consultation available.",
  keywords:
    "health insurance claims service, cashless claims processing, insurance claim appeals, health claim reimbursement, claim rejection recovery",
  openGraph: {
    title: "Expert Health Insurance Claims Service Patients | Indiem",
    description:
      "Trusted experts in healthcare insurance claims for hospitals and patients. Get fast reimbursements, appeal support, and cashless claim assistance.",
    url: "https://indiem.tech/",
    siteName: "Indiem",
    images: [
      {
        url: "/logo.png", // can stay relative now because metadataBase is defined
        width: 1200,
        height: 630,
        alt: "Indiem Health Insurance Claims Service",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-650PNCGFFE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-650PNCGFFE');
          `}
        </Script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="pt-16">
          <AuthProvider>{children}</AuthProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
