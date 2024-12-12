

import Head from "next/head";  // Use next/head here
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Outfit} from "next/font/google"


import Providers from "@/providers";

// Local fonts

const outfit = Outfit({subsets:['latin']})

export const metadata = {
  title: "Nike IN",
  description: "Nike shoes Ecom Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Preconnect links for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* Google Fonts stylesheet */}
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={outfit.className}
      >
        <Providers>
        <Header/>
        {children}
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
