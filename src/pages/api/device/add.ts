/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next/types";
import { z } from "zod";

import { firestore } from "fbase/firebaseAdmin";

const LinkingSchema = z.object({
  uid: z.string(),
  deviceId: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  if (req.method === "POST") {
    // validate req body => resturn 422 if not valid
    const validatedRequest = LinkingSchema.safeParse(req.body);
    if (!validatedRequest.success) {
      const { errors } = validatedRequest.error;
      return res.status(422).json({
        error: { message: "Unprocessable content", errors },
      });
    }
    const userDocRef = firestore.collection("users").doc(req.body.uid);
    const userDoc = await userDocRef.get();
    const deviceDocRef = firestore.collection("devices").doc(req.body.deviceId);
    const deviceDoc = await deviceDocRef.get();
    // check if provided uid and deviceId exist
    if (!userDoc.exists || !deviceDoc.exists) {
      // 422 if one or both are do not exist in firestore
      return res.status(422).json({ message: "Error: No match found" });
    }
    // link device to uid and add deviceId to user.devices
    // here we need to check if deviceId already has a linked user => deny request
    const deviceData = deviceDoc.data();
    const userData = userDoc.data();
    if (deviceData !== undefined && deviceData.user !== "") {
      console.log("Device already linked");
      return res
        .status(400)
        .send({ message: "Error: Device already linked to a user" });
    }
    // update user.devices and device.user
    await deviceDocRef.update({ user: req.body.uid });
    // if user.devices is empty create a new device list with newly added device as only entry
    if (userData?.devices === undefined) {
      await userDocRef.update({
        devices: [req.body.deviceId],
      });
    } else {
      userData?.devices.push(req.body.deviceId);
      await userDocRef.update({
        devices: userData?.devices,
      });
    }
    return res
      .status(200)
      .json({ message: "Success: Device was successfully linked" });
  }
  res.setHeader("Allow", ["POST"]);
  return res
    .status(405)
    .json({ message: `Error: Method ${req.method} not allowed` });
}
