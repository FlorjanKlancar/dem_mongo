import React, { useState } from "react";
import TitleImg from "../../public/assets/Napis.png";
import LoginBackgroundImg from "../../public/assets/Ozadje_01.png";
import LogoImg from "../../public/assets/Logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import googleSignIn from "../../public/assets/btn_google_light_normal.svg";
import ProviderButton from "./ProviderButton";
import { providerModel } from "../../types/providerModel";
import axios from "axios";
import Spinner from "../Widgets/Spinner";

type LoginComponentProps = {
  providers?: any;
  isRegisterPage: boolean;
};

function NewLogin({ providers, isRegisterPage }: LoginComponentProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setError("");

    const response: any = await signIn("credentials", {
      email: email,
      password: passwordOne,
      redirect: false,
      callbackUrl: `/resources`,
    });

    if (response?.error) {
      setError(response?.error);
    }

    if (response.status === 200) {
      router.push("/resources");
    }
  };

  const registerHandler = async (e: any) => {
    e.preventDefault();
    setError("");

    if (passwordOne !== passwordTwo) {
      setError("Passwords must match!");
      return;
    }

    try {
      setIsLoading(true);
      const response: any = await axios.post("/api/auth/register", {
        email,
        password: passwordOne,
      });

      if (response.status === 201) {
        const signInResponse: any = await signIn("credentials", {
          email: email,
          password: passwordOne,
          redirect: false,
          callbackUrl: `/resources`,
        });

        router.push("/new-user");
      }

      setIsLoading(false);
    } catch (e: any) {
      setError(e.response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-full items-center justify-center p-5">
        <div className="relative flex h-[690px] w-full flex-col items-center justify-center bg-slate-800 md:w-[568px]">
          <Image
            src={LoginBackgroundImg}
            layout="fill"
            quality={100}
            className="opacity-90"
          />
          <div className="absolute flex flex-col items-center justify-center space-y-12">
            <div className="relative h-36 w-36">
              <Image src={LogoImg} quality={100} layout="fill" />
            </div>
            <div>
              <Image src={TitleImg} quality={100} />
            </div>
          </div>
        </div>

        <div className="relative h-[690px] bg-slate-800">
          <div className="mx-12 my-4 flex flex-col justify-center space-y-4 md:justify-start ">
            <p className=" text-center text-3xl">Welcome to play.dem</p>
            <p className="text-center text-lg">Login form</p>

            <form
              className="mx-12 flex flex-col  pt-3 md:pt-8"
              onSubmit={isRegisterPage ? registerHandler : submitHandler}
            >
              <div className="flex flex-col ">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  disabled
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordOne}
                  onChange={(e) => setPasswordOne(e.target.value)}
                  required
                  placeholder="Password"
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  disabled
                />
              </div>

              {isRegisterPage && (
                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="text-lg">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={passwordTwo}
                    required
                    onChange={(e) => setPasswordTwo(e.target.value)}
                    placeholder="Password"
                    className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                    disabled
                  />
                </div>
              )}

              {error.length ? (
                <div className="alert alert-error mt-3 shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 flex-shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="mt-5 flex w-full flex-col items-center">
                {providers ? (
                  <>
                    {/*   <div className="mt-2">
                      <ProviderButton
                        provider={providers.credentials}
                        onSubmit={() => {}}
                      />
                    </div> */}
                    <div className="mt-4">
                      <ProviderButton
                        provider={providers.google}
                        buttonImage={googleSignIn}
                        onSubmitHandler={() =>
                          signIn("google", {
                            callbackUrl: "/resources",
                          })
                        }
                      />
                    </div>
                  </>
                ) : (
                  <button
                    className="login_button"
                    disabled={isLoading ? true : false}
                  >
                    {!isLoading ? (
                      "Register"
                    ) : (
                      <>
                        Loading
                        <span className="ml-2">
                          <Spinner size={5} />
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            <div className="pt-12 pb-12 text-center ">
              {!isRegisterPage ? (
                <>
                  <div>
                    {/* <Link href="/reset"> */}Forgot Password{/* </Link> */}
                  </div>
                  <div>
                    Don&apos;t have an account?{" "}
                    <button onClick={() => router.push("/register")}>
                      <span className="cursor-pointer font-semibold underline">
                        Register
                      </span>
                    </button>{" "}
                    now.
                  </div>
                </>
              ) : (
                <div>
                  <button onClick={() => router.push("/login")}>
                    Already have an account?{" "}
                    <span className="cursor-pointer font-semibold underline">
                      Login
                    </span>
                  </button>{" "}
                  now.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
