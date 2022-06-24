import React, { useState } from "react";

type ConnectedWalletProps = {
  submitHandler: (e: any, id: string) => void;
  walletId: string;
  setWalletId: (walletId: string) => void;
};
function ConnectedWallet({
  submitHandler,
  walletId,
  setWalletId,
}: ConnectedWalletProps) {
  return (
    <div className="w-full">
      <form
        className="flex rounded-lg border-2 border-slate-800 bg-black px-6 py-4 opacity-75 shadow-xl"
        onSubmit={(e) => submitHandler(e, walletId)}
      >
        <input
          type="text"
          className="w-full bg-transparent pr-5 text-white placeholder-gray-500 outline-none"
          placeholder={`Enter your wallet address`}
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
        />
        <button
          className=" rounded-lg bg-indigo-500 px-8 py-2 text-white"
          type="submit"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default ConnectedWallet;
