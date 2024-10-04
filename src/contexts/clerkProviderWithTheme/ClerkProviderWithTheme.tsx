"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ClerkProviderWithTheme = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme, systemTheme } = useTheme();
  const [clerkTheme, setClerkTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setClerkTheme("dark");
    } else {
      setClerkTheme("light");
    }
  }, [theme, systemTheme]);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkTheme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWithTheme;
