import React from "react";
import Menu from "./Menu";
import NavbarMobile from "./NavbarMobile";

function Navbar() {
  return (
    <>
      <div className="block xl:hidden min-h-16 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 border-b-2 border-base-300/50  supports-backdrop-blur:bg-white/60 ">
        <NavbarMobile />
      </div>
      <div className="hidden xl:block min-h-16 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 border-b-2 border-base-300/50  supports-backdrop-blur:bg-white/60 ">
        <div className="max-w-8xl mx-auto">
          <div className="flex justify-around px-8 mx-0 items-center min-h-16">
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
