import React from "react";
import { unitModel } from "../../types/unitModel";
import { Scrollbars } from "react-custom-scrollbars";

type VillageInfoTroopsProps = {
  villageInfoTroops: unitModel[];
  gsUnits: unitModel[];
};

function VillageInfoTroops({
  villageInfoTroops,
  gsUnits,
}: VillageInfoTroopsProps) {
  return (
    <div className="max-h-[260px] overflow-y-auto rounded-xl border-2 border-primary/80 bg-slate-800 p-2 text-center text-gray-200 sm:w-1/2 md:w-full">
      <Scrollbars style={{ height: 240 }} universal>
        <div className=" z-5 sticky top-0 bg-slate-800">
          <div className=" text-xl font-semibold text-primary ">Troops</div>
          <hr className="border-primary/80 text-gray-200" />
        </div>

        <div className="mt-2 flex w-full flex-col space-y-2">
          {villageInfoTroops.map((unit: unitModel, i: number) => (
            <div key={i}>
              {unit.amount ? (
                gsUnits.map((gsUnit: any, i: number) => {
                  if (gsUnit.unitName === unit.name) {
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-3 items-center justify-items-center gap-4"
                      >
                        <div className="h-7 w-7 text-white">
                          <img
                            className="text-white"
                            alt={gsUnit.unitName}
                            src={gsUnit.unitIcon}
                          />
                        </div>
                        <div>{gsUnit.unitName}</div>
                        <div>{unit.amount}</div>
                      </div>
                    );
                  }
                })
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
}

export default VillageInfoTroops;
