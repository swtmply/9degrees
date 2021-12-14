import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import Search from "../../Search";
import MobileMenuDropdown from "./MobileMenuDropdown";

export default function MobileMenu({ isOpen, setIsOpen }) {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex justify-center items-start fixed top-0 left-0 w-full h-full bg-black overflow-auto ease-in-out transition-all duration-300 z-50`}
    >
      <div className="w-[80%] mt-8 flex flex-col justify-center items-center">
        <button
          className="cursor-pointer mb-8 self-end"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <ChevronRightIcon className="w-10 h-10" />
        </button>

        <Search />

        <div className="mt-10">
          <Link href="/">
            <p className="flex w-full justify-center space-x-2 items-center text-2xl py-4 hover:text-yellowwallow">
              Home Page
            </p>
          </Link>
          <MobileMenuDropdown
            header="News"
            items={["News Section", "Nation", "University", "alt0176"]}
            href="/articles/c/news"
          />
          <MobileMenuDropdown
            header="Features"
            items={["Features Section", "Profiles", "Opinion", "In Photos"]}
            href="/articles/c/features"
          />
          <MobileMenuDropdown
            header="Community"
            items={["Community Section", "Catwalk", "Anonas Street"]}
            href="/articles/c/community"
          />
          <MobileMenuDropdown
            header="Cultures and Lifestyle"
            items={[
              "Cultures and Lifestyle Section",
              "Life",
              "Entertainment",
              "Food and Travel",
              "New Normal",
            ]}
            href="/articles/c/cultures-lifestyle"
          />
          <Link href="/articles/c/so-lit">
            <p className="flex w-full justify-center space-x-2 items-center text-2xl py-4 hover:text-yellowwallow">
              So Lit!
            </p>
          </Link>
          <MobileMenuDropdown
            header="9°"
            items={["9° Section", "Cover Story", "We Are 9°"]}
            href="/articles/c/nine-degrees"
          />
        </div>
      </div>
    </div>
  );
}
