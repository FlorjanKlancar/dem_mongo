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
import {
  buildingModel,
  currentlyBuildingModel,
} from "../../types/buildingModel";
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

  const cancelHandler = async (fieldId: number) => {
    const getCanceledBuilding = villageData.currentlyBuilding.find(
      (building: currentlyBuildingModel) => building.fieldId === fieldId
    );

    await axios.post(`api/build/buildings`, {
      villageId: session.user.id,
      buildingName: getCanceledBuilding!.buildingId,
      fieldId: getCanceledBuilding!.fieldId,
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

  function upgradeInstantFinish(fieldId: number) {
    subscribeToEvents(fieldId);
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

  function subscribeToEvents(fieldId: number) {
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
        const getCompletedBuilding = villageData.currentlyBuilding.find(
          (building: currentlyBuildingModel) => building.fieldId === fieldId
        );

        await axios.post(`api/build/buildings`, {
          villageId: session.user.id,
          buildingName: getCompletedBuilding!.buildingId,
          fieldId: getCompletedBuilding!.fieldId,
          isBuilding: getCompletedBuilding!.isBuilding,
          forceFinishJob: true,
        });
        await queryClient.invalidateQueries(["village"]);
      }
    });

    subscriber.emitter.on(MessageType.UNSUBSCRIBE, (event: any) => {
      console.log("Unsubscribed: ", event);
    });
    subscriber.start();
  }

  const getBuildingInfoFromSettings = (
    buildingId: string,
    currentlyBuildingLevel: number
  ) => {
    const findBuilding = gsBuildings.find(
      (building: buildingModel) => building.type === buildingId
    );

    return (
      <div>
        {findBuilding!.name} - level {currentlyBuildingLevel}
      </div>
    );
  };

  return (
    <div>
      {villageData.currentlyBuilding.length ? (
        <div className="mt-5 rounded-lg border-2 border-primary/80 bg-slate-800 py-4 px-8 text-white">
          <div>Currently building:</div>

          {villageData.currentlyBuilding.map(
            (building: currentlyBuildingModel, i: number) => (
              <div
                key={i}
                className="mt-2 grid grid-cols-2 items-center justify-between gap-2 sm:flex"
              >
                <div className="order-last flex space-x-3 sm:order-first">
                  <div>
                    <button
                      className="flex rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-800 hover:text-slate-200"
                      onClick={() => mutation.mutate(building.fieldId)}
                    >
                      Cancel
                      <XIcon className="mt-0.5 h-5 w-5" />
                    </button>
                  </div>

                  {Object.keys(zilWallet).length ? (
                    <div>
                      <button
                        onClick={() => upgradeInstantFinish(building.fieldId)}
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

                {getBuildingInfoFromSettings(
                  building.buildingId,
                  building.currentlyBuildingLevel
                )}

                <div className="grid grid-cols-2 items-center">
                  <div className="w-20">Time left:</div>
                  <div>
                    <Countdown
                      date={building.endBuildTime}
                      renderer={renderer}
                      zeroPadTime={2}
                      onComplete={async () =>
                        await queryClient.invalidateQueries(["village"])
                      }
                    />
                  </div>
                  <div className="w-20">End time:</div>
                  <div>{dayjs(building.endBuildTime).format("HH:mm:ss")}</div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default VillageInfoCurrentlyBuilding;
