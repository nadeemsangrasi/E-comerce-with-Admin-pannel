import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/contexts/themeProvider/ThemeProvider";
import ClerkProviderWithTheme from "@/contexts/clerkProviderWithTheme/ClerkProviderWithTheme";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Poppins } from "next/font/google";
import ProductStore from "@/contexts/productsStore/ProductStore";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QuickCart",
  description: "A rich ecommerce shopping mart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased relative`}
      >
        <ClerkProviderWithTheme>
          <ProductStore>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </ProductStore>
        </ClerkProviderWithTheme>
      </body>
    </html>
  );
}
