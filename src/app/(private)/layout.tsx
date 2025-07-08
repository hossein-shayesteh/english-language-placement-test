import React from "react";

import Navbar from "@/app/(public)/_components/navbar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="group/design-root relative flex size-full min-h-screen flex-col overflow-x-hidden bg-white">
      <div className="flex h-full grow flex-col contain-layout">
        {/*navbar*/}
        <Navbar />

        {/*children components*/}
        {children}

        {/*footer*/}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="@container flex flex-col gap-6 px-5 py-10 text-center">
              <p className="text-base leading-normal font-normal text-[#637f88]">
                @2024 AUT FLL. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
}
