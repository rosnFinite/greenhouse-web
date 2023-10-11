import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { firestore } from "fbase/firebaseAdmin";

const UserDataSchema = z.object({
  uid: z.string(),
  displayName: z.string().optional(),
  email: z.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // validate request body
    const validatedRequest = UserDataSchema.safeParse(req.body);
    if (!validatedRequest.success) {
      const { errors } = validatedRequest.error;
      return res.status(422).json({
        error: { message: "Unprocessable content", errors },
      });
    }
    // check if user is already stored in firestore
    const userDocRef = firestore.collection("users").doc(req.body.uid);
    const userDoc = await userDocRef.get();
    // If user is NOT already stored in firestore => store uid, displayName and email under docID = uid and add field for linked devices
    if (!userDoc.exists) {
      req.body.devices = [];
      firestore.collection("users").doc(req.body.uid).set(req.body);
      return res.status(200).send({ message: "Success: User added to DB" });
    }
    return res.status(403).json({ message: "Error: User already exists" });
  }
  res.setHeader("Allow", ["POST"]);
  return res
    .status(405)
    .json({ message: `Error: Method ${req.method} not allowed` });
}

export default handler;
