import Footer from "@/components/Footer";
import Nav from "@/components/Navigation/Nav";
import NavMenu from "@/components/Navigation/NavMenu";
import moment from "moment";
import Image from "next/image";
import React from "react";

import placeholder from "public/ad-placeholder.png";
import NineDegreesArticle from "@/components/NineDegreesArticle/NineDegreesArticle";

export default function NineDegrees() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Nav breakpoint={400} />

      <main className="mt-20 w-full flex flex-col justify-center items-center">
        <div className="relative w-full h-[40vh]">
          <Image
            src={placeholder}
            alt="hero image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <NavMenu breakpoint={400} />

        <NineDegreesArticle />
      </main>

      <Footer />
    </div>
  );
}
