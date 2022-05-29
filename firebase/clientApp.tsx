import {getAuth} from "firebase/auth";
import {getApps, getApp, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE}`,
  authDomain: `${process.env.NEXT_PUBLIC_FB_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FB_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FB_STORAGE}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_SENDER}`,
  appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Use these for db & auth
const db = getFirestore();
const auth = getAuth();

export {app, db, auth};
