import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import { firebaseConfig } from "./firebase-config";

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
