import Unit from "../mongoose/Unit.js";

const getAllUnits = async () => {
  const response = await Unit.find({});

  return response;
};

export {getAllUnits};
