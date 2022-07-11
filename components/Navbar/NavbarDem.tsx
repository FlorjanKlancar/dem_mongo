import React, {useEffect} from "react";
import NavbarMobile from "./NavbarMobile";
import Menu from "./Menu";
import {signOut, useSession} from "next-auth/react";
import ConnectWalletButton from "../NFTMint/ConnectWalletButton";
import DisconnectWalletButton from "../NFTMint/DisconnectWalletButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/storeModel";
import HeroCircle from "../Hero/HeroCircle";
import {queueActions} from "../../store/queue-slice";
import {XIcon} from "@heroicons/react/outline";
import socket from "../../lib/socket";
import toast from "react-hot-toast";
import {villageActions} from "../../store/village-slice";

function NavbarDem() {
  const dispatch = useDispatch();
  const {data: session}: any = useSession();

  const signOutHandler = async () => {
    await signOut();
  };

  const {zilWallet} = useSelector((state: RootState) => state.zilWallet);
  const queue = useSelector((state: RootState) => state.queue);

  const cancelQueueHandler = () => {
    const queueToast = toast.loading("Removing from queue...");

    socket.emit("cancelUserFromQueue", {userId: session.user.uid});

    socket.on("cancelResponse", ({response}) => {
      if (response.status === 200) {
        dispatch(queueActions.setUserInQueue(false));
        dispatch(villageActions.updateUnitsState(response.updateUnits));
        toast.success(response.msg, {id: queueToast});
      } else {
        toast.error(response.msg, {id: queueToast});
      }
    });
  };

  useEffect(() => {
    if (queue.userInQueue) {
      const id = setInterval(
        () => dispatch(queueActions.setTimeInQueue()),
        1000
      );

      return () => {
        clearInterval(id);
      };
    }
  }, [queue]);

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
          {!Object.keys(zilWallet).length ? (
            <ConnectWalletButton />
          ) : (
            <DisconnectWalletButton />
          )}
          {queue.userInQueue ? (
            <div className="tooltip  tooltip-bottom" data-tip="Cancel queue">
              <button
                className="navbar_button flex w-full"
                onClick={cancelQueueHandler}
              >
                <span className="w-3/4 lowercase">{queue.timeInQueue}s</span>
                <span>
                  <XIcon className="h-4 w-4 text-red-600" />
                </span>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default NavbarDem;
