import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/clientApp";
import { MAX_LEVEL_RESOURCES } from "../../gsVariables";
import { resourceField } from "../../types/resourceField";
import { RootState } from "../../types/storeModel";
import { CogIcon } from "@heroicons/react/outline";

import ResourcesMaxLevelModal from "./ResourcesMaxLevelModal";
import ResourcesModal from "./ResourcesModal";
import Modal from "../Modal/Modal";
import Link from "next/link";

function ResourcesField() {
  const [user]: any = useAuthState(auth);

  const village: any = useSelector((state: RootState) => state.village);

  const { gsBuildings } = useSelector((state: RootState) => state.gsBuildings);

  const [clickedResource, setClickedResource] = useState<any>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onResourceClickHandler = (id: string, level: number, type: string) => {
    const resourceNextLevelInfo: any = Object.values(gsBuildings).find(
      (val: any) => {
        if (val.type === type) return val;
      }
    );

    setClickedResource({
      id,
      level,
      name: resourceNextLevelInfo?.name,
      image: resourceNextLevelInfo?.image,
      description: resourceNextLevelInfo?.description,
      levels: resourceNextLevelInfo?.levels,
      type,
    });

    if (type !== "village_center") setOpen(true);

    if (level < MAX_LEVEL_RESOURCES) {
      checkResources(resourceNextLevelInfo?.levels[0][level + 1]);
    }
  };

  const upgradeHandler = async () => {
    setOpen(false);
    const upgradeToast = toast.loading("Upgrading...");
    await axios.post(
      `api/build/resources`,
      {
        villageId: user?.uid,
        buildingName: clickedResource.type,
        fieldId: clickedResource.id,
        isBuilding: false,
      },
      { headers: { Authorization: `Bearer ${user?.accessToken}` } }
    );

    toast.success("Upgrade started successfully!", { id: upgradeToast });
  };

  const checkResources = async (resourceNextLevelInfo: any) => {
    if (
      resourceNextLevelInfo &&
      (resourceNextLevelInfo.costWood > village.resourcesStorage.woodAmount ||
        resourceNextLevelInfo.costClay > village.resourcesStorage.clayAmount ||
        resourceNextLevelInfo.costIron > village.resourcesStorage.ironAmount ||
        resourceNextLevelInfo.costWheat > village.resourcesStorage.wheatAmount)
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div className="space-y-2 sm:px-4">
          <div>
            <h3 className="text-center text-lg font-bold text-primary sm:text-left">
              {clickedResource.name}
            </h3>
          </div>

          <div className="">
            <p className="text-xs sm:text-sm">{clickedResource.description}</p>
          </div>

          {clickedResource.level + 1 > MAX_LEVEL_RESOURCES ? (
            <ResourcesMaxLevelModal clickedResource={clickedResource} />
          ) : (
            <ResourcesModal clickedResource={clickedResource} />
          )}

          <div className="grid w-full grid-cols-3 space-x-3">
            <div className="mt-5 rounded-lg bg-slate-500 py-2 text-center font-bold text-white hover:bg-slate-600 hover:text-slate-200 ">
              <button onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="col-span-2">
              <button
                className="mt-5 w-full rounded-lg bg-primary py-2 font-bold text-slate-800 hover:bg-primary hover:text-slate-600 disabled:bg-gray-500 disabled:hover:text-slate-800"
                onClick={upgradeHandler}
                type="submit"
                disabled={
                  clickedResource.level + 1 > MAX_LEVEL_RESOURCES
                    ? true
                    : false || isButtonDisabled
                    ? true
                    : false
                }
              >
                {clickedResource.level + 1 > MAX_LEVEL_RESOURCES
                  ? "Building is max level!"
                  : isButtonDisabled
                  ? "Not enough resources!"
                  : "Upgrade"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="grid max-h-[500px] w-full grid-cols-4 sm:grid-cols-4 md:w-9/12">
        {village.resourceFields.map((resource: resourceField) => (
          <div key={resource.id}>
            <div
              className={`relative cursor-pointer rounded-xl  border-slate-800/10 hover:border-slate-800/40 ${
                resource.type === "village_center" ? "" : "border-2"
              } `}
              onClick={() =>
                onResourceClickHandler(
                  resource.id,
                  resource.level,
                  resource.type
                )
              }
            >
              {resource.imageGrid && (
                <div className="relative h-20 w-24 sm:h-28 sm:w-32 md:h-32 md:w-40">
                  {resource.type === "village_center" ? (
                    <Link href="/village">
                      <Image src={resource.imageGrid} layout="fill" />
                    </Link>
                  ) : (
                    <Image src={resource.imageGrid} layout="fill" />
                  )}
                </div>
              )}

              {resource.level && (
                <div className="absolute bottom-2 right-2 rounded-full border-2 border-primary/50 bg-white px-2  text-black">
                  {resource.level}
                </div>
              )}

              {village.currentlyBuilding.length &&
              village.currentlyBuilding[0].fieldId === resource.id ? (
                <div className="absolute top-2 left-2 animate-spin text-black">
                  <CogIcon className="h-6 w-6" />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResourcesField;
