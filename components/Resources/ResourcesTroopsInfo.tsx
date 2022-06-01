import { TruckIcon } from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";
import { unitModel } from "../../types/unitModel";

function ResourcesTroopsInfo() {
  const village = useSelector((state: RootState) => state.village);
  const { gsUnits } = useSelector((state: RootState) => state.gsUnits);

  return (
    <div className="rounded-xl border-2 border-primary/80 bg-slate-800 p-5 text-center text-gray-200 sm:w-1/2 md:w-full">
      <div>Troops</div>
      <hr className="text-gray-200" />

      <div className="mt-2 flex w-full flex-col space-y-3">
        {village.units.map((unit: unitModel, i) => (
          <div key={unit.name}>
            {unit.amount ? (
              Object.values(gsUnits).map((val: any, i) => {
                if (val[unit.name]) {
                  return (
                    <div key={i} className="flex justify-between">
                      <div>
                        <TruckIcon className="h-5 w-5" />
                      </div>
                      <div>{val[unit.name].unitName}</div>
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
    </div>
  );
}

export default ResourcesTroopsInfo;
