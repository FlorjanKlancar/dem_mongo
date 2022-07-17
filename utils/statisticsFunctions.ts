import Village from "../mongoose/Village";

const getAllStatistics = async () => {
  const villageResponse = await Village.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userFields",
      },
    },
    {
      $project: {
        population: 1,
        createdAt: 1,
        userId: 1,
        "userFields._id": 1,
        "userFields.displayName": 1,
        "userFields.heroIcon": 1,
      },
    },
    {$sort: {population: -1}},
  ]);

  return villageResponse;
};

export {getAllStatistics};
