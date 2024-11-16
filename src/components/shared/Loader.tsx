"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = ({ text }: { text?: string }) => {
  const { theme } = useTheme();
  const [loaderColor, setLoaderColor] = useState("#000");

  useEffect(() => {
    setLoaderColor(theme === "dark" ? "#fff" : "#000");
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center  ">
      <HashLoader
        color={loaderColor}
        size={50}
        speedMultiplier={0.8}
        data-testid="loader"
        data-cy="loader"
      />
      <p className="text-lg text-gray-500 dark:text-gray-300">{text}</p>
    </div>
  );
};

export default Loader;
