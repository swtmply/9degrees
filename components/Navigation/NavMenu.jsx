import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuDropdown from "./MenuDropdown";

export default function NavMenu({ breakpoint }) {
  const [navbarState, setNavbarState] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= breakpoint) {
      setNavbarState(true);
    } else {
      setNavbarState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="lg:w-full lg:flex hidden justify-center sticky top-4 z-10">
      <div
        className={`transition-colors ${
          navbarState ? "bg-black text-white" : "bg-yellowwallow text-black"
        } w-[80%] py-4 px-16 flex justify-around rounded-lg hover:bg-black  hover:text-white`}
      >
        <MenuDropdown
          header="news"
          items={["Nation", "University", "alt0176"]}
          href="/articles/news"
        />
        <MenuDropdown
          header="features"
          items={["Profiles", "Opinion", "In Photos"]}
          href="/articles/features"
        />
        <MenuDropdown
          header="community"
          items={["Catwalk", "Anonas Street"]}
          href="/articles/community"
        />
        <MenuDropdown
          header="Cultures and Lifestyle"
          items={["Life", "Entertainment", "Food and Travel", "New Normal"]}
          href="/articles/cultures-lifestyle"
        />
        <Link href="/so-lit">
          <p className="font-bold hover:text-yellowwallow cursor-pointer">
            SO LIT!
          </p>
        </Link>
        <MenuDropdown
          header="9°"
          items={["Cover Story", "We Are 9°"]}
          href="/articles/nine-degrees"
        />
      </div>
    </div>
  );
}
