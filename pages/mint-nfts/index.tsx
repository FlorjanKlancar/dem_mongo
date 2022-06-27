import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConnectedWallet from "../../components/NFTMint/ConnectedWallet";
import ConnectWalletButton from "../../components/NFTMint/ConnectWalletButton";
import { RootState } from "../../types/storeModel";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { BN, Long, units } from "@zilliqa-js/zilliqa";
import { StatusType, MessageType } from "@zilliqa-js/zilliqa";
import toast from "react-hot-toast";

function MintNfts() {
  const [walletId, setWalletId] = useState<string>("");

  const { zilWallet } = useSelector((state: RootState) => state.zilWallet);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    MintYourNft(walletId);
  };

  const contractAddress = "0xf1678662108e263cbbd94091eef52b01133266af";

  function getContractDetails() {
    const mintContract = window.zilPay.contracts.at(contractAddress);

    mintContract.getInit().then(function (initData: any) {
      console.log(initData);
    });

    mintContract.getCode().then(function (code: any) {
      console.log(code);
    });

    mintContract.getState().then(function (stateData: any) {
      console.log(stateData);
    });
  }

  function subscribeToEvents() {
    const upgradeToast = toast.loading(
      "Your transaction is being processed..."
    );

    const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
    const subscriber = zilliqa.subscriptionBuilder.buildEventLogSubscriptions(
      "wss://dev-ws.zilliqa.com",
      {
        addresses: [contractAddress],
      }
    );

    subscriber.emitter.on(StatusType.SUBSCRIBE_EVENT_LOG, (event: any) => {
      console.log("Subscribed: ", event);
    });

    subscriber.emitter.on(MessageType.EVENT_LOG, (event: any) => {
      console.log("get new event log: ", event);
      if ("value" in event) {
        console.log(event["value"][0]["event_logs"][0]["params"][0]["value"]);
        console.log(event["value"][0]["event_logs"][0]["params"][1]["value"]);
        subscriber.stop();
        toast.success(
          "Transaction was confirmed: nft minted" +
            event["value"][0]["event_logs"][0]["_eventname"],
          { id: upgradeToast }
        );
      }
    });

    subscriber.emitter.on(MessageType.UNSUBSCRIBE, (event: any) => {
      console.log("Unsubscribed: ", event);
    });
    subscriber.start();
  }

  function MintYourNft(mintAddress: any) {
    console.log("car");
    subscribeToEvents();
    debugger;
    const mintContract = window.zilPay.contracts.at(contractAddress);
    try {
      mintContract.call(
        "Mint",
        [
          {
            vname: "to",
            type: "ByStr20",
            value: walletId,
          },
          {
            vname: "token_uri",
            type: "String",
            value: "",
          },
        ],
        {
          version: 21823489, // For mainnet, it is 65537
          // For testnet, it is 21823489
          amount: new BN(0),
          gasPrice: units.toQa("2000", units.Units.Li),
          gasLimit: Long.fromNumber(8000),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

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
                  Welcome to DEM minting site! If you are on the mint list,
                  please enter your base 16 wallet address and press confirm to
                  get your new hero NFT. If you are not on the mint list and
                  want to be, contact me on discord: Klančar#5359
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
