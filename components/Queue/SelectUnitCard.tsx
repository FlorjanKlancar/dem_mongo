import React from "react";
import { unitModel } from "../../types/unitModel";

type QueueSelectUnitCardProps = {
  gsUnit: any;
  unit: unitModel;
  villageCurrentUnits: any;
  handleChange: (e: any, i: number) => void;
  unitsArray: unitModel[];
  i: number;
  submitHandler: (e: any, _id: string) => void;
};

function SelectUnitCard({
  gsUnit,
  unit,
  villageCurrentUnits,
  handleChange,
  unitsArray,
  i,
  submitHandler,
}: QueueSelectUnitCardProps) {
  return (
    <>
      <div className="card rounded-box flex flex-col  bg-base-300">
        <div className="flex h-20 flex-row items-center justify-around">
          <div>
            <img src={gsUnit.unitIcon} className="h-8 w-8" />
          </div>
          <div>{unit.name}</div>
          <div className="text-primary">Alive: {unit.amount}</div>
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
            disabled={villageCurrentUnits[i].amount === unitsArray[i].amount}
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
            onClick={(e: any) => submitHandler(e, unit._id!)}
            disabled={villageCurrentUnits[i].amount === 0}
          >
            Add to squad
          </button>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default SelectUnitCard;
