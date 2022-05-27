import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import {MenuItemModel} from "../../types/MenuItemModel";
import Menu from "./Menu";

function NavbarMobile() {
  const router = useRouter();
  return (
    <div className="supports-backdrop-blur:bg-white/60 navbar  min-h-16 sticky top-0 z-40 w-full flex-none border-b-2 border-base-300/50 bg-base-100 bg-white/95 backdrop-blur transition-colors duration-500 dark:bg-transparent lg:z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 border-2 border-base-300/50 bg-base-100 p-2 shadow"
          >
            <div className="space-y-4 p-3 text-gray-300 xl:space-y-0 xl:p-0">
              <div className="mt-2 space-y-14 px-4  xl:hidden ">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h1 className="text-gray-400">Menu</h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 xl:flex-row xl:space-y-0">
                <Menu />
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl normal-case">DEM</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge indicator-item badge-xs badge-primary"></span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default NavbarMobile;
