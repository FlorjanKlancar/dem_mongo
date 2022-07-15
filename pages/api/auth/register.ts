import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import User from "../../../mongoose/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:

    case "POST":
      {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(500).send("Please provide required values!");
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
          return res.status(500).send("This email already exists!");
        }
        const user = await User.create({
          email,
          password,
          authType: "Credentials",
          heroIcon: "https://wallpaperaccess.com/full/167765.jpg",
        });

        user.password = undefined;
        res.status(201).json({
          user,
        });
      }
      break;
  }
}
