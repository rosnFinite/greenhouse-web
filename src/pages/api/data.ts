/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { firestore } from "fbase/firebaseAdmin";

const DataSchema = z.object({
  temperature: z.number().min(0).max(100),
  humidity: z.number().min(0).max(100),
  distance: z.number().min(0),
  is_water_empty: z.boolean(),
  soil_humidity_1: z.number(),
  soil_humidity_2: z.number(),
  soil_humidity_3: z.number(),
});

// eslint-disable-next-line sonarjs/cognitive-complexity
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const apiKey = req.headers.apikey as string;
    console.log(`POST from DeviceID: ${apiKey}`);
    console.log(req.body);
    try {
      const deviceDocRef = firestore.collection("devices").doc(apiKey);
      const deviceDoc = await deviceDocRef.get();
      if (deviceDoc.exists) {
        const validatedRequest = DataSchema.safeParse(req.body);
        // If data does not conform to the schema
        if (!validatedRequest.success) {
          const { errors } = validatedRequest.error;
          console.log(
            `POST from DeviceID: ${apiKey}: Error, Unprocessable Content`
          );
          return res.status(422).json({
            error: { message: "Unprocessable content", errors },
          });
        }
        // TODO: CHANGE TO is_water_empty SOLUTION IN FUTURE
        const { a, ...bodyNew } = req.body;
        bodyNew.water_level = req.body.is_water_empty ? 0 : 1;
        req.body = bodyNew;
        // otherwise get data for provided apiKey/deviceId
        const dataDocRef = firestore.collection("data").doc(apiKey);
        const dataDoc = await dataDocRef.get();
        // update given data by appending values to corresponding list until maximum of previous 288 values are logged
        // 12 updates per hour -> in total 288 values for 24 hours
        // if no data has been stored for device create new document and store provided data
        if (!dataDoc.exists) {
          // transform data each property of received data into an array
          console.log(
            `POST from DeviceID: ${apiKey}: Successful, new device document created`
          );
          Object.keys(req.body).forEach((key) => {
            req.body[key] = [req.body[key]];
          });
          req.body.timestamp = new Date();
          firestore.collection("data").doc(apiKey).set(req.body);
        } else {
          const data = dataDoc.data();
          // check if for some reason data is undefined and return Code 500
          if (data === undefined) {
            console.log(`POST from DeviceID: ${apiKey}: Errro`);
            return res
              .status(500)
              .json({ message: "Error has occurred while updating data" });
          }
          // append new data to stored data until max is reached => then pop first value for each additional timestep
          Object.keys(data as object).forEach((key) => {
            if (key === "timestamp") {
              return;
            }
            data[key].push(req.body[key]);
            if (data[key].length === 144) {
              data[key].shift();
            }
          });
          console.log(
            `POST from DeviceID: ${apiKey}: Successful, stored device data`
          );
          data.timestamp = new Date();
          await dataDocRef.update(data);
        }
        return res.status(200).json({ message: "Success!" });
      }
      console.log(
        `POST from DeviceID: ${apiKey}: Error, provided deviceID was not found in database`
      );
      return res.status(403).json({ message: "Device is not authorized" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error has occurred" });
    }
  }
  if (req.method === "GET") {
    // get devices from user's device list
    console.log(`GET for UID: ${req.query.id}`);
    const userDocRef = firestore
      .collection("users")
      .doc(req.query.id as string);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      console.log(`GET for UID: ${req.query.id}: Error, user doc not found`);
      return res.status(404).json({ message: "User invalid" });
    }
    const userData = userDoc.data();
    // TODO expand to get data for multiple devices
    if (
      (userData?.devices.length === 1 && userData?.devices[0] === "") ||
      userData?.devices.length === 0
    ) {
      console.log(
        `GET for UID: ${req.query.id}: Error, user has no linked devices`
      );
      return res.status(404).json({ message: "Device does not exist" });
    }
    const dataDocRef = firestore
      .collection("data")
      .doc(userData?.devices[0] as string);
    const dataDoc = await dataDocRef.get();
    const data = dataDoc.data();
    console.log(`GET for UID: ${req.query.id}: Successful, data has been send`);
    return res.status(200).json(data);
  }
  res.setHeader("Allow", ["POST", "GET"]);
  return res
    .status(405)
    .json({ message: `Error: Method ${req.method} not allowed` });
}
