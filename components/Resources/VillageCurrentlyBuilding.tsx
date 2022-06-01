import {XIcon} from "@heroicons/react/outline";
import axios from "axios";
import React, {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {auth} from "../../firebase/clientApp";
import {RootState} from "../../types/storeModel";
import dayjs from "dayjs";

function VillageCurrentlyBuilding() {
  const [user]: any = useAuthState(auth);

  const village: any = useSelector((state: RootState) => state.village);
  const {gsBuildings}: any = useSelector(
    (state: RootState) => state.gsBuildings
  );

  const cancelHandler = async () => {
    await axios.post(
      `api/buildResources`,
      {
        villageId: user.uid,
        buildingName: village.currentlyBuilding[0].buildingId,
        cancleJob: true,
      },
      {headers: {Authorization: `Bearer ${user?.accessToken}`}}
    );

    toast.success("Successfully canceled build!");
  };

  return (
    <div>
      {village.currentlyBuilding.length ? (
        <div className="mt-5 rounded-lg border-2 border-primary/80 bg-slate-800 py-4 px-8 text-white">
          <div>Currently building:</div>
          <div className="mt-2 grid grid-cols-2 items-center justify-between gap-2 sm:flex">
            <div className="order-last sm:order-first">
              <button
                className="flex rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-800 hover:text-slate-200"
                onClick={cancelHandler}
              >
                Cancel
                <XIcon className="mt-0.5 h-5 w-5" />
              </button>
            </div>
            <div>
              {village.currentlyBuilding[0].buildingId &&
                gsBuildings[village.currentlyBuilding[0].buildingId].name}{" "}
              - level {village.currentlyBuilding[0].currentlyBuildingLevel}
            </div>
            <div>
              End:{" "}
              {dayjs(village.currentlyBuilding[0].endBuildTime).format(
                "HH:mm:ss"
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default VillageCurrentlyBuilding;
