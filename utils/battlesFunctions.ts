import Battle from "../mongoose/Battle";

const getBattlesByUserId = async (userId: string) => {
  const battles = await Battle.find({
    $or: [
      {
        playerOne: userId,
      },
      {
        playerTwo: userId,
      },
    ],
  }).sort({createdAt: -1});

  const filterUnReadBattles = battles.filter((battle) => battle.newReport);

  return {battles, newReports: filterUnReadBattles.length};
};

export {getBattlesByUserId};
