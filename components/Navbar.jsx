"use client"
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import Avatar from "./Avatar";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const navItemsInfo = [
  { name: "New", type: "link", href: "/" },
  { name: "Products", type: "link", href: "/products" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/" },
      { title: "Contact us", href: "/" },
    ],
  },
];

const MenuItem = ({ onClick = () => { }, label, link = "", className = "" }) => (
  <>
    {link ? (
      <Link href={link}>
        <div
          onClick={onClick}
          className={`${className
            ? className
            : "px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            }`}
        >
          {label}
        </div>
      </Link>
    ) : (
      <div
        onClick={onClick}
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
        {label}
      </div>
    )}
  </>
);

const NavItem = ({ item, className = "" }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((curState) => !curState);
  };



  return (
    <div className={`relative group ${className}`}>
      {item.type === "link" ? (
        <>
          <Link href={item.href || "/"} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="px-4 flex gap-x-1 items-center"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown className="lg:block hidden" />
          </button>
          <div
            className={`${dropdown ? "block" : "hidden"
              } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
  };
  const [mobileMenu, setMobileMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      window.scrollY > lastScrollY && !mobileMenu
        ? setShow("-translate-y-[100px]")
        : setShow("drop-shadow-sm bg-white");
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  const [rotateHam, setRotateHam] = useState(false);

  return (
    <section className={`z-50 bg-[#E9E8E6] sticky top-0 transition-all duration-200 ${show}`}>
      <header className="container relative mx-auto flex justify-between items-center px-4 md:px-12 lg:px-32 py-4">
        <Link href="/">
          <Image width={200} height={200} className="w-12 rounded-lg" src="/logo.svg" alt="logo" />
        </Link>
        <div
          className={`relative w-10 h-10 duration-[350ms] transition-all link flex md:hidden items-center justify-center`}
          onClick={() => setRotateHam(!rotateHam)}
          style={{
            rotate: rotateHam ? "-180deg" : "0deg",
          }}
        >
          <RxHamburgerMenu
            className={`text-2xl ${rotateHam ? "opacity-0" : "opacity-100"
              } transition-opacity duration-[350ms]`}
          />
          <RxCross1
            className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl ${rotateHam ? "opacity-100" : "opacity-0"
              } transition-opacity duration-[350ms]`}
          />
        </div>
        <div className="lg:flex gap-10 hidden">
          <div className="text-white items-center lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 gap-y-3 font-semibold ">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
            <Link href="/editor">
              <BiAddToQueue
                size={20}
                className="text-blue-500 lg:block hidden"
              />
            </Link>
          </div>
          <Link href="/profile" className={`cursor-pointer lg:block hidden`}>
            <Avatar src="/user.png" />
          </Link>
        </div>
      </header>
    </section>
  );
};

export default Navbar;