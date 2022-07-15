import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET":
      {
        let { id } = req.query;
        if (!id) {
          res.status(404).send("No id!");
        }

        try {
          const response = await axios.get(
            `${process.env.NODE_JS_URI}/village/${id}`
          );

          if (response.status === 200) {
            return res.status(200).json(response.data);
          } else {
            return res.status(404).send("Village not found!");
          }
        } catch (error) {
          res.status(500).send({ error: "failed to fetch data" });

          throw new Error("Internal Server Error");
        }
      }

      break;

    case "POST":
      {
        const { id } = req.query;

        const response = await axios.post(
          `${process.env.NODE_JS_URI}/village`,
          {
            userId: id,
          }
        );

        if (response.status === 201) {
          res.status(201).send(response.data);
        } else {
          res.status(400).send("Error");
        }
      }
      break;
  }
}
