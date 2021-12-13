import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function PopupDialog({ isOpen, setIsOpen }) {
  return (
    <Dialog
      className="fixed z-50 inset-0 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-center min-h-screen w-full">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative px-4 py-4 bg-white rounded w-[500px] mx-auto">
          <Dialog.Title className="font-bold text-4xl">
            Article moved to drafts
          </Dialog.Title>
          {/* <Dialog.Description>
            Please wait until the head or EIC to publish it.
          </Dialog.Description> */}
          <hr className="my-2 border-2 border-yellowwallow" />

          <p className="text-gray-400">
            Check your drafts to see how it looks when published
          </p>

          {/* TODO: GO TO PROFILE */}
          <button
            className="px-16 py-2 float-right font-bold uppercase focus:outline-none mt-5 bg-yellowwallow rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Okay
          </button>
        </div>
      </div>
    </Dialog>
  );
}
