"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import MobileNavbar from "@/app/(public)/_components/mobile-navbar";

export const navbarLinks = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const session = useSession();
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  const isAuthenticated = session.status === "authenticated";

  return (
    <>
      <MobileNavbar
        setOpenMobileSidebar={setOpenMobileSidebar}
        openMobileSidebar={openMobileSidebar}
      />
      <header className="container mx-auto flex items-center justify-between border-b border-solid border-b-[#f0f3f4] py-3 whitespace-nowrap">
        <Link href={"/"} className="flex items-center gap-4 text-[#111618]">
          <div className="size-14">
            <Image
              src={"/fll-logo.PNG"}
              alt={"fll logo"}
              height={64}
              width={64}
            />
          </div>
          <h2 className="text-lg leading-tight font-bold tracking-[-0.015em] text-[#111618]">
            AUT FLL
          </h2>
        </Link>
        {/*Navbar links*/}
        <div className="hidden flex-1 justify-end gap-8 md:flex">
          <div className="flex items-center gap-9">
            {navbarLinks.map((link) => (
              <Link
                className="text-sm leading-normal font-medium text-[#111618]"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link href={isAuthenticated ? "/test" : "/sign-in"}>
            <Button className="cursor-pointer">
              {isAuthenticated ? "Start Test" : "Login"}
            </Button>
          </Link>
        </div>
        <div className={"flex md:hidden"}>
          <Button
            variant={"ghost"}
            className={"cursor-pointer"}
            onClick={() => setOpenMobileSidebar(true)}
          >
            <Menu />
          </Button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
