import React, { useEffect, useState } from "react";

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/router";
import Link from "next/link";
function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push("/resources");
  }, [user, loading]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center ">
        <div className="flex w-full flex-col rounded-xl bg-slate-800 md:w-1/2">
          <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <p className="pt-5 text-center text-3xl">Welcome.</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={submitHandler}
            >
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>

              <input
                onClick={() =>
                  logInWithEmailAndPassword({ auth, email, password })
                }
                type="submit"
                value="Log In"
                className="mt-8 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700"
              />
              <button onClick={signInWithGoogle}>Login with Google</button>
            </form>
            <div className="pt-12 pb-12 text-center ">
              <div>
                <Link href="/reset">Forgot Password</Link>
              </div>
              <div>
                Don&apos;t have an account?{" "}
                <Link href="/register">
                  <span className="cursor-pointer font-semibold underline">
                    Register
                  </span>
                </Link>{" "}
                now.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
