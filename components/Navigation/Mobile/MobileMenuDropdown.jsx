import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

export default function MobileMenuDropdown({ header, items, href = "/" }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`${
              open ? "text-yellowwallow" : ""
            } flex w-full justify-center space-x-2 items-center text-2xl py-4 `}
          >
            <span>{header}</span>
            <ChevronDownIcon className="w-8 h-8" />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="duration-100 ease-out"
            enterFrom="-translate-y-6 opacity-0"
            enterTo="-translate-y-0 opacity-100"
            leave="duration-75 ease-out"
            leaveFrom="-translate-y-0 opacity-100"
            leaveTo="-translate-y-6 opacity-0"
          >
            <Disclosure.Panel className="flex flex-col justify-center items-center space-y-4">
              <Link href={href}>{items[0]}</Link>
              {items.map((item, idx) => {
                if (idx !== 0)
                  return (
                    <Link
                      key={idx}
                      href={`/articles/s/${item
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      <p>{item}</p>
                    </Link>
                  );
              })}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
