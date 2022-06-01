import React, {useEffect, useState} from "react";
import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/clientApp";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import Link from "next/link";
import RegisterComponent from "./RegisterComponent";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [register, setRegister] = useState(false);
  const [user, loading] = useAuthState(auth);

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

  const onSubmitRegister = (event: any) => {
    if (passwordOne === passwordTwo)
      registerWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          console.log("Success. The user is created in Firebase");
          router.push("/resources");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          console.log(error.message);
        });
    else console.log("Password do not match");
    event.preventDefault();
  };

  return (
    <>
      {!register ? (
        <div className="flex h-screen w-full items-center justify-center px-2">
          <div className="flex w-full flex-col rounded-xl bg-slate-800 md:w-1/2">
            <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
              <p className="pt-5 text-center text-3xl">Welcome to play.dem</p>
              <p className="text-center">Login form</p>
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
                    value={passwordOne}
                    onChange={(e) => setPasswordOne(e.target.value)}
                    placeholder="Password"
                    className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>

                <input
                  onClick={() =>
                    logInWithEmailAndPassword({
                      auth,
                      email,
                      password: passwordOne,
                    })
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
                  <button onClick={() => setRegister(true)}>
                    <span className="cursor-pointer font-semibold underline">
                      Register
                    </span>
                  </button>{" "}
                  now.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RegisterComponent
          email={email}
          setEmail={setEmail}
          passwordOne={passwordOne}
          setPasswordOne={setPasswordOne}
          passwordTwo={passwordTwo}
          setPasswordTwo={setPasswordTwo}
          setRegister={setRegister}
          onSubmitRegister={onSubmitRegister}
        />
      )}
    </>
  );
}
export default Login;
