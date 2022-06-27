import React, { useState } from "react";
import TitleImg from "../../public/assets/Napis.png";
import LoginBackgroundImg from "../../public/assets/Ozadje_01.png";
import LogoImg from "../../public/assets/Logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

function NewLogin({ providers }: any) {
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
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-full items-center justify-center p-5">
        <div className="relative flex h-[676px] w-full flex-col items-center justify-center bg-slate-800 md:w-[568px]">
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

        <div className="relative bg-slate-800">
          <div className="mx-12 my-4 flex flex-col justify-center space-y-4 md:justify-start ">
            <p className=" text-center text-3xl">Welcome to play.dem</p>
            <p className="text-center text-lg">Login form</p>
            <p className="text-center underline decoration-primary underline-offset-4">
              At the moment only Sign in with Google is available... Sorry for
              inconvenience
            </p>
            <form
              className="mx-12 flex flex-col pt-3 md:pt-8"
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
                className=" mt-8 cursor-pointer bg-primary p-2 text-lg font-bold text-white hover:bg-primary/80 disabled:bg-primary/50 hover:disabled:cursor-not-allowed	"
              >
                Log In
              </button>
            </form>

            {Object.values(providers).map((provider: any) => (
              <div key={provider.name}>
                <div className="mx-12">
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
      <div></div>
    </div>
  );
}

export default NewLogin;
