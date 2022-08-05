import { XIcon, ThumbUpIcon } from "@heroicons/react/outline";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";
import dayjs from "dayjs";
import Countdown, { zeroPad } from "react-countdown";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { BN, Long, units } from "@zilliqa-js/zilliqa";
import { StatusType, MessageType } from "@zilliqa-js/zilliqa";
import { villageModel } from "../../types/villageModel";
import { buildingModel } from "../../types/buildingModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNextAuth } from "../../hooks/useNextAuth";

const contractAddress = "0xfeb6b442f1166f3d2bfa9072e4515b2755de13cc";

type VillageInfoCurrentlyBuildingProps = {
  villageData: villageModel;
  gsBuildings: buildingModel[];
};

function VillageInfoCurrentlyBuilding({
  villageData,
  gsBuildings,
}: VillageInfoCurrentlyBuildingProps) {
  const { session }: any = useNextAuth();
  const queryClient = useQueryClient();

  const { zilWallet } = useSelector((state: RootState) => state.zilWallet);

  const cancelHandler = async () => {
    const response = await axios.post(`api/build/buildings`, {
      villageId: session.user.uid,
      buildingName: villageData.currentlyBuilding[0].buildingId,
      fieldId: villageData.currentlyBuilding[0].fieldId,
      cancleJob: true,
    });
  };

  const mutation = useMutation(cancelHandler, {
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: async () => {
      toast.success("Successfully canceled build!");
      await queryClient.invalidateQueries(["village"]);
    },
  });

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  function upgradeInstantFinish() {
    subscribeToEvents();
    const withdrawContract = window.zilPay.contracts.at(contractAddress);
    try {
      withdrawContract.call("PayForUpgrade", [], {
        version: 21823489, // For mainnet, it is 65537
        // For testnet, it is 21823489
        amount: new BN(0),
        gasPrice: units.toQa("2000", units.Units.Li),
        gasLimit: Long.fromNumber(8000),
      });
    } catch (err) {
      console.log(err);
    }
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

    subscriber.emitter.on(MessageType.EVENT_LOG, async (event: any) => {
      if ("value" in event) {
        subscriber.stop();

        toast.success(
          "Transaction was confirmed" +
            event["value"][0]["event_logs"][0]["_eventname"],
          { id: upgradeToast }
        );

        const response = await axios.post(`api/build/resources`, {
          villageId: session.user.uid,
          buildingName: villageData.currentlyBuilding[0].buildingId,
          fieldId: villageData.currentlyBuilding[0].fieldId,
          isBuilding: villageData.currentlyBuilding[0].isBuilding,
          forceFinishJob: true,
        });
      }
    });

    subscriber.emitter.on(MessageType.UNSUBSCRIBE, (event: any) => {
      console.log("Unsubscribed: ", event);
    });
    subscriber.start();
  }

  return (
    <div>
      {villageData.currentlyBuilding.length ? (
        <div className="mt-5 rounded-lg border-2 border-primary/80 bg-slate-800 py-4 px-8 text-white">
          <div>Currently building:</div>
          <div className="mt-2 grid grid-cols-2 items-center justify-between gap-2 sm:flex">
            <div className="order-last flex space-x-3 sm:order-first">
              <div>
                <button
                  className="flex rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-800 hover:text-slate-200"
                  onClick={() => mutation.mutate()}
                >
                  Cancel
                  <XIcon className="mt-0.5 h-5 w-5" />
                </button>
              </div>

              {Object.keys(zilWallet).length ? (
                <div>
                  <button
                    onClick={upgradeInstantFinish}
                    className="flex rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-800 hover:text-slate-200"
                  >
                    Finish
                    <ThumbUpIcon className="mt-0.5 ml-1 h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              {villageData.currentlyBuilding[0].buildingId &&
                gsBuildings.map((building: any) => {
                  if (
                    building.type ===
                    villageData.currentlyBuilding[0].buildingId
                  ) {
                    return <span key={building.name}>{building.name}</span>;
                  }
                })}{" "}
              - level {villageData.currentlyBuilding[0].currentlyBuildingLevel}
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="w-20">Time left:</div>
              <div>
                <Countdown
                  date={villageData.currentlyBuilding[0].endBuildTime}
                  renderer={renderer}
                  zeroPadTime={2}
                  onComplete={async () =>
                    await queryClient.invalidateQueries(["village"])
                  }
                />
              </div>
              <div className="w-20">End time:</div>
              <div>
                {dayjs(villageData.currentlyBuilding[0].endBuildTime).format(
                  "HH:mm:ss"
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default VillageInfoCurrentlyBuilding;
