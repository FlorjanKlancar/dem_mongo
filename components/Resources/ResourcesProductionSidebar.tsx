import {
  HandIcon,
  LightningBoltIcon,
  ScaleIcon,
  StarIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";

function ResourcesProductionSidebar() {
  const village = useSelector((state: RootState) => state.village);

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

  return (
    <div className="flex w-full flex-col space-y-4  sm:w-1/2 md:w-full">
      <div className="rounded-xl border-2 border-primary/80 bg-slate-800 p-5 text-center text-gray-200">
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
    </div>
  );
}

export default ResourcesProductionSidebar;
