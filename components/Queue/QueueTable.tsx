import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";

function QueueTable() {
  const unitsArray = useSelector((state: RootState) => state.village.units);
  const { gsUnits }: any = useSelector((state: RootState) => state.gsUnits);

  console.log("unitsArray", unitsArray);
  console.log("gsUnits", gsUnits);

  return (
    <div className="mb-12 flex flex-col rounded-lg border-2 border-primary/80 bg-slate-800 ">
      <div>
        <div className="relative flex h-56 w-full items-center justify-center">
          <Image
            src={"https://wallpaperaccess.com/full/52990.jpg"}
            layout="fill"
            className="rounded-lg "
            objectFit="cover"
            priority
          />
          <div className="absolute text-4xl font-semibold text-white">
            Queue up
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 ">
        <div className="flex flex-col space-y-5 px-8    ">
          <div>Select your units</div>

          <div className="flex w-full flex-col">
            {unitsArray.map((unit: any) => (
              <div key={unit._id}>
                {gsUnits.map((gsUnit: any) => {
                  if (gsUnit.unitName === unit.name) {
                    return (
                      <div key={gsUnit.unitName}>
                        <div className="card rounded-box flex flex-col  bg-base-300">
                          <div className="flex h-20 flex-row items-center justify-around">
                            <div>
                              <img src={gsUnit.unitIcon} className="h-8 w-8" />
                            </div>
                            <div>{unit.name}</div>
                            <div>Alive: {unit.amount}</div>
                          </div>

                          <div className="flex h-20 flex-row items-center justify-around">
                            Attack def descr of unit
                          </div>
                        </div>

                        <div className="btn-group flex w-full justify-center">
                          <button className="btn ">-</button>
                          <div>
                            <input
                              type="text"
                              placeholder="0"
                              className="input input-ghost w-12 text-center"
                            />
                          </div>
                          <button className="btn">+</button>
                        </div>

                        <div className="divider"></div>
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>

        <div>Currently selected units</div>
      </div>
    </div>
  );
}

export default QueueTable;
