// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "POST":
      {
        const { email, password } = req.body;

        try {
          const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_WEB_API_KEY}`,
            {
              email: "klancar.florjan99@gmail.com",
              password: "blabla",
              returnSecureToken: true,
            }
          );

          res.status(200).json(response.data);
        } catch (e) {
          console.log(e);
          return res.status(500).send(e);
        }
      }

      break;
  }
}
