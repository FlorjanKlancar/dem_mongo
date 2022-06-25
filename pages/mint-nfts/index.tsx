import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConnectedWallet from "../../components/NFTMint/ConnectedWallet";
import ConnectWalletButton from "../../components/NFTMint/ConnectWalletButton";
import { RootState } from "../../types/storeModel";

function MintNfts() {
  const [walletId, setWalletId] = useState<string>("");

  const { zilWallet } = useSelector((state: RootState) => state.zilWallet);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    console.log("submit", walletId);
  };

  console.log("zilWallet", zilWallet);

  return (
    <div className="flex h-screen items-center justify-center  bg-gradient-to-tr from-slate-800 via-slate-600  to-primary">
      <div className="h-3/4 w-3/4 rounded-2xl bg-gradient-to-tr from-primary to-indigo-700 p-1.5">
        <div className="h-full w-full rounded-2xl bg-slate-900">
          <div className=" grid h-full grid-cols-1 justify-items-center lg:grid-cols-3">
            <div className="order-2 flex flex-col items-center justify-center space-y-8 px-8 lg:order-1 lg:col-span-2 ">
              <div>
                <h1 className="text-center text-4xl font-semibold tracking-wider">
                  Mint your NFTs
                </h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
                  amet mollitia omnis libero culpa, sint recusandae sequi unde
                  nostrum excepturi sapiente ipsa, possimus quia minima? Esse
                  cumque mollitia fugit quisquam.
                </p>
              </div>

              {!Object.keys(zilWallet).length ? (
                <ConnectWalletButton />
              ) : (
                <ConnectedWallet
                  submitHandler={submitHandler}
                  walletId={walletId}
                  setWalletId={setWalletId}
                />
              )}
            </div>

            <div className="order-1 row-span-6 h-full w-full p-3 lg:order-2 lg:row-span-1">
              <div className="relative h-full w-full">
                <Image
                  src={"https://wallpaperaccess.com/full/167765.jpg"}
                  objectFit="cover"
                  alt="nft-img"
                  className="rounded-xl"
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintNfts;
