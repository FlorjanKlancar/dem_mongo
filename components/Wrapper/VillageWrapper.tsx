import React from "react";
import { DatabaseIcon, CogIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";
import { MAX_LEVEL_BUILDINGS } from "../../gsVariables";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";
import Image from "next/image";

type VillageWrapperProps = {
  children: React.ReactNode;
};

function VillageWrapper({ children }: VillageWrapperProps) {
  const resourcesRedux = useSelector(
    (state: RootState) => state.village.resourcesStorage
  );

  const buildersRedux = useSelector(
    (state: RootState) => state.village.currentlyBuilding
  );
  const { gsBuildings }: any = useSelector(
    (state: RootState) => state.gsBuildings
  );

  const resources = [
    {
      icon: (
        <div className="relative h-10 w-10">
          <Image src={WoodImg} alt="WoodImg" layout="fill" />
        </div>
      ),
      amount: Math.floor(resourcesRedux.woodAmount),
    },
    {
      icon: (
        <div className="relative h-10 w-10">
          <Image src={ClayImg} alt="ClayImg" layout="fill" />
        </div>
      ),
      amount: Math.floor(resourcesRedux.clayAmount),
    },
    {
      icon: (
        <div className="relative h-10 w-10">
          <Image src={IronImg} alt="IronImg" layout="fill" />
        </div>
      ),
      amount: Math.floor(resourcesRedux.ironAmount),
    },
  ];

  const wheat = {
    icon: (
      <div className="relative h-10 w-10">
        <Image src={WheatImg} alt="WheatImg" layout="fill" />
      </div>
    ),
    amount: Math.floor(resourcesRedux.wheatAmount),
  };

  const village = useSelector((state: RootState) => state.village);
  const warehouseMaxStorage: any = village.villageBuildings.find(
    (building: any) => building.type === "warehouse"
  );
  const granaryLevel: any = village.villageBuildings.find(
    (building: any) => building.type === "granary"
  );

  const findWarehouse = gsBuildings.find(
    (building: any) => building.type === "warehouse"
  );
  const findGranary = gsBuildings.find(
    (building: any) => building.type === "granary"
  );

  const resourcesMaxStorage =
    findWarehouse?.levels[0][warehouseMaxStorage.level].warehouseResourceLimit;

  const granaryMaxStorage =
    findGranary?.levels[0][granaryLevel.level].granaryResourceLimit;

  const warehouseNextLevel =
    findWarehouse.levels[0][
      warehouseMaxStorage.level + 1 < MAX_LEVEL_BUILDINGS
        ? warehouseMaxStorage.level + 1
        : MAX_LEVEL_BUILDINGS
    ].warehouseResourceLimit;
  const granaryNextLevel =
    findGranary.levels[0][
      granaryLevel.level + 1 < MAX_LEVEL_BUILDINGS
        ? granaryLevel.level + 1
        : MAX_LEVEL_BUILDINGS
    ].granaryResourceLimit;

  return (
    <div className="mt-5 px-6 sm:px-12 md:px-20 ">
      <div className="resource_bar">
        <div
          className="tooltip"
          data-tip={`Warehouse level ${warehouseMaxStorage.level}/${MAX_LEVEL_BUILDINGS}`}
        >
          <div className="flex flex-col rounded-xl border-2 border-primary/60 bg-slate-800 p-3 lg:mr-3">
            <div className="flex w-full justify-center space-x-2 text-center text-white lg:w-32">
              <div>
                <DatabaseIcon className="mt-0.5 h-5 w-5" />
              </div>
              <div>
                <p>{resourcesMaxStorage}</p>
              </div>
            </div>
            <div className="text-center text-xs ">
              {warehouseMaxStorage.level + 1 < MAX_LEVEL_BUILDINGS
                ? `Next upgrade: ${warehouseNextLevel}`
                : "Max level"}
            </div>
          </div>
        </div>

        {resources.map((resource, i) => (
          <div
            key={i}
            className="flex flex-col space-y-0.5 rounded-xl border-2 border-primary/60 bg-slate-700 px-3 py-1 lg:w-32"
          >
            <div className="flex w-full items-center justify-center space-x-2 text-center text-white">
              <div>{resource.icon}</div>
              <div>
                <p>{resource.amount}</p>
              </div>
            </div>
            <progress
              className={`progress ${
                resource.amount === resourcesMaxStorage
                  ? "progress-error"
                  : "progress-success"
              } w-full px-1 `}
              value={resource.amount}
              max={resourcesMaxStorage}
            ></progress>
          </div>
        ))}

        <div
          className="tooltip"
          data-tip={`Granary level ${granaryLevel.level}/${MAX_LEVEL_BUILDINGS}`}
        >
          <div className="flex flex-col rounded-xl border-2 border-primary/60 bg-slate-800 p-3 lg:mr-3">
            <div className="flex w-full justify-center space-x-2 text-center text-white lg:w-32">
              <div>
                <DatabaseIcon className="mt-0.5 h-5 w-5" />
              </div>
              <div>
                <p>{granaryMaxStorage}</p>
              </div>
            </div>
            <div className="text-center text-xs ">
              {granaryLevel.level + 1 < MAX_LEVEL_BUILDINGS
                ? `Next upgrade: ${granaryNextLevel}`
                : "Max level"}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-0.5 rounded-xl border-2 border-primary/60 bg-slate-700 px-3 py-1 lg:w-32">
          <div className="flex w-full items-center justify-center space-x-2 text-center text-white">
            <div>{wheat.icon}</div>
            <div>
              <p>{wheat.amount}</p>
            </div>
          </div>
          <progress
            className={`progress ${
              wheat.amount === granaryMaxStorage
                ? "progress-error"
                : "progress-success"
            } w-full px-1`}
            value={wheat.amount}
            max={granaryMaxStorage}
          ></progress>
        </div>

        <div
          className="tooltip"
          data-tip={`Available builders ${
            !buildersRedux.length ? "1/1" : "0/1"
          }`}
        >
          <div className="flex flex-col rounded-xl border-2 border-primary/60 bg-slate-800 p-3 lg:mr-3">
            <div className="flex w-full justify-center space-x-2 text-center text-white lg:w-32">
              <div>
                <CogIcon className="mt-0.5 h-5 w-5" />
              </div>
              <div>
                <p>{!buildersRedux.length ? "1/1" : "0/1"}</p>
              </div>
            </div>
            <progress
              className={`progress mt-2 ${
                buildersRedux.length ? "progress-error" : "progress-success"
              } w-full px-1`}
              value={1}
              max={1}
            ></progress>
          </div>
        </div>
      </div>

      <div className="lg:px-8 xl:px-52 2xl:px-96">{children}</div>
    </div>
  );
}

export default VillageWrapper;
