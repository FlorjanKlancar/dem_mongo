import User from "../mongoose/User";
import Village from "../mongoose/Village";

const getUserById = async (userId: string) => {
  const user = await User.findOne({_id: userId});

  if (!user) {
    return {status: 404, msg: "User not found"};
  }

  const villages = await Village.find({})
    .select({
      population: 1,
      createdAt: 1,
      userId: 1,
    })
    .sort({population: -1});

  const getUserPositionOnLadder = villages.findIndex(
    (village) => village.userId.toString() === user._id.toString()
  );

  return {
    status: 200,
    user,
    villageResponse: villages[getUserPositionOnLadder],
    positionOnLadder: getUserPositionOnLadder + 1,
  };
};

const updateUser = async (
  userId: string,
  displayName: string,
  heroIcon: string
) => {
  const user = await User.findOne({_id: userId});

  if (!user) {
    return {status: 404, msg: "User not found"};
  }

  if (displayName && displayName.length) {
    user.displayName = displayName;
  }
  if (heroIcon && heroIcon.length) {
    user.heroIcon = heroIcon;
  }

  const updatedUser = await user.save();

  return {
    status: 200,
    updatedUser,
  };
};

export {getUserById, updateUser};
