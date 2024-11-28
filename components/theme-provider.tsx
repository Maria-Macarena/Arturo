"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: "light" | "dark"
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme={defaultTheme} 
      enableSystem={false}
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  )
}