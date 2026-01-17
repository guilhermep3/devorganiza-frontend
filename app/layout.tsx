import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/src/providers/queryProvider";

export const metadata: Metadata = {
  title: "DevOrganiza",
  description: "DevOrganiza - Organize seus estudos como desenvolvedor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`antialiased bg-zinc-100! dark:bg-background!`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
