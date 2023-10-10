/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { firestore } from "fbase/firebaseAdmin";

const DataSchema = z.object({
  temperature: z.number().min(0).max(100),
  humidity: z.number().min(0).max(100),
  water_level: z.number().positive(),
  soil_humidity_1: z.number(),
  soil_humidity_2: z.number(),
  soil_humidity_3: z.number(),
});

// eslint-disable-next-line sonarjs/cognitive-complexity
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      console.log(req.headers.apikey);
      const apiKey = req.headers.apikey as string;
      console.log(apiKey);
      console.log(req.body);
      try {
        const deviceDocRef = firestore.collection("devices").doc(apiKey);
        const deviceDoc = await deviceDocRef.get();
        if (deviceDoc.exists) {
          const validatedRequest = DataSchema.safeParse(req.body);
          // If data does not conform to the schema
          if (!validatedRequest.success) {
            const { errors } = validatedRequest.error;
            return res.status(422).json({
              error: { message: "Unprocessable content", errors },
            });
          }
          // otherwise get data for provided apiKey/deviceId
          const dataDocRef = firestore.collection("data").doc(apiKey);
          const dataDoc = await dataDocRef.get();
          // update given data by appending values to corresponding list until maximum of previous 288 values are logged
          // 12 updates per hour -> in total 288 values for 24 hours
          // if no data has been stored for device create new document and store provided data
          if (!dataDoc.exists) {
            // transform data each property of received data into an array
            Object.keys(req.body).forEach((key) => {
              req.body[key] = [req.body[key]];
            });
            req.body.timestamp = new Date();
            firestore.collection("data").doc(apiKey).set(req.body);
          } else {
            const data = dataDoc.data();
            // check if for some reason data is undefined and return Code 500
            if (data === undefined) {
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
              if (data[key].length === 288) {
                data[key].shift();
              }
            });
            data.timestamp = new Date();
            await dataDocRef.update(data);
          }
          return res.status(200).json({ message: "Success!" });
        }
        return res.status(403).json({ message: "Device is not authorized" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error has occurred" });
      }
    }
    case "GET": {
      return res.status(501).json({ message: "Not implemented yet" });
    }
    default: {
      return res.status(501).json({ message: "Not implemented yet" });
    }
  }
}
