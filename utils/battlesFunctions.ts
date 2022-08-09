import Battle from "../mongoose/Battle";

const getBattlesForUser = async (userId: string) => {
  const battles = await Battle.find({
    $or: [
      {
        playerOne: userId,
      },
      {
        playerTwo: userId,
      },
    ],
  }).sort({ createdAt: -1 });

  const filterUnReadBattles = battles.filter((battle) => battle.newReport);

  return { battles, newReports: filterUnReadBattles.length };
};

const getBattleById = async (battleId: string) => {
  const battle = await Battle.findOneAndUpdate(
    {
      _id: battleId,
    },
    {
      newReport: false,
    }
  );

  return battle;
};

export { getBattlesForUser, getBattleById };
