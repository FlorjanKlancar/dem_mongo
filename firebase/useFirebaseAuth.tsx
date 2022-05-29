import {useState, useEffect} from "react";
import {app, auth} from "./clientApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type AuthUser = {
  uid: string;
  email: string;
};
type signInUser = {
  email: string;
  password: string;
};

const formatAuthUser = (user: AuthUser) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = async ({email, password}: signInUser) =>
    await signInWithEmailAndPassword(auth, email, password);

  const signUp = async ({email, password}: signInUser) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => auth.signOut().then(clear);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
