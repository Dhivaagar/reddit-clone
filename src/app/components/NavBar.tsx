import Link from "next/link";
import React from "react";

import { getAuthSession } from "@/lib/auth";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./SearchBar";

const NavBar = async () => {
  const session = await getAuthSession();
  return (
    <div
      className="
        fixed 
        inset-x-0 
        top-0 
        h-fit
        bg-zinc-100 
        border-b 
        border-zinc-300 
        z-[10] 
        py-2
      "
    >
      <div
        className="
          container
          max-w-7xl
          h-full
          mx-auto
          flex
          items-center
          justify-between
          gap-2
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-Zinc-700 text-sm font-medium md:block">
            Breadit
          </p>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <div className="flex items-center gap-6">
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
            <Link href="/sign-up" className={buttonVariants()}>
              Sign UP
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
