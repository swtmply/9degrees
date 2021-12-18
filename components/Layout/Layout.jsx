import Head from "next/head";
import React from "react";
import Footer from "../Footer";
import Nav from "../Navigation/Nav";

export default function Layout({ children, title }) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Head>
        <title className="capitalize">{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      {children}

      <Footer />
    </div>
  );
}
