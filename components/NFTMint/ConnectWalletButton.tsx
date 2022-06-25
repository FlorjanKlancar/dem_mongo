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

  function getCurrentAccount() {
    window.zilPay.wallet.connect().then(function (connected: any) {
      console.log(connected);
      console.log(window.zilPay.wallet.net);
      console.log(window.zilPay.wallet.defaultAccount);
      dispatch(zilWalletActions.setWallet(window.zilPay.wallet.defaultAccount));

      window.zilPay.wallet
        .observableNetwork()
        .subscribe(function (network: any) {
          console.log("Network has been changed to " + network);
        });

      window.zilPay.wallet
        .observableAccount()
        .subscribe(function (account: any) {
          console.log(
            "Account has been changed to " +
              account.base16 +
              " (" +
              account.bech32 +
              ")"
          );
          window.zilPay.blockchain
            .getBalance(account.bech32)
            .then(function (resp: any) {
              console.log(resp);
            });
        });
    });
  }

  function connectZilPay() {
    if (window.zilPay) {
      toast.success("ZilPay Present");

      getCurrentAccount();
    } else {
      toast.error("Cannot Find ZilPay AddOn!");
    }
  }

  useEffect(() => {
    connectZilPay();
  }, []);

  return (
    <div>
      <button onClick={connectZilPay} className="navbar_button">
        Connect ZilPay
      </button>
    </div>
  );
}

export default ConnectWalletButton;
