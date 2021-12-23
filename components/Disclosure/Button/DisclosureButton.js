import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";

export default function DisclosureButton({ open, title }) {
  return (
    <Disclosure.Button
      className={`w-full p-4 flex justify-start items-center bg-gray-300 rounded-lg font-bold text-lg ${
        open ? "rounded-b-none text-padeepBlue" : "text-gray-500 "
      }`}
    >
      {open ? (
        <ChevronUpIcon className="w-6 h-6 mr-2" />
      ) : (
        <ChevronDownIcon className="w-6 h-6 mr-2" />
      )}
      <span>{title}</span>
    </Disclosure.Button>
  );
}
