import React from "react";
import {
  HandIcon,
  LightningBoltIcon,
  ScaleIcon,
  DatabaseIcon,
  StarIcon,
} from "@heroicons/react/outline";
import {useSelector} from "react-redux";
import {RootState} from "../../../types/storeModel";

type VillageWrapperProps = {
  children: React.ReactNode;
};

const resourcesMaxStorage = 1000;

function VillageWrapper({children}: VillageWrapperProps) {
  const resourcesRedux = useSelector(
    (state: RootState) => state.village.resourcesStorage
  );

  const resources = [
    {
      icon: <HandIcon className="mt-0.5 h-5 w-5" />,
      amount: Math.floor(resourcesRedux.woodAmount),
    },
    {
      icon: <LightningBoltIcon className="mt-0.5 h-5 w-5" />,
      amount: Math.floor(resourcesRedux.clayAmount),
    },
    {
      icon: <ScaleIcon className="mt-0.5 h-5 w-5" />,
      amount: Math.floor(resourcesRedux.ironAmount),
    },
  ];

  const wheat = {
    icon: <StarIcon className="mt-0.5 h-5 w-5" />,
    amount: Math.floor(resourcesRedux.wheatAmount),
  };

  return (
    <div className="mt-5 px-6 sm:px-12 md:px-20 ">
      <div className="mb-16 flex grid-cols-4 flex-col justify-center gap-1 space-y-0.5 sm:grid sm:flex-row sm:space-y-0 lg:flex lg:space-x-1">
        <div className="flex flex-col rounded-xl border-2 border-primary/60 bg-slate-800 p-3 lg:mr-3">
          <div className="flex w-full justify-center space-x-2 text-center text-white lg:w-32">
            <div>
              <DatabaseIcon className="mt-0.5 h-5 w-5" />
            </div>
            <div>
              <p>1000</p>
            </div>
          </div>
          <div className="text-center text-xs ">Next upgrade: 1200</div>
        </div>

        {resources.map((resource, i) => (
          <div
            key={i}
            className="flex flex-col space-y-0.5 rounded-xl border-2 border-primary/60 bg-slate-700 p-3 lg:w-32"
          >
            <div className="flex w-full justify-center space-x-2 text-center text-white">
              <div>{resource.icon}</div>
              <div>
                <p>{resource.amount}</p>
              </div>
            </div>
            <progress
              className={`progress ${
                resource.amount === resourcesMaxStorage
                  ? "progress-error"
                  : "progress-success"
              } w-full px-1 `}
              value={resource.amount}
              max="1000"
            ></progress>
          </div>
        ))}

        <div className="flex flex-col rounded-xl border-2 border-primary/60 bg-slate-800 p-3 lg:mr-3">
          <div className="flex w-full justify-center space-x-2 text-center text-white lg:w-32">
            <div>
              <DatabaseIcon className="mt-0.5 h-5 w-5" />
            </div>
            <div>
              <p>1000</p>
            </div>
          </div>
          <div className="text-center text-xs ">Next upgrade: 1200</div>
        </div>

        <div className="flex flex-col space-y-0.5 rounded-xl border-2 border-primary/60 bg-slate-700 p-3 lg:w-32">
          <div className="flex w-full justify-center space-x-2 text-center text-white">
            <div>{wheat.icon}</div>
            <div>
              <p>{wheat.amount}</p>
            </div>
          </div>
          <progress
            className={`progress ${
              wheat.amount === resourcesMaxStorage
                ? "progress-error"
                : "progress-success"
            } w-full px-1`}
            value={wheat.amount}
            max="1000"
          ></progress>
        </div>
      </div>

      <div className="lg:px-8 xl:px-52 2xl:px-96">{children}</div>
    </div>
  );
}

export default VillageWrapper;
