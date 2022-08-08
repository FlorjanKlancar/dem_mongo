import Queue from "../mongoose/Queue";

const checkIfUserIsInQueue = async (userId: string) => {
  const userInQ = await Queue.findOne({ userId: userId });

  return userInQ;
};

export { checkIfUserIsInQueue };
