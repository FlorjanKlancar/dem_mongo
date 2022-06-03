import { CogIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { resourceField } from "../../types/resourceField";
import { RootState } from "../../types/storeModel";

function VillageField() {
  const village: any = useSelector((state: RootState) => state.village);

  return (
    <div className="grid max-h-[500px] w-full grid-cols-4 sm:grid-cols-4 md:w-9/12">
      {village.villageBuildings.map((resource: resourceField) => (
        <div key={resource.id}>
          <Link href={`/village/${resource.type}`}>
            <div
              className={`relative cursor-pointer rounded-xl  border-slate-800/10 hover:border-slate-800/40 ${
                resource.type === "village_center" ? "" : "border-2"
              } `}
            >
              {resource.imageGrid ? (
                <div className="relative h-20 w-24 sm:h-28 sm:w-32 md:h-32 md:w-40">
                  <Image src={resource.imageGrid} layout="fill" />
                </div>
              ) : (
                <div className="relative h-20 w-24 sm:h-28 sm:w-32 md:h-32 md:w-40"></div>
              )}

              {resource.level ? (
                <div className="absolute bottom-2 right-2 rounded-full border-2 border-primary/50 bg-white px-2  text-black">
                  {resource.level}
                </div>
              ) : (
                <div></div>
              )}

              {village.currentlyBuilding.length &&
              village.currentlyBuilding[0].fieldId === resource.id ? (
                <div className="absolute top-2 left-2 animate-spin text-black">
                  <CogIcon className="h-6 w-6" />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default VillageField;
