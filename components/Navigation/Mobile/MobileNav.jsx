import Image from "next/image";
import React, { useEffect, useState } from "react";

import iconMark from "public/iconmark-white.svg";
import { MenuIcon } from "@heroicons/react/solid";
import MobileMenu from "./MobileMenu";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  return (
    <div className="flex justify-between items-center w-full bg-black px-4 py-2 fixed top-0 z-10 text-white">
      <Link href="/">
        <Image
          src={iconMark}
          alt="Nine Degree Icon Mark"
          height="64px"
          width="64px"
        />
      </Link>

      <button onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon className="w-8 h-8 cursor-pointer hover:text-yellowwallow" />
      </button>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
