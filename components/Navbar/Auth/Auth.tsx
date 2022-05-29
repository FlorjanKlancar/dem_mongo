import Head from "next/head";
import {auth} from "../../../firebase/clientApp";
import {useEffect} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../store/auth-slice";
import {RootState} from "../../../types/storeModel";
export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response: any) => {
        dispatch(authActions.logIn({token: response.user.accessToken}));
        router.push("/resources");
      })
      .catch((err) => {
        alert("Cannot Log in");
      });
  };

  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    dispatch(authActions.logIn({token}));

    /* if (token) {
      router.push("/resources");
    } */
  }, [token]);

  return (
    <div>
      <Head>
        <title>Next CRUD AUTH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Login</h1>

        <input
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email"
        />
        <input
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
        />

        <button onClick={signIn}>Sign In</button>
      </main>
    </div>
  );
}
