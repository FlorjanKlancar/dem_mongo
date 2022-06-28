import React from "react";
import NavbarMobile from "./NavbarMobile";
import Menu from "./Menu";
import { signOut } from "next-auth/react";
import ConnectWalletButton from "../NFTMint/ConnectWalletButton";
import DisconnectWalletButton from "../NFTMint/DisconnectWalletButton";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";
import HeroCircle from "../Hero/HeroCircle";

function NavbarDem() {
  const signOutHandler = async () => {
    await signOut();
  };

  const { zilWallet } = useSelector((state: RootState) => state.zilWallet);

  return (
    <>
      <div className="md:hidden">
        <NavbarMobile />
      </div>

      <div className="flex justify-items-center px-8 py-4">
        <HeroCircle />

        <div className="m-auto mt-5 hidden w-3/4 justify-around rounded-2xl border-2 border-primary/50 bg-slate-800/80 p-3 md:flex lg:w-2/3 2xl:w-2/5">
          <Menu />
        </div>

        <div className="mt-5 flex flex-col space-y-3">
          <button className="navbar_button" onClick={signOutHandler}>
            Sign out
          </button>
          {!Object.keys(zilWallet).length ? (
            <ConnectWalletButton />
          ) : (
            <DisconnectWalletButton />
          )}
        </div>
      </div>
    </>
  );
}

export default NavbarDem;
