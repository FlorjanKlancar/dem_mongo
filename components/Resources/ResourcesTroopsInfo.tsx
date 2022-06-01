import {TruckIcon} from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../types/storeModel";
import {unitModel} from "../../types/unitModel";
import {Scrollbars} from "react-custom-scrollbars";

function ResourcesTroopsInfo() {
  const village = useSelector((state: RootState) => state.village);
  const {gsUnits} = useSelector((state: RootState) => state.gsUnits);

  return (
    <div className="max-h-[260px] overflow-x-auto rounded-xl border-2 border-primary/80 bg-slate-800 p-2 text-center text-gray-200 sm:w-1/2 md:w-full">
      <Scrollbars style={{height: 240}} universal>
        <div className=" sticky top-0 z-50 bg-slate-800">
          <div className=" text-xl font-semibold text-primary ">Troops</div>
          <hr className="border-primary/80 text-gray-200" />
        </div>

        <div className="mt-2 flex w-full flex-col space-y-2">
          {village.units.map((unit: unitModel, i) => (
            <div key={unit.name}>
              {unit.amount ? (
                Object.values(gsUnits).map((val: any, i) => {
                  if (val[unit.name]) {
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-3 items-center justify-items-center gap-4"
                      >
                        <div className="h-7 w-7 text-white">
                          <img
                            className="text-white"
                            src={val[unit.name].unitIcon}
                          />
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
      </Scrollbars>
    </div>
  );
}

export default ResourcesTroopsInfo;
