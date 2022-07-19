import { NextApiRequest, NextApiResponse } from "next";
import { getUserById, updateUser } from "../../../../utils/userInfoFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:

    case "PUT":
      {
        const { userId } = req.query;
        const { heroIcon, displayName } = req.body;

        if (userId) {
          const updatedUser = await updateUser(
            userId.toString(),
            displayName,
            heroIcon
          );

          if (updatedUser.status === 200) {
            res.status(updatedUser.status).send(updatedUser.updatedUser);
          } else {
            res.status(updatedUser.status).send(updatedUser.msg);
          }
        } else res.status(400).send("Parameters missing");
      }
      break;

    case "GET":
      {
        const { userId } = req.query;

        if (userId) {
          const user = await getUserById(userId.toString());

          if (user.status === 200) {
            res.status(200).send(user);
          } else {
            res.status(400).send("Error");
          }
        } else res.status(400).send("Parameters missing");
      }
      break;
  }
}
