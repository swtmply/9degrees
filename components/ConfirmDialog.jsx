import { useState } from "react";
import axios from "axios"
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";

export default function ConfirmDialog({ isOpen, setIsOpen, articleId, onTrashPage }) {


  console.log("dialog article Id", articleId)
  const closeDialog = () => {
    setIsOpen(false)
    if (onTrashPage) {
      // axios.delete()
      // TODO delete article
      console.log("nasa trash page ka boy")
    } else {
      console.log("wala ka sa trash page")
      // axios.put()
      // TODO isDeleted: true
    }
  };

  return (
    <Dialog
      className="fixed z-50 inset-0 overflow-y-auto"
      open={isOpen}
      onClose={closeDialog}
    >
      <div className="flex items-center justify-center min-h-screen w-full">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative px-4 py-4 bg-white rounded w-[500px] mx-auto">
          <Dialog.Title className="font-bold text-4xl">
            Delete
          </Dialog.Title>
          <hr className="my-2 border-2 border-yellowwallow" />

          <p className="text-gray-400">
            Article will be moved to trash. Are you sure you want to continue?
          </p>

          <button
            className="px-16 py-2 float-right font-bold uppercase focus:outline-none mt-5 bg-yellowwallow rounded-md"
            onClick={setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-16 py-2 float-right font-bold uppercase focus:outline-none mt-5 bg-yellowwallow rounded-md"
            onClick={closeDialog}
          >
            Yes
          </button>
          
        </div>
      </div>
    </Dialog>
  );
}
