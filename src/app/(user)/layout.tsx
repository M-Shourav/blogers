import type { Metadata } from "next";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import Container from "@/component/container";
import Navbar from "@/component/navbar";

export const metadata: Metadata = {
  title: "My-Blog",
  description:
    "Stay Informed with products update,company news and insight on how to sell smarter at your company ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <Container className="h-20 flex items-center justify-between gap-5">
          <Navbar />
        </Container>
        {children}
      </SessionProvider>
    </>
  );
}
