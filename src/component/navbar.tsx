"use client";
import Container from "./container";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";

export const NavLinks = [
  { label: "", link: "/" },
  { label: "Blog", link: "/blog" },
  { label: "Company", link: "/company" },
  { label: "Contact", link: "/contact" },
  { label: "Login", link: "/login" },
];

export const DesktopIcon = () => {
  return (
    <div className="hidden lg:inline-flex items-center gap-1">
      {NavLinks?.map((item) => (
        <Link
          href={item?.link}
          key={item?.label}
          className="text-lg font-semibold px-4 py-2 hover:bg-amber-600/10 "
        >
          {item?.label}
        </Link>
      ))}
    </div>
  );
};

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="lg:hidden">
      <button
        onClick={handleHamburger}
        className="text-2xl px-4 py-2 hover:bg-black/5 rounded-md
      cursor-pointer duration-300 ease-in-out"
      >
        <FaBars />
      </button>
      {isOpen && (
        <div className="w-full p-8 bg-black h-screen fixed top-0 left-0 duration-300 ease-in-out">
          <div
            onClick={handleHamburger}
            className="border border-gray-400 rounded-md text-white p-4 py-10"
          >
            <div className="w-full flex items-center justify-between gap-5 pb-5">
              <Link
                href={"/"}
                className="text-2xl font-semibold text-white capitalize"
              >
                Bloggers
              </Link>
              <button
                onClick={handleHamburger}
                className="cursor-pointer text-lg px-3 py-2 border border-gray-300 hover:border-red-600 rounded-md duration-300 ease-in-out"
              >
                <FaXmark />
              </button>
            </div>
            <div className="flex flex-col items-start gap-y-2">
              {NavLinks?.map((item, index) => (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  key={item?.label}
                >
                  <Link
                    href={item?.link}
                    className="hover:text-blue-500 hover:border-b border-b-gray-300 w-full duration-300"
                  >
                    {item?.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function navbar() {
  return (
    <div className="w-full h-20 border-b border-b-gray-200">
      <Container className="h-full flex items-center justify-between gap-1">
        <Link
          href={"/"}
          className="text-2xl font-semibold text-black capitalize
         hover:bg-amber-600/10 px-4 py-2 duration-300 ease-in-out"
        >
          Bloggers
        </Link>
        <DesktopIcon />
        <MobileNavigation />
      </Container>
    </div>
  );
}
