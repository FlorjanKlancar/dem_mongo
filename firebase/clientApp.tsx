import axios from "axios";
import { getApps, getApp, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

type registrationProps = {
  auth?: any;
  email: string;
  password?: string | undefined;
};

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
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async ({
  auth,
  email,
  password,
}: registrationProps) => {
  try {
    await signInWithEmailAndPassword(auth, email, password!);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password!);

    const response = await axios.post(`/api/village/${res.user.uid}`, {
      userEmail: res.user.email,
    });
  } catch (err: any) {
    console.error("err from here", err);
    alert(err.message);
  }
};

const sendPasswordReset = async ({ email }: registrationProps) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  app,
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
