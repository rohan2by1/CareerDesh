"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
      <Switch 
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <MoonIcon className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
    </div>
  );
}
