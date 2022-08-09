import Building from "../mongoose/Building";

const getBuildingById = async (buildingId: string) => {
  const response = await Building.findOne({ type: buildingId });

  return response;
};

const getAllBuildings = async () => {
  const response = await Building.find({});

  return response;
};

export { getBuildingById, getAllBuildings };
