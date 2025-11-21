import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

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
        className={`antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
