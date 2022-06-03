import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { buildingModel } from "../../../types/buildingModel";
import { getBuildingById } from "../../api/gsBuildings/[id]";
import WoodImg from "../../../public/assets/Wood.png";
import ClayImg from "../../../public/assets/Clay.png";
import IronImg from "../../../public/assets/Iron.png";
import WheatImg from "../../../public/assets/Wheat.png";
import UpkeepImg from "../../../public/assets/upkeep.png";
import { ClockIcon, PlusIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/storeModel";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import { MAX_LEVEL_BUILDINGS } from "../../../gsVariables";

type VillageTypeProps = {
  building: buildingModel;
};

function VillageType({ building }: VillageTypeProps) {
  const router = useRouter();
  const [user]: any = useAuthState(auth);

  const villageBuildings = useSelector(
    (state: RootState) => state.village.villageBuildings
  );
  const villageResources = useSelector(
    (state: RootState) => state.village.resourcesStorage
  );
  const { gsUnits }: any = useSelector((state: RootState) => state.gsUnits);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const selectedBuilding: any = Object.values(villageBuildings).find(
    (val: any) => {
      if (val.type === building.type) return val;
    }
  );

  const upgradeHandler = async () => {
    router.push("/village");
    const upgradeToast = toast.loading("Upgrading...");
    await axios.post(
      `/api/buildResources`,
      {
        villageId: user?.uid,
        buildingName: building.type,
        fieldId: selectedBuilding.id,
        isBuilding: true,
      },
      { headers: { Authorization: `Bearer ${user?.accessToken}` } }
    );

    toast.success("Upgrade started successfully!", { id: upgradeToast });
  };

  const checkResources = async (resourceNextLevelInfo: any) => {
    if (
      resourceNextLevelInfo &&
      (resourceNextLevelInfo.costWood > villageResources.woodAmount ||
        resourceNextLevelInfo.costClay > villageResources.clayAmount ||
        resourceNextLevelInfo.costIron > villageResources.ironAmount ||
        resourceNextLevelInfo.costWheat > villageResources.wheatAmount)
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    checkResources(building.levels[0][selectedBuilding.level + 1]);
  }, []);

  return (
    <div className="flex flex-col space-y-4 rounded-lg border-2 border-primary/80 bg-slate-800 px-6 py-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary">{building.name}</h1>
      </div>

      <hr className="border-primary/80" />

      <div className="flex justify-center space-x-4">
        <div className="grid grid-cols-3 items-center justify-items-center gap-1 space-x-12">
          <div className="col-span-2">
            <div>
              <p>{building.description}</p>
            </div>
            {selectedBuilding.level < MAX_LEVEL_BUILDINGS ? (
              <>
                {" "}
                <div className="text-xl sm:text-2xl">Resources cost</div>
                <div className="flex flex-col">
                  <div>
                    <div className="flex justify-around justify-items-center">
                      <div className="flex items-center space-x-2">
                        <div className="relative h-16 w-16">
                          <Image src={WoodImg} layout="fill" />
                        </div>
                        <div className="text-lg sm:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costWood
                          }
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="relative h-16 w-16">
                          <Image src={ClayImg} layout="fill" />
                        </div>
                        <div className="text-lg sm:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costClay
                          }
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="relative h-16 w-16">
                          <Image src={IronImg} layout="fill" />
                        </div>
                        <div className="text-lg sm:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costIron
                          }
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="relative h-16 w-16">
                          <Image src={WheatImg} layout="fill" />
                        </div>
                        <div className="text-lg sm:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costWheat
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around">
                      <div className="flex items-center space-x-2">
                        <div>
                          <ClockIcon className="h-12 w-12 text-primary/80" />
                        </div>
                        <div className="text-lg sm:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .timeToBuild
                          }
                          <span className="text-base">s</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div>
                          <PlusIcon className="h-12 w-12 text-primary/80" />
                        </div>
                        <div className="text-lg sm:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .populationAdd
                          }
                          <span className="text-base">pop</span>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={upgradeHandler}
                          className="mt-1 rounded-lg bg-primary py-2 px-4 font-bold text-slate-800 hover:bg-primary hover:text-slate-600 disabled:bg-gray-500 disabled:hover:text-slate-800"
                          disabled={isButtonDisabled ? true : false}
                        >
                          {isButtonDisabled
                            ? "Not enough resources!"
                            : `Upgrade to level ${selectedBuilding.level + 1}`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-5 underline decoration-primary underline-offset-4">
                Building is max level!
              </div>
            )}
          </div>
          <div className="relative h-48 w-48">
            <Image src={building.image} alt={building.name} layout="fill" />
          </div>
        </div>
      </div>

      {building.group === "Offense" && (
        <>
          <hr className="border-primary/80" />
          <div>
            <div>
              <h1 className="text-xl font-semibold text-primary">
                Train Troops
              </h1>
            </div>

            <div className="flex flex-col space-y-4">
              {Object.keys(gsUnits[building.type]).map((val: any, i) => {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-2 items-center justify-items-center py-4 px-4"
                  >
                    <div className="relative h-32 w-32">
                      <img src={gsUnits[building.type][val].unitIcon} />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-primary">
                        {gsUnits[building.type][val].unitName} -{" "}
                        {gsUnits[building.type][val].type}
                      </div>

                      <div className="flex">
                        <div className="flex justify-around justify-items-center space-x-3">
                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image src={WoodImg} layout="fill" />
                            </div>
                            <div className="text-xl">
                              {gsUnits[building.type][val].costWood}
                            </div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image src={ClayImg} layout="fill" />
                            </div>
                            <div className="text-xl">
                              {gsUnits[building.type][val].costClay}
                            </div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image src={IronImg} layout="fill" />
                            </div>
                            <div className="text-xl">
                              {gsUnits[building.type][val].costIron}
                            </div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image src={WheatImg} layout="fill" />
                            </div>
                            <div className="text-xl">
                              {gsUnits[building.type][val].costWheat}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-around">
                        <div className="flex items-center space-x-2">
                          <div className="relative h-8 w-8">
                            <img src="https://icon-library.com/images/attack-icon/attack-icon-7.jpg" />
                          </div>
                          <div className="text-xl">
                            {gsUnits[building.type][val].attack}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="relative h-8 w-8">
                            <img src="https://cdn-icons-png.flaticon.com/512/81/81137.png" />
                          </div>
                          <div className="text-xl">
                            {gsUnits[building.type][val].defense}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div>
                            <ClockIcon className="h-8 w-8 text-primary/80" />
                          </div>
                          <div className="text-xl">
                            {gsUnits[building.type][val].timeToBuild}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="relative h-8 w-8">
                            <Image src={UpkeepImg} layout="fill" />
                          </div>
                          <div className="text-xl">
                            {gsUnits[building.type][val].upkeep}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VillageType;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const type = params!.type;

  if (type) {
    const building = await getBuildingById(type.toString());

    if (!building) {
      return { notFound: true };
    }
    return { props: { building: building[0] } };
  }
}
