import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function PopupDialog({ isOpen, setIsOpen }) {
  return (
    <Dialog
      className="fixed z-50 inset-0 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-sm mx-auto">
          <Dialog.Title>Article moved to drafts</Dialog.Title>
          {/* <Dialog.Description>
            Please wait until the head or EIC to publish it.
          </Dialog.Description> */}

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Necessitatibus dignissimos similique suscipit optio sed labore
            adipisci quaerat sint obcaecati exercitationem!
          </p>

          {/* TODO: GO TO PROFILE */}
          <button onClick={() => setIsOpen(false)}>Okay</button>
        </div>
      </div>
    </Dialog>
  );
}
