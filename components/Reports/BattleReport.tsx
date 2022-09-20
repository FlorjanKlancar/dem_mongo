import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useNextAuth } from "../../hooks/useNextAuth";
import { battleReportModel } from "../../types/battleReportModel";
import { RootState } from "../../types/storeModel";
import { unitModel } from "../../types/unitModel";
import SelectedUnitCard from "../Queue/SelectedUnitCard";

type BattleReportProps = {
  singleBattle: battleReportModel;
};

function BattleReport({ singleBattle }: BattleReportProps) {
  const { session }: any = useNextAuth();
  const { gsUnits }: any = useSelector((state: RootState) => state.gsUnits);

  const yourTroops =
    session.user.id === singleBattle.playerOne
      ? singleBattle.unitsPlayerOne
      : singleBattle.unitsPlayerTwo;
  const opponentTroops =
    session.user.id !== singleBattle.playerOne
      ? singleBattle.unitsPlayerOne
      : singleBattle.unitsPlayerTwo;

  return (
    <div className="mb-12 flex flex-col px-4">
      <div className="flex	 items-center justify-between ">
        <div>
          <h1 className="text-4xl font-semibold text-primary">
            {singleBattle.winner}
          </h1>
        </div>
        <div>{dayjs(singleBattle.createdAt).format("DD. MM. YYYY HH:mm")}</div>
        <div>
          <Link href="/reports">
            <button className="secondary_button">
              <ArrowNarrowLeftIcon className="mt-0.5 mr-2 h-5 w-5" />
              Back
            </button>
          </Link>
        </div>
      </div>

      <hr className="mt-4 border-primary/80" />

      <div className="mt-8 grid grid-cols-2 divide-x-2 divide-primary divide-opacity-50">
        <div className="px-3">
          <h1 className="my-3 text-center text-lg text-primary">Your troops</h1>
          <div className="flex flex-col space-y-3">
            {yourTroops &&
              yourTroops.map((unit: unitModel, i: number) => (
                <div
                  key={i}
                  className="card rounded-box flex flex-col bg-base-300 px-8"
                >
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

        <div className="px-3">
          <h1 className="my-3 text-center text-lg text-primary">
            Opponent troops
          </h1>
          <div className="flex flex-col space-y-3">
            {opponentTroops &&
              opponentTroops.map((unit: unitModel, i: number) => (
                <div
                  key={i}
                  className="card rounded-box flex flex-col bg-base-300 px-8"
                >
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
    </div>
  );
}

export default BattleReport;
