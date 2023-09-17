import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TRPCProvider from "@/app/_trpc/Provider";
import { NextAuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App For learning tRPC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bgColor`}>
        <NextAuthProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
