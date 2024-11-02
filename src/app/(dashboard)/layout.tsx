import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/contexts/themeProvider/ThemeProvider";
import ClerkProviderWithTheme from "@/contexts/clerkProviderWithTheme/ClerkProviderWithTheme";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/dashboard/SideNavbar";
import { Toaster } from "react-hot-toast";
import ProductStore from "@/contexts/productsStore/ProductStore";
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
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={cn(
            "min-h-screen w-full bg-white text-black dark:bg-black dark:text-white flex antialiased",
            geistSans.variable,
            geistMono.variable,
            {
              "debug-screens": process.env.NODE_ENV === "development",
            }
          )}
        >
          <ClerkProviderWithTheme>
            <ProductStore>
              <SideNavbar />
              {children}
              <Toaster />
            </ProductStore>
          </ClerkProviderWithTheme>
        </body>
      </ThemeProvider>
    </html>
  );
}
