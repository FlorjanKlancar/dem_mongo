import React, { useEffect, useState } from "react";
import NavbarMobile from "./NavbarMobile";
import Menu from "./Menu";
import { signOut } from "next-auth/react";
import ConnectWalletButton from "../NFTMint/ConnectWalletButton";
import DisconnectWalletButton from "../NFTMint/DisconnectWalletButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";
import HeroCircle from "../Hero/HeroCircle";
import { queueActions } from "../../store/queue-slice";
import { XIcon } from "@heroicons/react/outline";
import socket from "../../lib/socket";
import toast from "react-hot-toast";
import { villageActions } from "../../store/village-slice";
import { useNextAuth } from "../../hooks/useNextAuth";
import { userInQueueModel } from "../../types/userInQueueModel";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import UserInQueueButton from "./UserInQueueButton";
import { useQueue } from "../../hooks/useQueue";

function NavbarDem() {
  const { session }: any = useNextAuth();

  const signOutHandler = async () => {
    await signOut();
  };

  const { data: queueData } = useQueue(session?.user?.uid);

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

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button className="navbar_button" onClick={signOutHandler}>
            Sign out
          </button>
          <button className="navbar_button">MOCK</button>

          {queueData ? <UserInQueueButton queueData={queueData} /> : <></>}
        </div>
      </div>
    </>
  );
}

export default NavbarDem;
