/* eslint-disable no-console */
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

import { firebaseAdminConfig } from "./firebase-admin-config";

export default function adminInitApp() {
  if (admin.apps.length <= 0) {
    admin.initializeApp(firebaseAdminConfig);
  }
}

adminInitApp();

const firestore = getFirestore();
const auth = admin.auth();

export { firestore, auth };
