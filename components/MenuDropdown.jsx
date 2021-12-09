import { Menu } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

export default function MenuDropdown({ header, items }) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`${
              open ? "text-yellowwallow" : ""
            } uppercase font-bold flex justify-between space-x-2`}
          >
            {header}
            {open ? (
              <ChevronUpIcon className="w-6 h-6" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
          </Menu.Button>
          <Menu.Items className="absolute top-12 rounded-md flex flex-col space-y-4 z-10 bg-yellowwallow w-[10vw] px-4 py-8 font-bold text-black">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx === 0 ? <></> : <hr className="border-2 border-black" />}
                <Menu.Item>
                  {({ active }) => <Link href="/">{item}</Link>}
                </Menu.Item>
              </React.Fragment>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}
