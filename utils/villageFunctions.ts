import { connectDB } from "../lib/mongodb";
import Village from "../mongoose/Village";
import { createUnits } from "./populateData/createUnits";
import { newVillage } from "./populateData/createVillage";
import { updateVillageToDate } from "./utilFunctions";

connectDB();

const createVillage = async (userId: string) => {
  const checkVillages = await Village.findOne({
    userId: userId,
  });
  if (checkVillages) {
    return { status: 500, msg: "Your village already exists!" };
  }

  const allUnits = createUnits.map((unit) => {
    return {
      name: unit.unitName,
      amount: 5,
      level: 0,
    };
  });

  const village = new Village({
    ...newVillage,
    units: allUnits,
    elo: 100,
    userId,
  });

  village.save();

  return { status: 201, village };
};

const getVillageById = async (userId: string) => {
  if (!userId) {
    return { status: 400, msg: "No userId" };
  } else {
    await updateVillageToDate(userId.toString());

    const villageResponse = await Village.findOne({
      userId: userId.toString(),
    });

    return { status: 200, villageResponse };
  }
};

export { createVillage, getVillageById };
