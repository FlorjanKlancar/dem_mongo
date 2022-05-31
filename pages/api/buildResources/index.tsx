// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb, firebaseAdmin } from "../../../firebase/serverApp";
import { getServerTime, updateResourcesToDate } from "../gameFunctions";
import { getBuildingById } from "../gsBuildings/[id]";
import { getVillageById } from "../village/[id]";
const schedule = require("node-schedule");
var dayjs = require("dayjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "POST": {
      {
        try {
          if (!req.headers.authorization)
            return res.status(400).send("Token error!");

          const jwtToken = req.headers.authorization.split(" ")[1];

          const token = await firebaseAdmin.auth().verifyIdToken(jwtToken);

          if (token) {
            const villageId = req.body.villageId;
            const buildingName = req.body.buildingName;
            const fieldId = req.body.fieldId;
            const isBuilding = req.body.isBuilding;
            const cancleJob = req.body.cancleJob;

            const docRef = adminDb.collection("village").doc(villageId);

            if (cancleJob && Object.keys(schedule.scheduledJobs).length !== 0) {
              var my_job = schedule.scheduledJobs[buildingName];
              my_job.cancel();

              console.log("cancled job!");
              docRef.update({
                currentlyBuilding: [],
              });

              return res
                .status(200)
                .json({ msg: "Job canceled successfully!" });
            } else {
              if (!villageId || !buildingName || !fieldId) {
                throw new Error("Parameters are missing!");
              }

              const buildingObject: any = await getBuildingById(buildingName);
              const villageObject = await getVillageById(villageId);

              if (buildingObject.status === 404) {
                throw new Error("Building not found!");
              }

              if (villageObject) {
                if (villageObject.currentlyBuilding.length) {
                  throw new Error("Builders are currently unavailable!");
                }

                const getBuildingCurrentLevel = (
                  isBuilding === true
                    ? villageObject.villageBuildings
                    : villageObject.resourceFields
                ).find((building: any) => building.id === fieldId);

                if (getBuildingCurrentLevel === undefined) {
                  throw new Error("Building not found!");
                }

                const getBuildingNextLevel =
                  buildingObject[0].levels[0][
                    `${getBuildingCurrentLevel.level + 1}`
                  ];

                if (!getBuildingNextLevel) {
                  throw new Error("Building is max level!");
                }

                if (
                  getBuildingCurrentLevel.type !== "empty_field" &&
                  getBuildingCurrentLevel?.type !== buildingName
                ) {
                  throw new Error("Wrong buildingId type in request!");
                }

                const villageCurrentResources = await updateResourcesToDate(
                  villageObject,
                  villageId
                );

                console.log("villageCurrentResources", villageCurrentResources);

                const buildingBuildTime = getBuildingNextLevel.timeToBuild;
                const buildingResourcesNeeded = {
                  wood: getBuildingNextLevel.costWood,
                  clay: getBuildingNextLevel.costClay,
                  iron: getBuildingNextLevel.costIron,
                  wheat: getBuildingNextLevel.costWheat,
                };

                console.log(
                  "villageCurrentResources!.wood  buildingResourcesNeeded.wood",
                  villageCurrentResources!.wood,
                  buildingResourcesNeeded.wood
                );

                if (
                  villageCurrentResources!.resourcesStorage.woodAmount <
                    buildingResourcesNeeded.wood ||
                  villageCurrentResources!.resourcesStorage.clayAmount <
                    buildingResourcesNeeded.clay ||
                  villageCurrentResources!.resourcesStorage.ironAmount <
                    buildingResourcesNeeded.iron ||
                  villageCurrentResources!.resourcesStorage.wheatAmount <
                    buildingResourcesNeeded.wheat
                )
                  return res.status(400).send("Not enough resources!");

                const currentTime = await getServerTime();
                const endBuildTime = dayjs(currentTime)
                  .add(buildingBuildTime, "s")
                  .toDate();

                let updatedObject = {};

                const iteration =
                  isBuilding === true
                    ? villageObject.villageBuildings
                    : villageObject.resourceFields;

                updatedObject = iteration.map((item: any) => {
                  if (item.id === fieldId) {
                    return {
                      ...item,
                      level: getBuildingCurrentLevel.level + 1,
                      imageGrid: getBuildingNextLevel.image
                        ? getBuildingNextLevel.image
                        : buildingObject[0].image,
                      ...(isBuilding === true && {
                        type: buildingName,
                      }),
                      ...(buildingObject[0].description && {
                        description: buildingObject[0].description,
                      }),
                    };
                  } else {
                    return item;
                  }
                });

                console.log(
                  "buildingResourcesNeeded.wood",
                  buildingResourcesNeeded.wood,
                  "villageCurrentResources!.wood",
                  villageCurrentResources!.wood
                );

                const resourcesStorageMinus = {
                  woodAmount:
                    villageCurrentResources!.resourcesStorage.woodAmount -
                    buildingResourcesNeeded.wood,
                  clayAmount:
                    villageCurrentResources!.resourcesStorage.clayAmount -
                    buildingResourcesNeeded.clay,
                  ironAmount:
                    villageCurrentResources!.resourcesStorage.ironAmount -
                    buildingResourcesNeeded.iron,
                  wheatAmount:
                    villageCurrentResources!.resourcesStorage.wheatAmount -
                    buildingResourcesNeeded.wheat,
                };

                console.log("resourcesStorageMinus", resourcesStorageMinus);

                const buildingNamePrefix = buildingName.split("_");

                docRef.update({
                  currentlyBuilding: [
                    {
                      buildingId: buildingName,
                      currentlyBuildingLevel: getBuildingCurrentLevel.level + 1,
                      fieldId,
                      endBuildTime,
                    },
                  ],
                  resourcesStorage: resourcesStorageMinus,
                });
                console.log("Added currently building and reduced resources!");

                const job = schedule.scheduleJob(
                  buildingName,
                  endBuildTime,
                  function () {
                    console.log("Execute update!");

                    const docRef = adminDb.collection("village").doc(villageId);

                    docRef.update({
                      currentlyBuilding: [],
                      population:
                        villageObject.population +
                        getBuildingNextLevel.populationAdd,

                      ...(isBuilding === true
                        ? { villageBuildings: updatedObject }
                        : {
                            resourceFields: updatedObject,
                            [`${buildingNamePrefix[0]}ProductionPerH`]:
                              getBuildingNextLevel.productionAdd +
                              villageObject[
                                `${buildingNamePrefix[0]}ProductionPerH`
                              ],
                          }),
                    });
                  }
                );
              }

              return res
                .status(200)
                .json({ msg: "Request for upgrade in progress!" });
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
