import Image from "next/image";
import React, { useState } from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useUserVillage } from "../../hooks/useUserVillage";
import { unitModel } from "../../types/unitModel";
import { motion } from "framer-motion";

type Props = {};

function BattlePage({}: Props) {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const {
    data: villageData,
    isLoading,
    isError,
  } = useUserVillage(session?.user.id);

  const [attackAnimate, setAttackAnimate] = useState<any>({
    i: null,
  });

  const enemyUnits: unitModel[] = [
    {
      _id: "62baf368e58c4f768a93bcb4",
      level: 0,
      amount: 5,
      name: "Clubswinger",
    },
    {
      _id: "62baf368e58c4f768a93bcb5",
      level: 0,
      amount: 10,
      name: "Spearman",
    },
    {
      _id: "62baf368e58c4f768a93bcb6",
      level: 0,
      amount: 20,
      name: " Long Bowman",
    },
  ];
  const yourUnits: unitModel[] = [
    {
      _id: "62baf368e58c4f768a93bcb4",
      level: 0,
      amount: 5,
      name: "Clubswinger",
    },
    {
      _id: "62baf368e58c4f768a93bcb9",
      level: 0,
      amount: 15,
      name: "Heavy Knight",
    },
    {
      _id: "62baf368e58c4f768a93bcb8",
      level: 0,
      amount: 4,
      name: "Basic Horseman",
    },
  ];

  const expandedEnemyUnitsArray = enemyUnits.map((unit: unitModel) => {
    const findUnit = gameSettingsData?.unitsResponse.find(
      (gsUnit: unitModel) => unit._id === gsUnit._id
    );

    return {
      ...unit,
      ...findUnit,
    };
  });
  const expandedYourUnitsArray = yourUnits.map((unit: unitModel) => {
    const findUnit = gameSettingsData?.unitsResponse.find(
      (gsUnit: unitModel) => unit._id === gsUnit._id
    );

    return {
      ...unit,
      ...findUnit,
    };
  });

  if (isLoading)
    return (
      <>
        <NavbarDem />
        Loading skeleton
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  const attackHandler = (i: number) => {
    setAttackAnimate({ i });
  };

  if (villageData && gameSettingsData)
    return (
      <>
        <NavbarDem />

        <div className="lg:px-8 xl:px-52 2xl:px-96">
          <div className="mb-20 flex flex-col rounded-xl bg-slate-800 shadow-2xl">
            <h1 className="my-4 rounded-xl px-4 py-6 text-center text-3xl text-primary">
              Enemy units
            </h1>
            <div className="mb-5 flex justify-center space-x-2">
              {expandedEnemyUnitsArray.map((unit: unitModel, i: number) => (
                <div key={i} className="card w-40 bg-base-100 shadow-xl">
                  {unit.unitIcon && (
                    <figure className="bg-primary/50">
                      <img src={unit.unitIcon} className="h-16 py-2" />
                    </figure>
                  )}
                  <div className="flex flex-col space-y-5 p-2 text-center">
                    <h2 className="text-lg font-semibold">{unit.name}</h2>
                    <p>Unit amount: {unit.amount}</p>

                    <div className="card-actions justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="relative h-8 w-8">
                          <img src="https://icon-library.com/images/attack-icon/attack-icon-7.jpg" />
                        </div>
                        <div className="text-xl">{unit.attack}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative h-8 w-8">
                          <img src="https://cdn-icons-png.flaticon.com/512/81/81137.png" />
                        </div>
                        <div className="text-xl">{unit.defense}</div>
                      </div>
                    </div>

                    <div className="card-actions justify-end">
                      <div className="badge badge-outline capitalize text-primary">
                        {unit.type}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex cursor-pointer justify-center space-x-2">
              {expandedYourUnitsArray.map((unit: unitModel, i: number) => (
                <motion.div
                  onClick={() => attackHandler(i)}
                  initial={{ y: 0 }}
                  animate={{
                    y: attackAnimate.i === i ? [0, -100, 0] : 0,
                  }}
                  transition={{ duration: 1.4 }}
                  key={i}
                  className="card w-40 bg-base-100 shadow-xl"
                >
                  {unit.unitIcon && (
                    <figure className="bg-primary/50">
                      <img src={unit.unitIcon} className="h-16 py-2" />
                    </figure>
                  )}
                  <div className="flex flex-col space-y-5 p-2 text-center">
                    <h2 className="text-lg font-semibold">{unit.name}</h2>
                    <p>Unit amount: {unit.amount}</p>

                    <div className="card-actions justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="relative h-8 w-8">
                          <img src="https://icon-library.com/images/attack-icon/attack-icon-7.jpg" />
                        </div>
                        <div className="text-xl">{unit.attack}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative h-8 w-8">
                          <img src="https://cdn-icons-png.flaticon.com/512/81/81137.png" />
                        </div>
                        <div className="text-xl">{unit.defense}</div>
                      </div>
                    </div>

                    <div className="card-actions justify-end">
                      <div className="badge badge-outline capitalize text-primary">
                        {unit.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <h1 className="my-4 rounded-xl px-4 py-6 text-center text-3xl text-primary">
              Your units
            </h1>
          </div>
        </div>
      </>
    );
}

export default BattlePage;
