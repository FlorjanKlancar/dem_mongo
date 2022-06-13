import axios from "axios";
import {GetServerSidePropsContext} from "next";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {buildingModel} from "../../types/buildingModel";
import {getBuildingById} from "../../pages/api/gsBuildings/[id]";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";
import {ClockIcon, PlusIcon} from "@heroicons/react/outline";
import {useSelector} from "react-redux";
import {RootState} from "../../types/storeModel";
import toast from "react-hot-toast";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/clientApp";
import {useRouter} from "next/router";
import {MAX_LEVEL_BUILDINGS} from "../../gsVariables";
import {troopsInputModel} from "../../types/troopsInputModel";
import TroopsTrain from "../../components/Village/TroopsTrain";

type VillageTypeProps = {
  building: buildingModel;
};

function UpgradeBuildingPage({building}: VillageTypeProps) {
  const router = useRouter();
  const [user]: any = useAuthState(auth);

  const village = useSelector((state: RootState) => state.village);
  const {gsUnits}: any = useSelector((state: RootState) => state.gsUnits);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [troops, setTroops] = useState<troopsInputModel[]>(
    Object.keys(building.group === "Offense" && gsUnits[building?.type]).map(
      (val: any) => {
        return {
          unitName: val,
          unitAmount: 0,
        };
      }
    )
  );

  const selectedBuilding: any = Object.values(village.villageBuildings).find(
    (val: any) => {
      if (val.type === building.type) return val;
    }
  );

  const upgradeHandler = async () => {
    router.push("/village");
    const upgradeToast = toast.loading("Upgrading...");
    await axios.post(
      `/api/build/resources`,
      {
        villageId: user?.uid,
        buildingName: building.type,
        fieldId: selectedBuilding.id,
        isBuilding: true,
      },
      {headers: {Authorization: `Bearer ${user?.accessToken}`}}
    );

    toast.success("Upgrade started successfully!", {id: upgradeToast});
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

  useEffect(() => {
    checkResources(building.levels[0][selectedBuilding.level + 1]);
  }, []);
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
                          <Image src={WoodImg} layout="fill" />
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
                          <Image src={ClayImg} layout="fill" />
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
                          <Image src={IronImg} layout="fill" />
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
                          <Image src={WheatImg} layout="fill" />
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

                      <div className="col-span-2 ">
                        <button
                          onClick={upgradeHandler}
                          className="mt-1  rounded-lg bg-primary py-2 px-4 font-bold text-slate-800 hover:bg-primary hover:text-slate-600 disabled:bg-gray-500 disabled:hover:text-slate-800"
                          disabled={
                            isButtonDisabled
                              ? true
                              : false || village.currentlyBuilding.length
                              ? true
                              : false
                          }
                        >
                          {isButtonDisabled
                            ? "Not enough resources!"
                            : village.currentlyBuilding.length
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
          village={village}
          troops={troops}
          gsUnits={gsUnits}
          setTroops={setTroops}
          building={building}
          user={user}
        />
      )}
    </div>
  );
}

export default UpgradeBuildingPage;
