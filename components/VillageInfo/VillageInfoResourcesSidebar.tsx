import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";
import Image from "next/image";

function VillageInfoResourcesSidebar() {
  const village = useSelector((state: RootState) => state.village);

  const resources = [
    {
      icon: (
        <div className="relative h-10 w-10">
          <Image src={WoodImg} alt="WoodImg" layout="fill" />
        </div>
      ),
      title: "Wood",
      amount: village.woodProductionPerH,
    },
    {
      icon: (
        <div className="relative h-10 w-10">
          <Image src={ClayImg} alt="ClayImg" layout="fill" />
        </div>
      ),
      title: "Clay",
      amount: village.clayProductionPerH,
    },
    {
      icon: (
        <div className="relative h-10 w-10">
          <Image src={IronImg} alt="IronImg" layout="fill" />
        </div>
      ),
      title: "Iron",
      amount: village.ironProductionPerH,
    },
    {
      icon: (
        <div className="relative h-10 w-10">
          <Image src={WheatImg} alt="WheatImg" layout="fill" />
        </div>
      ),
      title: "Wheat",
      amount: village.wheatProductionPerH,
    },
  ];

  return (
    <div className="flex w-full flex-col space-y-4  sm:w-1/2 md:w-full">
      <div className="rounded-xl border-2 border-primary/80 bg-slate-800 px-2 py-2 text-center text-gray-200">
        <div className="text-xl font-semibold text-primary">
          Production per hour
        </div>
        <hr className="border-primary/80 text-gray-200" />

        <div className="mt-2 flex w-full flex-col space-y-3">
          {resources.map((resource, i) => (
            <div
              key={i}
              className="grid grid-cols-3 items-center justify-items-center gap-4"
            >
              <div>{resource.icon}</div>
              <div>{resource.title}</div>
              <div>{resource.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VillageInfoResourcesSidebar;
