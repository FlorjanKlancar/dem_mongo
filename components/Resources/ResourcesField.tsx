import axios from "axios";
import Image from "next/image";
import React, {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useSelector} from "react-redux";
import {auth} from "../../firebase/clientApp";
import {MAX_LEVEL_RESOURCES} from "../../gsVariables";
import {resourceField} from "../../types/resourceField";
import {RootState} from "../../types/storeModel";

import ResourcesMaxLevelModal from "./ResourcesMaxLevelModal";
import ResourcesModal from "./ResourcesModal";

function ResourcesField() {
  const [user]: any = useAuthState(auth);

  const village = useSelector((state: RootState) => state.village);

  const {gsBuildings} = useSelector((state: RootState) => state.gsBuildings);

  const [clickedResource, setClickedResource] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  };

  const upgradeHandler = async () => {
    setIsLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NODEJS_APP}/build`,
      {
        villageId: user?.uid,
        buildingName: clickedResource.type,
        fieldId: clickedResource.id,
        isBuilding: false,
      },
      {headers: {Authorization: `Bearer ${user?.accessToken}`}}
    );

    setIsLoading(false);
  };

  /*  const checkResources = async() => {
      if(clickedResource.levels &&
        clickedResource.levels[0][clickedResource.level + 1]
          .costWood > village.wood) {
        return false;
      }
    } */
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle " />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label
          className="modal-box relative border-2 border-primary/60 bg-slate-800"
          htmlFor=""
        >
          <div className="space-y-2 px-4">
            <div>
              <h3 className="text-center text-lg font-bold sm:text-left">
                {clickedResource.name}
              </h3>
            </div>

            <div className="">
              <p className="text-xs sm:text-sm">
                {clickedResource.description}
              </p>
            </div>

            {clickedResource.level + 1 > MAX_LEVEL_RESOURCES ? (
              <ResourcesMaxLevelModal clickedResource={clickedResource} />
            ) : (
              <ResourcesModal clickedResource={clickedResource} />
            )}

            <div>
              <button
                className="mt-5 w-full rounded-lg bg-primary/80 py-2 font-bold text-slate-800 hover:bg-primary hover:text-slate-600 disabled:bg-gray-500 disabled:hover:text-slate-800"
                onClick={upgradeHandler}
                disabled={
                  clickedResource.level + 1 > MAX_LEVEL_RESOURCES ? true : false
                }
              >
                {clickedResource.level + 1 > MAX_LEVEL_RESOURCES
                  ? "Building is max level!"
                  : isLoading
                  ? "Upgrading..."
                  : "Upgrade"}
              </button>
            </div>
          </div>
        </label>
      </label>

      <div className="grid w-full grid-cols-4 sm:grid-cols-4 md:w-9/12">
        {village.resourceFields.map((resource: resourceField) => (
          <label
            htmlFor={`${resource.type !== "village_center" && "my-modal-4"}`}
            key={resource.id}
            className={`${
              resource.type === "village_center"
                ? ""
                : "rounded-xl border-2 border-slate-500/50"
            }`}
          >
            <div
              className={`relative cursor-pointer rounded-xl  border-slate-800/10 hover:border-slate-800/40 `}
              onClick={() =>
                onResourceClickHandler(
                  resource.id,
                  resource.level,
                  resource.type
                )
              }
            >
              {resource.imageGrid && (
                <div className="relative h-20 w-20 md:h-28 md:w-32 lg:h-36 lg:w-44">
                  <Image src={resource.imageGrid} layout="fill" />
                </div>
              )}
              {resource.level && (
                <div className="absolute bottom-2 right-2 rounded-full border-2 border-primary/50 bg-white px-2  text-black">
                  {resource.level}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </>
  );
}

export default ResourcesField;
