import {createContext, useContext, Context} from "react";
import useFirebaseAuth from "../firebase/useFirebaseAuth";

const authUserContext = createContext<any>({
  authUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

type AuthUserProviderProps = {
  children: React.ReactNode;
};

export function AuthUserProvider({children}: AuthUserProviderProps) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
