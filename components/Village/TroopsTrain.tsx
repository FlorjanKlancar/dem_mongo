import {ClockIcon} from "@heroicons/react/outline";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import Countdown, {zeroPad} from "react-countdown";
import {buildingModel} from "../../types/buildingModel";
import {troopsInputModel} from "../../types/troopsInputModel";
import WoodImg from "../../public/assets/Wood.png";
import ClayImg from "../../public/assets/Clay.png";
import IronImg from "../../public/assets/Iron.png";
import WheatImg from "../../public/assets/Wheat.png";
import UpkeepImg from "../../public/assets/upkeep.png";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useDispatch} from "react-redux";
import {villageActions} from "../../store/village-slice";
import {initializeDataFetch} from "../../utils/utilFunctions";

type TroopsTrainProps = {
  building: buildingModel;
  troops: troopsInputModel[];
  setTroops: (troop: any) => void;
  gsUnits: any;
  village: any;
};

function TroopsTrain({
  building,
  troops,
  setTroops,
  gsUnits,
  village,
}: TroopsTrainProps) {
  const {data: session}: any = useSession();
  const dispatch = useDispatch();

  const buildUnitsHandler = async (e: any) => {
    e.preventDefault();
    const trainToast = toast.loading("Training...");

    try {
      const response = await axios.post("/api/build/units", {
        villageId: session?.user.uid,
        buildingName: building.type,
        troops: troops,
      });

      setTroops(
        troops.map((troop: troopsInputModel) => {
          return {...troop, unitAmount: 0};
        })
      );

      dispatch(
        villageActions.addBuildUnitsNow({
          unitTrainQueue: response.villageResponse.currentlyBuildingUnits,
          resourcesStorage: response.villageResponse.resourcesStorageMinus,
        })
      );

      toast.success("Training started successfully!", {id: trainToast});
    } catch (error: any) {
      toast.error(error.response.data.msg, {id: trainToast});
    }
  };

  const renderer = ({hours, minutes, seconds}: any) => {
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  const onFormChangeHandler = (e: any, index: number) => {
    e.preventDefault();

    let data: any = [...troops];
    data[index] = {unitName: e.target.name, unitAmount: +e.target.value};

    setTroops(data);
  };

  return (
    <>
      <hr className="border-primary/80" />
      <div>
        <div>
          <h1 className="text-xl font-semibold text-primary">Train Troops</h1>
        </div>

        <div className="flex flex-col ">
          <form
            onSubmit={buildUnitsHandler}
            className="space-y-4 divide-y-2 divide-primary/80 divide-opacity-50"
          >
            {gsUnits.map((val: any, i: number) => {
              if (val.unitBuilding === building.type)
                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 items-center justify-items-center py-4 px-4 sm:grid-cols-2"
                  >
                    <div className="relative h-32 w-32">
                      <img src={val.unitIcon} alt="img" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-center text-primary sm:text-left">
                        {val.unitName} - {val.type}
                      </div>
                      <div>
                        <div className="grid grid-cols-2 items-center justify-around justify-items-center gap-3 md:flex md:space-x-3">
                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image
                                src={WoodImg}
                                alt="woodImg"
                                layout="fill"
                              />
                            </div>
                            <div className="text-xl">{val.costWood}</div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image
                                src={ClayImg}
                                alt="ClayImg"
                                layout="fill"
                              />
                            </div>
                            <div className="text-xl">{val.costClay}</div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image
                                src={IronImg}
                                alt="IronImg"
                                layout="fill"
                              />
                            </div>
                            <div className="text-xl">{val.costIron}</div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative h-12 w-12">
                              <Image
                                src={WheatImg}
                                alt="WheatImg"
                                layout="fill"
                              />
                            </div>
                            <div className="text-xl">{val.costWheat}</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center justify-around justify-items-center gap-3 md:flex md:space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="relative h-8 w-8">
                            <img src="https://icon-library.com/images/attack-icon/attack-icon-7.jpg" />
                          </div>
                          <div className="text-xl">{val.attack}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="relative h-8 w-8">
                            <img src="https://cdn-icons-png.flaticon.com/512/81/81137.png" />
                          </div>
                          <div className="text-xl">{val.defense}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div>
                            <ClockIcon className="h-8 w-8 text-primary/80" />
                          </div>
                          <div className="text-xl">{val.timeToBuild}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="relative h-8 w-8">
                            <Image src={UpkeepImg} layout="fill" />
                          </div>
                          <div className="text-xl">{val.upkeep}</div>
                        </div>
                      </div>
                      <div className="form-control mt-3 flex w-full max-w-xs ">
                        <input
                          type="number"
                          placeholder="Enter amount"
                          name={val._id}
                          className="input input-bordered w-full max-w-xs"
                          min={0}
                          autoComplete="off"
                          value={troops[i].unitAmount}
                          onChange={(e: any) => onFormChangeHandler(e, i)}
                        />
                        <label className="label">
                          <span className="label-text-alt">
                            Current amount{" "}
                            {village.units.map((unit: any) => {
                              if (val.unitName === unit.name) {
                                return unit.amount;
                              }
                            })}
                          </span>
                          <span className="label-text-alt">
                            <a className="cursor-pointer text-primary">
                              Build Max
                            </a>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
            })}
            <div className="flex w-full justify-center">
              <div className="w-1/2">
                <button className="primary_button" type="submit">
                  Train troops!
                </button>
              </div>
            </div>
          </form>

          {village.unitTrainQueue.length ? (
            <div className="px-16">
              <div className="my-4">Currently training troops:</div>
              <div className="space-y-4 divide-y-2 divide-primary/25 ">
                <div className="grid grid-cols-4 items-center	justify-items-center gap-4 pt-3 text-base font-semibold text-primary">
                  <div>Train order</div>
                  <div>Unit amount and name</div>
                  <div>End time</div>
                  <div>Countdown</div>
                </div>
                {village.unitTrainQueue.map((unit: any, i: number) => (
                  <div
                    className="grid grid-cols-4 items-center	justify-items-center gap-4 pt-3 text-sm"
                    key={i}
                  >
                    <div>{i + 1}</div>
                    <div className="flex space-x-2">
                      <div>{unit.amount}x</div>
                      <div>
                        {gsUnits.map((gsUnit: any, i: number) => {
                          if (gsUnit._id === unit.unit) {
                            return <span key={i}>{gsUnit.unitName}</span>;
                          }
                        })}
                      </div>
                      <div>
                        {gsUnits.map((gsUnit: any, i: number) => {
                          if (gsUnit._id === unit.unit) {
                            return (
                              <img
                                src={gsUnit.unitIcon}
                                key={i}
                                className="h-5 w-5"
                              />
                            );
                          }
                        })}
                      </div>
                    </div>

                    <div>{dayjs(unit.endThisBuild).format("HH:mm:ss")}</div>
                    <div>
                      <Countdown
                        date={unit.endThisBuild}
                        renderer={renderer}
                        zeroPadTime={2}
                        onComplete={() =>
                          setTimeout(
                            () =>
                              initializeDataFetch(session.user.uid, dispatch),
                            500
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default TroopsTrain;
