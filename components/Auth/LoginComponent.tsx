import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RegisterComponent from "./RegisterComponent";
import axios from "axios";
import { providerModel } from "../../types/providerModel";
import { signIn } from "next-auth/react";

type LoginComponentProps = {
  providers: providerModel[];
};

function LoginComponent({ providers }: LoginComponentProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [register, setRegister] = useState(false);

  /* useEffect(() => {
    router.push("/resources");
  }, [user, loading]); */

  const submitHandler = async (e: any) => {
    e.preventDefault();
  };

  const onSubmitRegister = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      {!register ? (
        <div className="flex h-screen w-full items-center justify-center px-2">
          <div className="flex w-full flex-col rounded-xl bg-slate-800 md:w-1/2">
            <div className="my-auto flex flex-col justify-center space-y-4 px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
              <p className="pt-5 text-center text-3xl">Welcome to play.dem</p>
              <p className="text-center text-lg">Login form</p>
              <p className="text-center underline decoration-primary underline-offset-4">
                At the moment only Sign in with Google is available... Sorry for
                inconvenience
              </p>
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
                    disabled
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
                    disabled
                    type="password"
                    id="password"
                    value={passwordOne}
                    onChange={(e) => setPasswordOne(e.target.value)}
                    placeholder="Password"
                    className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled
                  className="mt-8 cursor-pointer bg-primary p-2 text-lg font-bold text-white hover:bg-primary/80 disabled:bg-primary/50 hover:disabled:cursor-not-allowed	"
                >
                  Log In
                </button>
              </form>

              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <div>
                    <button
                      className="mt-2 w-full cursor-pointer bg-primary p-2 text-lg font-bold text-white hover:bg-primary/80"
                      onClick={() =>
                        signIn(provider.id, { callbackUrl: "/resources" })
                      }
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-12 pb-12 text-center ">
                <div>
                  {/* <Link href="/reset"> */}Forgot Password{/* </Link> */}
                </div>
                <div>
                  Don&apos;t have an account?{" "}
                  <button /* onClick={() => setRegister(true)} */>
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
export default LoginComponent;
