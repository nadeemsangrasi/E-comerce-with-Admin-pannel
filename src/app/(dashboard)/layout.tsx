import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/contexts/themeProvider/ThemeProvider";
import ClerkProviderWithTheme from "@/contexts/clerkProviderWithTheme/ClerkProviderWithTheme";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/dashboard/SideNavbar";

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
        className={cn(
          "min-h-screen w-full bg-white text-black flex antialiased",
          geistSans.variable,
          geistMono.variable,
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProviderWithTheme>
            {/* side bar */}
            <SideNavbar />
            {/* content */}
            {children}
          </ClerkProviderWithTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
