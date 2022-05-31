import {
  DatabaseIcon,
  HandIcon,
  LightningBoltIcon,
  ScaleIcon,
  StarIcon,
} from "@heroicons/react/outline";
import React from "react";

function VillageSkeleton() {
  const resources = [
    {
      icon: <HandIcon className="mt-0.5 h-5 w-5" />,
      amount: 0,
    },
    {
      icon: <LightningBoltIcon className="mt-0.5 h-5 w-5" />,
      amount: 0,
    },
    {
      icon: <ScaleIcon className="mt-0.5 h-5 w-5" />,
      amount: 0,
    },
  ];

  const wheat = {
    icon: <StarIcon className="mt-0.5 h-5 w-5" />,
    amount: 0,
  };

  return (
    <>
      <div className="mt-5 px-6 sm:px-12 md:px-20 ">
        <div className="resource_bar">
          <div className="flex flex-col rounded-xl border-2 border-primary/60 bg-slate-800 p-3 lg:mr-3 ">
            <div className="flex w-full justify-center space-x-2 text-center text-white lg:w-32">
              <div>
                <DatabaseIcon className="mt-0.5 h-5 w-5" />
              </div>
              <div className="h-5 w-16 animate-pulse  rounded-full bg-slate-600"></div>
            </div>
            <div className="mt-1 h-4 w-full animate-pulse items-center  rounded-full bg-slate-600"></div>
          </div>

          {resources.map((resource, i) => (
            <div
              key={i}
              className="flex flex-col space-y-0.5 rounded-xl border-2 border-primary/60 bg-slate-700 p-3 lg:w-32"
            >
              <div className="flex w-full justify-center space-x-2 text-center text-white">
                <div>{resource.icon}</div>
                <div className="h-5 w-16 animate-pulse  rounded-full bg-slate-600"></div>
              </div>
              <div className="mt-1 h-4 w-full animate-pulse items-center  rounded-full bg-slate-600"></div>
            </div>
          ))}

          <div className="flex flex-col rounded-xl border-2 border-primary/60 bg-slate-800 p-3 lg:mr-3 ">
            <div className="flex w-full justify-center space-x-2 text-center text-white lg:w-32">
              <div>
                <DatabaseIcon className="mt-0.5 h-5 w-5" />
              </div>
              <div className="h-5 w-16 animate-pulse  rounded-full bg-slate-600"></div>
            </div>
            <div className="mt-1 h-4 w-full animate-pulse items-center  rounded-full bg-slate-600"></div>
          </div>

          <div className="flex flex-col space-y-0.5 rounded-xl border-2 border-primary/60 bg-slate-700 p-3 lg:w-32">
            <div className="flex w-full justify-center space-x-2 text-center text-white">
              <div>{wheat.icon}</div>
              <div className="h-5 w-16 animate-pulse  rounded-full bg-slate-600"></div>
            </div>
            <div className="mt-1 h-4 w-full animate-pulse items-center  rounded-full bg-slate-600"></div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 xl:px-52 2xl:px-96">
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-12 md:space-y-0">
          <div
            className={`h-72 w-full animate-pulse rounded-xl border-2 border-slate-800/10  bg-slate-800/50  `}
          ></div>

          <div className="hidden w-full flex-col space-y-4 sm:flex md:w-3/12">
            <div className="rounded-xl bg-slate-800/80 p-5 text-center text-gray-200">
              <div>Production per hour</div>
              <hr className="text-gray-200" />

              <div className="mt-2 flex w-full flex-col space-y-3"></div>
            </div>

            <div className="rounded-xl bg-slate-800/80 p-5 text-center text-gray-200">
              <div>Troops</div>
              <hr className="text-gray-200" />

              <div className="mt-2 flex w-full flex-col space-y-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VillageSkeleton;
