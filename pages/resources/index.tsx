import {
  HandIcon,
  LightningBoltIcon,
  ScaleIcon,
  StarIcon,
  TruckIcon,
  ArrowNarrowRightIcon,
  ArrowNarrowDownIcon,
  ClockIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {BASE_PRODUCTION_NUMBER, MAX_LEVEL_RESOURCES} from "../../gsVariables";
import {resourceField} from "../../types/resourceField";
import {RootState} from "../../types/storeModel";
import {unitModel} from "../../types/unitModel";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";
import axios from "axios";
import {useAuth} from "../../context/Authentication";

function Resources() {
  const {authUser: user, loading} = useAuth();

  const token = useSelector((state: RootState) => state.auth.token);
  const village = useSelector((state: RootState) => state.village);
  const {gsUnits} = useSelector((state: RootState) => state.gsUnits);
  const {gsBuildings} = useSelector((state: RootState) => state.gsBuildings);

  const [clickedResource, setClickedResource] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("village", village.currentlyBuilding);

  const resources = [
    {
      icon: <HandIcon className="mt-0.5 h-5 w-5" />,
      title: "Wood",
      amount: village.woodProductionPerH,
    },
    {
      icon: <LightningBoltIcon className="mt-0.5 h-5 w-5" />,
      title: "Clay",
      amount: village.clayProductionPerH,
    },
    {
      icon: <ScaleIcon className="mt-0.5 h-5 w-5" />,
      title: "Iron",
      amount: village.ironProductionPerH,
    },
    {
      icon: <StarIcon className="mt-0.5 h-5 w-5" />,
      title: "Wheat",
      amount: village.wheatProductionPerH,
    },
  ];

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
        villageId: user.uid,
        buildingName: clickedResource.type,
        fieldId: clickedResource.id,
        isBuilding: false,
      },
      {headers: {Authorization: `Bearer ${token}`}}
    );

    setIsLoading(false);

    console.log("response", response);
  };

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
              <div className="flex flex-col items-center justify-center space-y-5 py-8 sm:space-y-2 sm:px-8">
                <div className="relative h-32 w-32">
                  {clickedResource.image && (
                    <Image src={clickedResource.image} layout="fill" />
                  )}
                  <div className="text-bold absolute bottom-1 right-9 z-50 text-4xl text-white">
                    {clickedResource.level}
                  </div>
                </div>
                <div>Building is max level!</div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center space-y-5 py-8 sm:flex-row sm:justify-between sm:space-y-0 sm:px-8">
                  <div className="relative h-32 w-32">
                    {clickedResource.image && (
                      <Image src={clickedResource.image} layout="fill" />
                    )}
                    <div className="text-bold absolute bottom-1 right-9 z-50 text-4xl text-white">
                      {clickedResource.level}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <ArrowNarrowRightIcon className="h-12 w-12 text-primary" />
                  </div>
                  <div className="sm:hidden">
                    <ArrowNarrowDownIcon className="h-12 w-12 text-primary" />
                  </div>
                  <div className="relative h-32 w-32">
                    {clickedResource.image && (
                      <Image src={clickedResource.image} layout="fill" />
                    )}

                    <div className="text-bold absolute bottom-1 right-9 z-50 text-4xl text-white">
                      {clickedResource.level + 1}
                    </div>
                  </div>
                </div>

                <div className="text-2xl">Production</div>
                <div className="flex justify-between px-14">
                  <div>
                    From:{" "}
                    {clickedResource.levels &&
                      clickedResource.levels[0][clickedResource.level]
                        .productionAdd + BASE_PRODUCTION_NUMBER}
                  </div>
                  <div>
                    To:{" "}
                    {clickedResource.levels &&
                      clickedResource.levels[0][clickedResource.level + 1]
                        .productionAdd + BASE_PRODUCTION_NUMBER}
                  </div>
                </div>

                <hr className="border-primary" />

                <div className="text-2xl">Resources cost</div>

                <div className="grid grid-cols-2 justify-items-center	gap-3	">
                  <div className="flex items-center space-x-2">
                    <div className="relative h-16 w-16">
                      <Image src={WoodImg} layout="fill" />
                    </div>
                    <div className="text-2xl">
                      {clickedResource.levels &&
                        clickedResource.levels[0][clickedResource.level + 1]
                          .costWood}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative h-16 w-16">
                      <Image src={ClayImg} layout="fill" />
                    </div>
                    <div className="text-2xl">
                      {clickedResource.levels &&
                        clickedResource.levels[0][1].costClay}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative h-16 w-16">
                      <Image src={IronImg} layout="fill" />
                    </div>
                    <div className="text-2xl">
                      {clickedResource.levels &&
                        clickedResource.levels[0][1].costIron}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative h-16 w-16">
                      <Image src={WheatImg} layout="fill" />
                    </div>
                    <div className="text-2xl">
                      {clickedResource.levels &&
                        clickedResource.levels[0][1].costWheat}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div>
                      <ClockIcon className="h-12 w-12 text-primary/80" />
                    </div>
                    <div className="text-2xl">
                      {clickedResource.levels &&
                        clickedResource.levels[0][1].timeToBuild}
                      <span className="text-base">s</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div>
                      <PlusIcon className="h-12 w-12 text-primary/80" />
                    </div>
                    <div className="text-2xl">
                      {clickedResource.levels &&
                        clickedResource.levels[0][1].populationAdd}
                      <span className="text-base">pop</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="">
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
      <div className="flex flex-col space-y-3 md:flex-row md:space-x-12 md:space-y-0">
        <div className="grid w-full grid-cols-4 sm:grid-cols-4 md:w-9/12">
          {village.resourceFields.map((resource: resourceField) => (
            <label
              htmlFor={`${resource.type !== "village_center" && "my-modal-4"}`}
            >
              <div
                className={`relative cursor-pointer rounded-xl  border-slate-800/10 hover:border-slate-800/40 ${
                  resource.type === "village_center" ? "" : "border-2"
                }`}
                onClick={() =>
                  onResourceClickHandler(
                    resource.id,
                    resource.level,
                    resource.type
                  )
                }
              >
                {resource.imageGrid && (
                  <div className="h-20 w-20 sm:h-28 sm:w-32">
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
        <div className="flex w-full flex-col space-y-4 md:w-3/12">
          <div className="rounded-xl bg-slate-800/80 p-5 text-center text-gray-200">
            <div>Production per hour</div>
            <hr className="text-gray-200" />

            <div className="mt-2 flex w-full flex-col space-y-3">
              {resources.map((resource, i) => (
                <div key={i} className="flex justify-between">
                  <div>{resource.icon}</div>
                  <div>{resource.title}</div>
                  <div>{resource.amount}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-5 text-center text-gray-200">
            <div>Troops</div>
            <hr className="text-gray-200" />

            <div className="mt-2 flex w-full flex-col space-y-3">
              {village.units.map((unit: unitModel, i) => (
                <div key={unit.name}>
                  {unit.amount ? (
                    Object.values(gsUnits).map((val: any, i) => {
                      if (val[unit.name]) {
                        return (
                          <div key={i} className="flex justify-between">
                            <div>
                              <TruckIcon className="h-5 w-5" />
                            </div>
                            <div>{val[unit.name].unitName}</div>
                            <div>{unit.amount}</div>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resources;
