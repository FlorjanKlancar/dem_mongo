import {
  HandIcon,
  LightningBoltIcon,
  ScaleIcon,
  StarIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import { newVillage } from "../../utils/VillageDummyData";

function Resources() {
  const resources = [
    {
      icon: <HandIcon className="mt-0.5 h-5 w-5" />,
      title: "Wood",
      amount: newVillage.woodProductionPerH,
    },
    {
      icon: <LightningBoltIcon className="mt-0.5 h-5 w-5" />,
      title: "Clay",
      amount: newVillage.clayProductionPerH,
    },
    {
      icon: <ScaleIcon className="mt-0.5 h-5 w-5" />,
      title: "Iron",
      amount: newVillage.ironProductionPerH,
    },
    {
      icon: <StarIcon className="mt-0.5 h-5 w-5" />,
      title: "Wheat",
      amount: newVillage.wheatProductionPerH,
    },
  ];

  return (
    <div className="flex flex-col space-y-3 md:flex-row md:space-x-12 md:space-y-0">
      <div className="grid w-full grid-cols-4 sm:grid-cols-4 md:w-9/12">
        {newVillage.resourceFields.map((resource) => (
          <div
            key={resource.gridPosition}
            className={`relative cursor-pointer rounded-xl  border-slate-800/10 hover:border-slate-800/40 ${
              resource.type === "village_center" ? "" : "border-2"
            }`}
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
                <div className="">{resource.amount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-800/80 p-5 text-center text-gray-200">
          <div>Troops</div>
          <hr className="text-gray-200" />

          <div className="mt-2 flex w-full flex-col space-y-3">
            {resources.map((resource, i) => (
              <div key={i} className="flex justify-between">
                <div>{resource.icon}</div>
                <div>{resource.title}</div>
                <div className="">{resource.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
