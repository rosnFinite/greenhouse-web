import { cert } from "firebase-admin/app";

export const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_ADMIN_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_ADMIN_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_ADMIN_FIREBASE_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
  }),
  databaseURL:
    "https://smart-ge-default-rtdb.europe-west1.firebasedatabase.app",
};
