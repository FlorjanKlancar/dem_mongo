import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";
import dayjs from "dayjs";
import Countdown, { zeroPad } from "react-countdown";
import { useSession } from "next-auth/react";
import { initializeDataFetch } from "../../utils/utilFunctions";
import { villageActions } from "../../store/village-slice";

function VillageInfoCurrentlyBuilding() {
  const { data: session }: any = useSession();
  const dispatch = useDispatch();

  const village: any = useSelector((state: RootState) => state.village);
  const { gsBuildings }: any = useSelector(
    (state: RootState) => state.gsBuildings
  );

  const cancelHandler = async () => {
    const response = await axios.post(`api/build/resources`, {
      villageId: session.user.uid,
      buildingName: village.currentlyBuilding[0].buildingId,
      cancleJob: true,
    });

    if (response.status === 200) {
      dispatch(villageActions.cancleBuilding());

      toast.success("Successfully canceled build!");
    } else {
      toast.error("Unable to cancel build...");
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
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
                gsBuildings.map((building: any) => {
                  if (
                    building.type === village.currentlyBuilding[0].buildingId
                  ) {
                    return <span key={building.name}>{building.name}</span>;
                  }
                })}{" "}
              - level {village.currentlyBuilding[0].currentlyBuildingLevel}
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="w-20">Time left:</div>
              <div>
                <Countdown
                  date={village.currentlyBuilding[0].endBuildTime}
                  renderer={renderer}
                  zeroPadTime={2}
                  onComplete={() =>
                    setTimeout(
                      () => initializeDataFetch(session.user.uid, dispatch),
                      500
                    )
                  }
                />
              </div>
              <div className="w-20">End time:</div>
              <div>
                {dayjs(village.currentlyBuilding[0].endBuildTime).format(
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
