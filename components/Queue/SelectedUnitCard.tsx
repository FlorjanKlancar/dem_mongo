import {XIcon} from "@heroicons/react/outline";
import React from "react";
import {unitModel} from "../../types/unitModel";

type SelectedUnitCardProps = {
  gsUnit: any;
  unit: unitModel;
  removeUnitsHandler?: (unitName: string, amount: number) => void;
};

function SelectedUnitCard({
  gsUnit,
  unit,
  removeUnitsHandler,
}: SelectedUnitCardProps) {
  return (
    <div className="flex h-20 flex-row items-center justify-around">
      <div>
        <img src={gsUnit.unitIcon} className="h-8 w-8" />
      </div>
      <div>{unit.name}</div>
      <div className="text-primary">Selected: {unit.amount}</div>
      {removeUnitsHandler ? (
        <div>
          <button
            type="button"
            onClick={() => removeUnitsHandler(gsUnit.unitName, unit.amount)}
          >
            <XIcon className="h-4 w-4 text-red-600" />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SelectedUnitCard;
