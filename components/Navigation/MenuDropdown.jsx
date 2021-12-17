import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export default function MenuDropdown({ header, items, href = "/" }) {
  const buttonRef = useRef(null);
  const [openState, setOpenState] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const router = useRouter();

  let timeout;
  const timeoutDuration = 100;

  const toggleMenuState = () => setMenuState(!menuState);

  const toggleMenu = (open) => {
    // log the current open state in React (toggle open state)
    setOpenState((openState) => !openState);
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click(); // eslint-disable-line
  };

  const onHover = (open, action) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it

    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      // clear the old timeout, if any
      clearTimeout(timeout);

      // open the modal after a timeout
      toggleMenu(open);
      // timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
    }
    // else: don't click! 😁
  };

  return (
    <Menu
      as="div"
      className="relative"
      onClick={() => {
        // setOpenState((openState) => !openState);
        clearTimeout(timeout);
        if (openState && !menuState) {
          setOpenState(!openState);
          router.push(href);
        }
      }}
    >
      {({ open }) => (
        <>
          <Menu.Button
            ref={buttonRef}
            onMouseEnter={() => {
              onHover(open, "onMouseEnter");
            }}
            onMouseLeave={() => {
              onHover(open, "onMouseLeave");
            }}
            className={`${
              open || menuState ? "text-yellowwallow" : ""
            } uppercase py-4 tracking-wide outline-none font-black flex justify-between space-x-2 hover:text-yellowwallow`}
          >
            {header}
            {open || menuState ? (
              <ChevronUpIcon className="w-6 h-6" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
          </Menu.Button>

          <Menu.Items
            static={menuState}
            onMouseEnter={toggleMenuState}
            onMouseLeave={toggleMenuState}
            className="absolute outline-none top-12 rounded-md flex flex-col space-y-4 z-10 w-[10vw] py-4 font-bold text-black"
          >
            <div className="rounded-md flex flex-col space-y-4 z-10 bg-yellowwallow w-[10vw] px-4 py-8 font-bold text-black">
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx === 0 ? <></> : <hr className="border-2 border-black" />}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={`/articles/s/${item
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {item}
                      </Link>
                    )}
                  </Menu.Item>
                </React.Fragment>
              ))}
            </div>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}
