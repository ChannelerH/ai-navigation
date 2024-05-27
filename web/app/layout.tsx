import "./globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { CommonProvider } from '~/app/context/common-context';
import { NextAuthProvider } from '~/app/context/next-auth-context';
import { Toaster } from '@/app/components/Ui/sonner';
import SeoScript from '@/app/components/Seo/SeoScript';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AITool Diectory: List of The Best & Latest AI Tools",
  description:
    "Find The Best & Latest AI Tool, Explore the right AI tool for you. AI Tools list is auto updated by ChatGPT.",
  // keywords:
  //   "GPTs, GPTs store, GPTs Works, ChatGPT, OpenAI GPTs, vector search GPTs",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <main>
        <NextAuthProvider>
        <Toaster
            position='top-center'
            toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'text-green-400',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}
          />
          <CommonProvider>
          <Header />
          {children}
          <Footer />
          </CommonProvider>
          </NextAuthProvider>
        </main>

        <SeoScript />
        {/* <script
          defer
          data-domain="gpts.works"
          src="https://plausible.io/js/script.js"
        ></script> */}
      </body>
    </html>
  );
}
