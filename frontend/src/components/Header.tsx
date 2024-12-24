"use client";

import Link from "next/link";
import React from "react";

function Header() {
  const isAuthenticated = false;
  return (
    <>
      <div className="flex justify-between w-full h-14 px-7 sticky top-0 left-0 right-0 backdrop-blur-lg shadow-md z-50">
        <div className="flex flex-col justify-center text-white font-semibold">
          MuZic Icon
        </div>
        <div className="flex-row justify-center content-center">
          <div className="flex justify-between gap-9">
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="bg-btn px-8 py-1 rounded-full shadow-xl hover:shadow-[0_0_15px_#FF2E43] transition-shadow duration-300 text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/login"
                  className="bg-btn px-8 py-1 rounded-full shadow-xl hover:shadow-[0_0_15px_#FF2E43] transition-shadow duration-300 text-white"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="bg-btn px-8 py-1 rounded-full hover:shadow-[0_0_15px_#FF2E43] transition-shadow duration-300 text-white"
                >
                  Signup
                </Link>
                <Link
                  href="/login"
                  className="bg-btn px-8 py-1 rounded-full hover:shadow-[0_0_15px_#FF2E43] transition-shadow duration-300 text-white"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
