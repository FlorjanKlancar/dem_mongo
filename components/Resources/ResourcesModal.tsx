import {
  ArrowNarrowDownIcon,
  ArrowNarrowRightIcon,
  ClockIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import { BASE_PRODUCTION_NUMBER } from "../../gsVariables";
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

function ResourcesModal({ clickedResource }: ResourcesModalProps) {
  return (
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

      <div className="text-xl sm:text-2xl">Production</div>
      <div className="flex justify-between sm:px-14">
        <div>
          From:{" "}
          {clickedResource.levels &&
            clickedResource.levels[0][clickedResource.level].productionAdd +
              BASE_PRODUCTION_NUMBER}
        </div>
        <div>
          To:{" "}
          {clickedResource.levels &&
            clickedResource.levels[0][clickedResource.level + 1].productionAdd +
              BASE_PRODUCTION_NUMBER}
        </div>
      </div>

      <hr className="border-primary" />

      <div className="text-xl sm:text-2xl">Resources cost</div>

      <div className="grid grid-cols-1 justify-items-center gap-3	sm:grid-cols-2	">
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={WoodImg} layout="fill" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].costWood}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={ClayImg} layout="fill" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].costClay}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={IronImg} layout="fill" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][clickedResource.level + 1].costIron}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image src={WheatImg} layout="fill" />
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
            {clickedResource.levels && clickedResource.levels[0][1].timeToBuild}
            <span className="text-base">s</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <PlusIcon className="h-12 w-12 text-primary/80" />
          </div>
          <div className="text-lg sm:text-2xl">
            {clickedResource.levels &&
              clickedResource.levels[0][1].populationAdd}
            <span className="text-base">pop</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResourcesModal;
