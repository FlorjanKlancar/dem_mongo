import {
  ArrowNarrowRightIcon,
  ClockIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";

type ResourcesModalProps = {
  clickedResource: {
    id: string;
    level: number;
    name: string;
    image: string;
    description: string;
    type: string;
    levels: any;
  };
};

function BuildingModal({ clickedResource }: ResourcesModalProps) {
  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-3 py-8 sm:justify-between sm:space-y-0 sm:px-8">
        <div className="relative h-20 w-24 sm:h-32 sm:w-32">
          {clickedResource.image && (
            <Image
              src={clickedResource.image}
              alt={clickedResource.type}
              layout="fill"
            />
          )}
          <div className="text-bold absolute bottom-1 right-6 z-50 text-lg text-white sm:right-9 sm:text-4xl">
            {clickedResource.level}
          </div>
        </div>
        <div className="">
          <ArrowNarrowRightIcon className="h-8 w-8 text-primary sm:h-12 sm:w-12" />
        </div>

        <div className="relative h-20 w-24 sm:h-32 sm:w-32">
          {clickedResource.image && (
            <Image
              src={clickedResource.image}
              alt={clickedResource.type}
              layout="fill"
            />
          )}

          <div className="text-bold absolute bottom-1 right-6 z-50 text-lg text-white sm:right-9 sm:text-4xl">
            {clickedResource.level + 1}
          </div>
        </div>
      </div>

      <hr className="border-primary" />

      <div className="text-xl sm:text-2xl">Resources cost</div>

      <div className="grid grid-cols-2 justify-items-center gap-3	sm:grid-cols-2	">
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={WoodImg} alt="WoodImg" layout="fill" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].costWood}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={ClayImg} alt="ClayImg" layout="fill" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].costClay}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={IronImg} alt="IronImg" layout="fill" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].costIron}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={WheatImg} alt="WheatImg" layout="fill" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].costWheat}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <ClockIcon className="h-12 w-12 text-primary/80" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].timeToBuild}
            <span className="text-base">s</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <PlusIcon className="h-12 w-12 text-primary/80" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1]
                .populationAdd}
            <span className="text-base">pop</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuildingModal;
