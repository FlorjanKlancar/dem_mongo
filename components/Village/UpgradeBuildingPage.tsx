import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { buildingModel } from "../../types/buildingModel";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";
import { ClockIcon, PlusIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { MAX_LEVEL_BUILDINGS } from "../../gsVariables";
import TroopsTrain from "../../components/Village/TroopsTrain";
import { unitModel } from "../../types/unitModel";
import { villageModel } from "../../types/villageModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNextAuth } from "../../hooks/useNextAuth";

type VillageTypeProps = {
  building: buildingModel;
  gsUnits: unitModel[];
  villageData: villageModel;
};

function UpgradeBuildingPage({
  building,
  gsUnits,
  villageData,
}: VillageTypeProps) {
  const router = useRouter();
  const { session }: any = useNextAuth();
  const queryClient = useQueryClient();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [troops, setTroops] = useState<any>(
    building.group === "Offense" && gsUnits.map((val: any) => val)
  );

  const selectedBuilding: any = Object.values(
    villageData.villageBuildings
  ).find((val: any) => {
    if (val.type === building.type) return val;
  });

  const upgradeHandler = async () => {
    await axios.post(`/api/build/buildings`, {
      villageId: session.user.id,
      buildingName: building.type,
      fieldId: selectedBuilding.id,
      isBuilding: true,
    });
  };

  const checkResources = async (resourceNextLevelInfo: any) => {
    if (
      resourceNextLevelInfo &&
      (resourceNextLevelInfo.costWood >
        villageData.resourcesStorage.woodAmount ||
        resourceNextLevelInfo.costClay >
          villageData.resourcesStorage.clayAmount ||
        resourceNextLevelInfo.costIron >
          villageData.resourcesStorage.ironAmount ||
        resourceNextLevelInfo.costWheat >
          villageData.resourcesStorage.wheatAmount)
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    checkResources(building.levels[0][selectedBuilding.level + 1]);
  }, []);

  const mutation = useMutation(upgradeHandler, {
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: async () => {
      router.push("/village");
      toast.success("Upgrade started successfully!");
      await queryClient.invalidateQueries(["village"]);
    },
  });

  return (
    <div className="mb-12 flex flex-col space-y-4 rounded-lg border-2 border-primary/80 bg-slate-800 px-6 py-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary">{building.name}</h1>
      </div>

      <hr className="border-primary/80" />

      <div className="flex justify-center space-x-4">
        <div className="grid grid-cols-1 items-center justify-items-center gap-1 space-y-8 sm:grid-cols-3 sm:space-y-0 sm:space-x-12">
          <div className="sm:col-span-2">
            <div>
              <p className="text-center text-xs sm:text-left sm:text-base">
                {building.description}
              </p>
            </div>
            {selectedBuilding.level < MAX_LEVEL_BUILDINGS ? (
              <>
                <div className="text-center text-xl sm:text-left sm:text-2xl">
                  Resources cost
                </div>
                <div className="flex flex-col">
                  <div>
                    <div className="grid grid-cols-2 justify-around justify-items-center px-4 sm:px-0 md:flex">
                      <div className="flex items-center space-x-2">
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                          <Image src={WoodImg} alt="WoodImg" layout="fill" />
                        </div>
                        <div className="text-base sm:text-lg xl:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costWood
                          }
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                          <Image src={ClayImg} alt="ClayImg" layout="fill" />
                        </div>
                        <div className="text-base sm:text-lg xl:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costClay
                          }
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                          <Image src={IronImg} alt="IronImg" layout="fill" />
                        </div>
                        <div className="text-base sm:text-lg xl:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costIron
                          }
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                          <Image src={WheatImg} alt="WheatImg" layout="fill" />
                        </div>
                        <div className="text-base sm:text-lg xl:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .costWheat
                          }
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 justify-around justify-items-center gap-2 px-4 sm:px-0 md:flex">
                      <div className="flex items-center space-x-2">
                        <div>
                          <ClockIcon className="h-8 w-8 text-primary/80 sm:h-12 sm:w-12" />
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
                          <PlusIcon className="h-8 w-8 text-primary/80 sm:h-12 sm:w-12" />
                        </div>
                        <div className="text-lg sm:text-2xl">
                          {
                            building?.levels[0][selectedBuilding.level + 1]
                              .populationAdd
                          }
                          <span className="text-base">pop</span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <button
                          onClick={() => mutation.mutate()}
                          className="mt-1  rounded-lg bg-primary py-2 px-4 font-bold text-slate-800 hover:bg-primary hover:text-slate-600 disabled:bg-gray-500 disabled:hover:text-slate-800"
                          disabled={
                            isButtonDisabled
                              ? true
                              : false || villageData.currentlyBuilding.length
                              ? true
                              : false
                          }
                        >
                          {isButtonDisabled
                            ? "Not enough resources!"
                            : villageData.currentlyBuilding.length
                            ? "Builders are unavailable!"
                            : `Upgrade to level ${selectedBuilding.level + 1}`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-5 text-center underline decoration-primary underline-offset-4">
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
        <TroopsTrain
          village={villageData}
          troops={troops}
          gsUnits={gsUnits}
          setTroops={setTroops}
          building={building}
        />
      )}
    </div>
  );
}

export default UpgradeBuildingPage;
