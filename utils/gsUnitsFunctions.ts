import Unit from "../mongoose/Unit";

const getAllUnits = async () => {
  const response = await Unit.find({});

  return response;
};

export {getAllUnits};
