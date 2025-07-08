"use client";

import { Dispatch, SetStateAction } from "react";

import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { navbarLinks } from "@/app/(public)/_components/navbar";

interface MobileNavbarProps {
  setOpenMobileSidebar: Dispatch<SetStateAction<boolean>>;
  openMobileSidebar: boolean;
}

const MobileNavbar = ({
  setOpenMobileSidebar,
  openMobileSidebar,
}: MobileNavbarProps) => {
  const { status } = useSession(); // Get user session status

  // Closes the sidebar when a link is clicked
  const handleLinkClick = () => {
    setOpenMobileSidebar(false);
  };

  return (
    <Sheet open={openMobileSidebar} onOpenChange={setOpenMobileSidebar}>
      <SheetContent className={"bg-white p-0"} side="left">
        {/* Header with Logo and Title */}
        <SheetHeader className="border-b border-solid border-b-[#f0f3f4] p-4">
          <SheetTitle>
            <div className="flex items-center gap-4 text-[#111618]">
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
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Links and Action Button */}
        <div className="flex h-full flex-col p-6">
          <div className="flex flex-col items-start space-y-6">
            {navbarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="font-medium text-[#111618]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer to push button to the bottom */}
          <div className="mt-auto">
            <Button
              onClick={handleLinkClick}
              asChild
              className="h-12 w-full cursor-pointer rounded-xl bg-[#30bde8] px-4 text-base font-bold tracking-[0.015em] text-[#111618] hover:bg-[#30bde8]/90"
            >
              {status === "authenticated" ? (
                <Link href={"/test"}>Start Test</Link>
              ) : (
                <Link href={"/sign-in"}>Login</Link>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
