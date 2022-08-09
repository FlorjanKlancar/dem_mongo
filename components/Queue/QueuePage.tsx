import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { villageActions } from "../../store/village-slice";
import { RootState } from "../../types/storeModel";
import { unitModel } from "../../types/unitModel";
import SelectUnitCard from "./SelectUnitCard";
import SelectedUnitCard from "./SelectedUnitCard";
import socket from "../../lib/socket";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { userInQueueModel } from "../../types/userInQueueModel";

type QueuePageProps = {
  gsUnits: unitModel[];
  villageUnits: unitModel[];
  userId: string;
  queueData: userInQueueModel | undefined;
};

function QueuePage({
  gsUnits,
  villageUnits,
  userId,
  queueData,
}: QueuePageProps) {
  const router = useRouter();

  const [villageCurrentUnits, setVillageCurrentUnits] =
    useState<unitModel[]>(villageUnits);
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
      villageCurrentUnits.map((unit: unitModel) => {
        if (unit._id === unitId) {
          return { ...unit, amount: 0 };
        }
        return unit;
      })
    );
  };

  const removeUnitsHandler = (unitName: string, unitAmount: number) => {
    setSelectedSquad(
      selectedSquad.filter((unit: unitModel) => unit.name !== unitName)
    );
  };

  const queueUpHandler = () => {
    const queueToast = toast.loading("Adding to queue...");

    socket.emit("addUserToQueue", { userId, selectedSquad });
    socket.on("queueResponse", ({ response }) => {
      if (response.status === 200) {
        router.push("/resources");
        toast.success(response.msg, { id: queueToast });
      } else {
        toast.error(response.msg, { id: queueToast });
      }
    });
  };

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

      {!queueData ? (
        <div className="mt-4 grid grid-cols-2 divide-x-2 divide-primary/80 pb-8">
          <div className="flex flex-col space-y-5 px-8    ">
            <div className="text-center text-lg font-semibold text-primary">
              Select your units
            </div>

            <form className="flex w-full flex-col">
              {!villageUnits.length ? (
                <div className="text-center  text-sm text-slate-400">
                  No units available
                </div>
              ) : (
                villageUnits.map((unit: any) => {
                  if (unit.amount > 0)
                    return (
                      <div key={unit._id}>
                        {gsUnits.map((gsUnit: any, i: number) => {
                          if (gsUnit.unitName === unit.name) {
                            return (
                              <div key={gsUnit.unitName}>
                                <SelectUnitCard
                                  gsUnit={gsUnit}
                                  villageCurrentUnits={villageCurrentUnits}
                                  handleChange={handleChange}
                                  unitsArray={villageUnits}
                                  i={i}
                                  submitHandler={submitHandler}
                                  unit={unit}
                                />
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                })
              )}
            </form>
          </div>

          <div>
            <div className="text-center text-lg font-semibold text-primary">
              Currently selected units
            </div>
            <div className="mt-4 flex flex-col space-y-3 px-4">
              {!selectedSquad.length ? (
                <div className="text-center  text-sm text-slate-400">
                  No units selected
                </div>
              ) : (
                selectedSquad.map((unit: any) => (
                  <div
                    key={unit.name}
                    className="card rounded-box flex flex-col  bg-base-300"
                  >
                    {gsUnits.map((gsUnit: any) => {
                      if (gsUnit.unitName === unit.name) {
                        return (
                          <div key={unit.name}>
                            <SelectedUnitCard
                              gsUnit={gsUnit}
                              unit={unit}
                              removeUnitsHandler={removeUnitsHandler}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                ))
              )}
              {selectedSquad.length ? (
                <div className="px-12">
                  <button
                    className="secondary_button w-full"
                    onClick={queueUpHandler}
                  >
                    Queue up!
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 pb-8">
          <div className="flex flex-col space-y-5 px-8 ">
            <div className="text-lg font-semibold text-primary">
              You are in queue with following squad
            </div>

            <div>
              {queueData?.unitsInQueue?.map((unit: unitModel, i: number) => (
                <div key={i}>
                  {gsUnits.map((gsUnit: any) => {
                    if (gsUnit.unitName === unit.name) {
                      return (
                        <div key={unit.name}>
                          <SelectedUnitCard gsUnit={gsUnit} unit={unit} />
                        </div>
                      );
                    }
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QueuePage;
