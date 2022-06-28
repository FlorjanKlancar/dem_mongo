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
  /*  const dispatch = useDispatch();

   function disconnectHandler() {
    dispatch(zilWalletActions.removeWallet());
    toast.success("Disconnected ZilPay");
  } */

  const contractAddress = "0xfeb6b442f1166f3d2bfa9072e4515b2755de13cc";

  function getContractDetails() {
    const withdrawContract = window.zilPay.contracts.at(contractAddress);

    withdrawContract.getInit().then(function (initData: any) {
      console.log(initData);
    });

    withdrawContract.getCode().then(function (code: any) {
      console.log(code);
    });

    withdrawContract.getState().then(function (stateData: any) {
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
      if ("value" in event) {
        if (
          event["value"][0]["event_logs"][0]["_eventname"] ==
          "WithdrawFailureNotInChallenger"
        ) {
          toast.error(event["value"][0]["event_logs"][0]["_eventname"], {
            id: upgradeToast,
          });
        } else {
          toast.success(
            "Transaction was confirmed: " +
              event["value"][0]["event_logs"][0]["_eventname"],
            { id: upgradeToast }
          );
        }
      }
    });

    subscriber.emitter.on(MessageType.UNSUBSCRIBE, (event: any) => {
      console.log("Unsubscribed: ", event);
    });
    subscriber.start();
  }

  function WithdrawFunds() {
    subscribeToEvents();
    const withdrawContract = window.zilPay.contracts.at(contractAddress);
    try {
      withdrawContract.call("Withdraw", [], {
        version: 21823489,
        amount: new BN(0),
        gasPrice: units.toQa("2000", units.Units.Li),
        gasLimit: Long.fromNumber(8000),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button onClick={WithdrawFunds} className="navbar_button">
        Get reward
      </button>
    </div>
  );
}

export default ConnectWalletButton;
