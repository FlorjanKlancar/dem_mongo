import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { villageActions } from "../../store/village-slice";
import { RootState } from "../../types/storeModel";
import { XIcon } from "@heroicons/react/outline";

function QueuePage() {
  const dispatch = useDispatch();

  const unitsArray: any = useSelector(
    (state: RootState) => state.village.units
  );
  const { gsUnits }: any = useSelector((state: RootState) => state.gsUnits);

  const [villageCurrentUnits, setVillageCurrentUnits] =
    useState<any>(unitsArray);
  const [selectedSquad, setSelectedSquad] = useState<any>([]);

  const handleChange = (e: any, i: number) => {
    let data: any = [...villageCurrentUnits];
    data[i] = {
      _id: villageCurrentUnits[i]._id,
      level: villageCurrentUnits[i].level,
      name: e.target.name,
      amount: e.target.value > 0 ? +e.target.value : 0,
    };

    setVillageCurrentUnits(data);
  };
  const submitHandler = (e: any, unitId: string) => {
    e.preventDefault();

    const selectedUnit = villageCurrentUnits.find(
      (unit: any) => unit._id === unitId
    );

    setSelectedSquad((selectedSquad: any) => [...selectedSquad, selectedUnit]);

    setVillageCurrentUnits(
      villageCurrentUnits.map((unit: any) => {
        if (unit._id === unitId) {
          return { ...unit, amount: 0 };
        }
        return unit;
      })
    );

    dispatch(
      villageActions.addUnitsToQueue(
        unitsArray.map((unit: any) => {
          if (unit._id === unitId) {
            return { ...unit, amount: unit.amount - selectedUnit.amount };
          } else return unit;
        })
      )
    );
  };

  const removeUnitsHandler = (unitName: string, unitAmount: number) => {
    setSelectedSquad(
      selectedSquad.filter((unit: any) => unit.name !== unitName)
    );

    dispatch(
      villageActions.addUnitsToQueue(
        unitsArray.map((unit: any) => {
          if (unit.name === unitName) {
            return { ...unit, amount: unit.amount + unitAmount };
          } else return unit;
        })
      )
    );
  };

  console.log("selectedsquad", selectedSquad);
  console.log("units a", unitsArray);
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

          <form className="flex w-full flex-col">
            {unitsArray.map((unit: any) => {
              if (unit.amount > 0)
                return (
                  <div key={unit._id}>
                    {gsUnits.map((gsUnit: any, i: number) => {
                      if (gsUnit.unitName === unit.name) {
                        return (
                          <div key={gsUnit.unitName}>
                            <div className="card rounded-box flex flex-col  bg-base-300">
                              <div className="flex h-20 flex-row items-center justify-around">
                                <div>
                                  <img
                                    src={gsUnit.unitIcon}
                                    className="h-8 w-8"
                                  />
                                </div>
                                <div>{unit.name}</div>
                                <div className="text-primary">
                                  Alive: {unit.amount}
                                </div>
                              </div>

                              <div className="flex h-20 flex-row items-center justify-around">
                                Attack def descr of unit
                              </div>
                            </div>

                            <div className="mt-2 flex flex-col items-center justify-center space-y-3">
                              <div className="btn-group flex w-full justify-center">
                                <button
                                  className="btn w-24"
                                  type="button"
                                  name={unit.name}
                                  value={villageCurrentUnits[i].amount - 1}
                                  onClick={(e: any) => handleChange(e, i)}
                                  disabled={villageCurrentUnits[i].amount === 0}
                                >
                                  -
                                </button>
                                <div>
                                  <input
                                    type="number"
                                    className="input input-ghost w-24 text-center"
                                    name={unit.name}
                                    autoComplete="off"
                                    min={0}
                                    max={unitsArray[i].amount}
                                    value={villageCurrentUnits[i].amount}
                                    onChange={(e: any) => handleChange(e, i)}
                                  />
                                </div>
                                <button
                                  className="btn w-24"
                                  type="button"
                                  name={unit.name}
                                  value={villageCurrentUnits[i].amount + 1}
                                  onClick={(e: any) => handleChange(e, i)}
                                  disabled={
                                    villageCurrentUnits[i].amount ===
                                    unitsArray[i].amount
                                  }
                                >
                                  +
                                </button>
                              </div>

                              <button
                                className="text-sm text-slate-400 underline decoration-slate-400 underline-offset-2"
                                name={unit.name}
                                value={unitsArray[i].amount}
                                onClick={(e: any) => handleChange(e, i)}
                                type="button"
                              >
                                Click to select all available units
                              </button>

                              <div>
                                <button
                                  className="secondary_button"
                                  type="submit"
                                  onClick={(e: any) =>
                                    submitHandler(e, unit._id)
                                  }
                                  disabled={villageCurrentUnits[i].amount === 0}
                                >
                                  Add to squad
                                </button>
                              </div>
                            </div>
                            <div className="divider"></div>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
            })}
          </form>
        </div>

        <div>
          <div>Currently selected units</div>
          <div className="mt-4 flex flex-col space-y-3 px-4">
            {selectedSquad.map((unit: any) => (
              <div
                key={unit.name}
                className="card rounded-box flex flex-col  bg-base-300"
              >
                {gsUnits.map((gsUnit: any) => {
                  if (gsUnit.unitName === unit.name) {
                    return (
                      <div
                        key={unit.name}
                        className="flex h-20 flex-row items-center justify-around"
                      >
                        <div>
                          <img src={gsUnit.unitIcon} className="h-8 w-8" />
                        </div>
                        <div>{unit.name}</div>
                        <div className="text-primary">
                          Selected: {unit.amount}
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              removeUnitsHandler(gsUnit.unitName, unit.amount)
                            }
                          >
                            <XIcon className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
          {/*        
                        <div className="card rounded-box flex flex-col  bg-base-300">
                          <div className="flex h-20 flex-row items-center justify-around">
                            <div>
                              <img src={gsUnit.unitIcon} className="h-8 w-8" />
                            </div>
                            <div>{unit.name}</div>
                            <div className="text-primary">
                              Alive: {unit.amount}
                            </div>
                          </div>

                          <div className="flex h-20 flex-row items-center justify-around">
                            Attack def descr of unit
                          </div>
                        </div>

                        <div className="mt-2 flex flex-col items-center justify-center space-y-3">
                          <div className="btn-group flex w-full justify-center">
                            <button
                              className="btn w-24"
                              type="button"
                              name={unit.name}
                              value={villageCurrentUnits[i].amount - 1}
                              onClick={(e: any) => handleChange(e, i)}
                              disabled={villageCurrentUnits[i].amount === 0}
                            >
                              -
                            </button>
                            <div>
                              <input
                                type="number"
                                className="input input-ghost w-24 text-center"
                                name={unit.name}
                                autoComplete="off"
                                min={0}
                                max={unitsArray[i].amount}
                                value={villageCurrentUnits[i].amount}
                                onChange={(e: any) => handleChange(e, i)}
                              />
                            </div>
                            <button
                              className="btn w-24"
                              type="button"
                              name={unit.name}
                              value={villageCurrentUnits[i].amount + 1}
                              onClick={(e: any) => handleChange(e, i)}
                              disabled={
                                villageCurrentUnits[i].amount ===
                                unitsArray[i].amount
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="text-sm text-slate-400 underline decoration-slate-400 underline-offset-2"
                            name={unit.name}
                            value={unitsArray[i].amount}
                            onClick={(e: any) => handleChange(e, i)}
                            type="button"
                          >
                            Click to select all available units
                          </button>

                          <div>
                            <button
                              className="secondary_button"
                              type="submit"
                              onClick={(e: any) => submitHandler(e, unit._id)}
                            >
                              Add to squad
                            </button>
                          </div>
                        </div>
                        <div className="divider"></div>
                      </div> */}
        </div>
      </div>
    </div>
  );
}

export default QueuePage;
