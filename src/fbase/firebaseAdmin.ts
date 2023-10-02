/* eslint-disable no-console */
import * as admin from "firebase-admin";

import { firebaseAdminConfig } from "./firebase-admin-config";

export default function adminInitApp() {
  if (admin.apps.length <= 0) {
    admin.initializeApp(firebaseAdminConfig);
  }
}

adminInitApp();

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
