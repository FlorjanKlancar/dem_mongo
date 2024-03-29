import Image from "next/image";
import React, { Fragment } from "react";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";
import { ClockIcon, PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { villageActions } from "../../store/village-slice";
import { useNextAuth } from "../../hooks/useNextAuth";

type NewBuildingModalProps = {
  gsBuildings: any;
  clickedResourceId: number;
  setOpen: (value: boolean) => void;
  village: any;
};

function NewBuildingModal({
  gsBuildings,
  clickedResourceId,
  setOpen,
  village,
}: NewBuildingModalProps) {
  const { session }: any = useNextAuth();
  const dispatch = useDispatch();

  const filterBuildings = gsBuildings.filter(
    (building: any) => building.group !== "Resources"
  );

  const buildHandler = async (building: any) => {
    const { type } = building;

    setOpen(false);
    const upgradeToast = toast.loading("Upgrading...");
    const response: any = await axios.post(`api/build/resources`, {
      villageId: session.user.id,
      buildingName: type,
      fieldId: clickedResourceId,
      isBuilding: true,
    });

    if (response.status === 200) {
      dispatch(
        villageActions.addBuildingNow({
          currentlyBuilding: [response.villageResponse.currentlyBuilding],
          resourcesStorage: response.villageResponse.resourcesStorageMinus,
        })
      );

      toast.success("Upgrade started successfully!", { id: upgradeToast });
    } else {
      toast.error("Unable to upgrade...", { id: upgradeToast });
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center space-y-4">
      <div className="text-center ">
        <h1 className="text-2xl font-semibold text-primary">
          Build new buildings!
        </h1>
      </div>
      <div className="tabs flex items-center justify-items-center">
        <a className="tab tab-bordered tab-lg  w-1/3">Tab 1</a>
        <a className="tab tab-active tab-bordered tab-lg">Tab 2</a>
        <a className="tab tab-bordered tab-lg">Tab 3</a>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        {filterBuildings.map((building: any, i: number) => (
          <Fragment key={i}>
            <div key={building.type} className="grid grid-cols-3 gap-5 py-4">
              <div className="col-span-2">
                <div>{building.name}</div>
                <div>{building.description}</div>
              </div>

              <div className="relative h-24 w-24">
                <Image src={building.image} layout="fill" />
              </div>
            </div>

            <div className="flex justify-between px-4">
              <div className="flex items-center space-x-1">
                <div className="relative h-10 w-10">
                  <Image src={WoodImg} layout="fill" />
                </div>
                <div>{building.levels[0][1].costWood}</div>
              </div>

              <div className="flex items-center space-x-1">
                <div className="relative h-10 w-10">
                  <Image src={ClayImg} layout="fill" />
                </div>
                <div>{building.levels[0][1].costClay}</div>
              </div>

              <div className="flex items-center space-x-1">
                <div className="relative h-10 w-10">
                  <Image src={IronImg} layout="fill" />
                </div>
                <div>{building.levels[0][1].costIron}</div>
              </div>

              <div className="flex items-center space-x-1">
                <div className="relative h-10 w-10">
                  <Image src={WheatImg} layout="fill" />
                </div>
                <div>{building.levels[0][1].costWheat}</div>
              </div>
            </div>

            <div className="flex justify-around px-4">
              <div className="flex items-center space-x-2">
                <div>
                  <ClockIcon className="h-7 w-7 text-primary/80" />
                </div>
                <div>
                  {building.levels[0][1].timeToBuild}
                  <span className="text-base">s</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div>
                  <PlusIcon className="h-7 w-7 text-primary/80" />
                </div>
                <div>
                  {building.levels[0][1].populationAdd}
                  <span className="text-base">pop</span>
                </div>
              </div>
            </div>

            <div className="my-4 w-full px-8">
              <button
                className="w-full rounded-xl bg-primary py-2 text-white"
                onClick={() => buildHandler(building)}
              >
                Build now!
              </button>
            </div>
            <hr className="border-primary/80" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default NewBuildingModal;
