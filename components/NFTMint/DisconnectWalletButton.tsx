import React, { useEffect, useState } from "react";
import {
  Zilliqa,
  BN,
  Long,
  units,
  StatusType,
  MessageType,
} from "@zilliqa-js/zilliqa";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { zilWalletActions } from "../../store/zilWallet-slice";

declare global {
  interface Window {
    zilPay: any;
  }
}

function ConnectWalletButton() {
  const dispatch = useDispatch();

  function disconnectHandler() {
    dispatch(zilWalletActions.removeWallet());
    toast.success("Disconnected ZilPay");
  }

  return (
    <div>
      <button onClick={disconnectHandler} className="navbar_button">
        Disconnect ZilPay
      </button>
    </div>
  );
}

export default ConnectWalletButton;
