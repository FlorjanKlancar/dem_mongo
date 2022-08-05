import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MAX_LEVEL_RESOURCES } from "../../gsVariables";
import { resourceField } from "../../types/resourceField";
import { CogIcon, LibraryIcon } from "@heroicons/react/outline";
import ResourcesMaxLevelModal from "./ResourcesMaxLevelModal";
import ResourcesModal from "./ResourcesModal";
import Modal from "../Modal/Modal";
import Link from "next/link";
import { villageModel } from "../../types/villageModel";
import { useNextAuth } from "../../hooks/useNextAuth";
import { buildingModel } from "../../types/buildingModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResourcesFieldProps = {
  villageData: villageModel;
  gsBuildings: buildingModel[];
};

function ResourcesField({ villageData, gsBuildings }: ResourcesFieldProps) {
  const { session }: any = useNextAuth();
  const queryClient = useQueryClient();

  const [clickedResource, setClickedResource] = useState<any>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onResourceClickHandler = (id: number, level: number, type: string) => {
    const resourceNextLevelInfo: any = Object.values(gsBuildings).find(
      (val: any) => {
        if (val.type === type) return val;
      }
    );

    setClickedResource({
      id,
      level,
      name: resourceNextLevelInfo?.name,
      image: resourceNextLevelInfo?.image,
      description: resourceNextLevelInfo?.description,
      levels: resourceNextLevelInfo?.levels,
      type,
    });

    if (type !== "village_center") setOpen(true);

    if (level < MAX_LEVEL_RESOURCES) {
      checkResources(resourceNextLevelInfo?.levels[0][level + 1]);
    }
  };

  const upgradeHandler = async () => {
    setOpen(false);
    const upgradeToast = toast.loading("Upgrading...");
    const response: any = await axios.post(`api/build/buildings`, {
      villageId: session.user.uid,
      buildingName: clickedResource.type,
      fieldId: clickedResource.id,
      isBuilding: false,
    });

    if (response.status === 200) {
      toast.success("Upgrade started successfully!", { id: upgradeToast });
    } else {
      toast.error("Unable to upgrade...", { id: upgradeToast });
    }
  };

  const checkResources = async (resourceNextLevelInfo: any) => {
    if (
      resourceNextLevelInfo &&
      (resourceNextLevelInfo.costWood >
        villageData.resourcesStorage.woodAmount ||
        resourceNextLevelInfo.costClay >
          villageData.resourcesStorage.clayAmount ||
        resourceNextLevelInfo.costIron >
          villageData.resourcesStorage.ironAmount ||
        resourceNextLevelInfo.costWheat >
          villageData.resourcesStorage.wheatAmount)
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const mutation = useMutation(upgradeHandler, {
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: async () => {
      /*   toast.success("Upgrade started successfully!"); */
      await queryClient.invalidateQueries(["village"]);
    },
  });

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div className="space-y-2 sm:px-4">
          <div>
            <h3 className="text-center text-lg font-bold text-primary sm:text-left">
              {clickedResource.name}
            </h3>
          </div>

          <div className="">
            <p className="text-xs sm:text-sm">{clickedResource.description}</p>
          </div>

          {clickedResource.level + 1 > MAX_LEVEL_RESOURCES ? (
            <ResourcesMaxLevelModal clickedResource={clickedResource} />
          ) : (
            <ResourcesModal clickedResource={clickedResource} />
          )}

          <div className="grid w-full grid-cols-3 space-x-3">
            <div>
              <button
                className="mt-5 w-full rounded-lg bg-slate-500 py-2 text-center font-bold text-white hover:bg-slate-600 hover:text-slate-200 "
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="col-span-2">
              <button
                className="primary_button"
                onClick={() => mutation.mutate()}
                type="submit"
                disabled={
                  clickedResource.level + 1 > MAX_LEVEL_RESOURCES
                    ? true
                    : false || isButtonDisabled
                    ? true
                    : false || villageData.currentlyBuilding.length
                    ? true
                    : false
                }
              >
                {clickedResource.level + 1 > MAX_LEVEL_RESOURCES
                  ? "Building is max level!"
                  : isButtonDisabled
                  ? "Not enough resources!"
                  : villageData.currentlyBuilding.length
                  ? "Builders are unavailable!"
                  : "Upgrade"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="grid max-h-[500px] w-full grid-cols-4 sm:grid-cols-4 md:w-9/12">
        {villageData.resourceFields.map((resource: resourceField) => (
          <div key={resource.id}>
            <div
              className={`relative cursor-pointer rounded-xl  border-slate-800/10 hover:border-slate-800/40 ${
                resource.type === "village_center" ? "" : "border-2"
              } `}
              onClick={() =>
                onResourceClickHandler(
                  resource.id,
                  resource.level,
                  resource.type
                )
              }
            >
              <div className="relative h-20 w-24 sm:h-28 sm:w-32 md:h-32 md:w-40">
                {resource.imageGrid &&
                  (resource.type === "village_center" ? (
                    <Link href="/village">
                      <a>
                        <div className=" relative flex h-full w-full items-center justify-center">
                          <Image
                            src="https://firebasestorage.googleapis.com/v0/b/app-deus-ex-machina.appspot.com/o/Big_empty_03.png?alt=media&token=2b953da6-1176-474e-8d22-94c471ce2ddd"
                            alt={resource.type}
                            layout="fill"
                            priority
                          />

                          <div className="absolute">
                            <div className="tooltip" data-tip="Go to Village">
                              <LibraryIcon className="  h-12 w-12 text-slate-600/80" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ) : (
                    <Image
                      src={resource.imageGrid}
                      alt={resource.type}
                      layout="fill"
                      priority
                    />
                  ))}
              </div>

              {resource.level && (
                <div className="absolute bottom-2 right-2 rounded-full border-2 border-primary/50 bg-white px-2  text-black">
                  {resource.level}
                </div>
              )}

              {villageData.currentlyBuilding.length &&
              villageData.currentlyBuilding[0].fieldId === resource.id ? (
                <div className="absolute top-2 left-2 animate-spin text-black">
                  <CogIcon className="h-6 w-6" />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResourcesField;
