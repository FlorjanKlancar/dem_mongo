import Image from "next/image";
import React, { useState } from "react";
import ConnectedWallet from "../../components/NFTMint/ConnectedWallet";
import ConnectWalletButton from "../../components/NFTMint/ConnectWalletButton";

function MintNfts() {
  const [walletId, setWalletId] = useState<string>("");

  const [connectedWalletState, setConnectedWalletState] = useState();
  const submitHandler = async (e: any) => {
    e.preventDefault();

    console.log("submit", walletId);
  };

  return (
    <div className="flex h-screen items-center justify-center  bg-gradient-to-tr from-slate-800 via-slate-600  to-primary">
      <div className="h-3/4 w-3/4 rounded-2xl bg-gradient-to-tr from-primary to-indigo-700 p-1.5">
        <div className="h-full w-full rounded-2xl bg-slate-900">
          <div className="grid h-full grid-cols-3">
            <div className="col-span-2 flex flex-col items-center justify-center space-y-8 px-8">
              <div>
                <h1 className="text-4xl font-semibold tracking-wider	">
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

              {!connectedWalletState ? (
                <ConnectWalletButton
                  wallet={connectedWalletState}
                  setWallet={setConnectedWalletState}
                />
              ) : (
                <ConnectedWallet
                  submitHandler={submitHandler}
                  walletId={walletId}
                  setWalletId={setWalletId}
                />
              )}
            </div>

            <div className="h-full w-full p-3">
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
