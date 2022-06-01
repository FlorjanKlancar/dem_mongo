import {useRouter} from "next/router";
import React, {useState} from "react";
import {registerWithEmailAndPassword} from "../../firebase/clientApp";

type RegisterComponentProps = {
  email: string;
  passwordOne: string;
  passwordTwo: string;
  setEmail: (email: string) => void;
  setPasswordOne: (passwordOne: string) => void;
  setPasswordTwo: (passwordTwo: string) => void;
  onSubmitRegister: (event: any) => void;
  setRegister: (register: boolean) => void;
};

function RegisterComponent({
  email,
  passwordOne,
  passwordTwo,
  setEmail,
  setPasswordOne,
  setPasswordTwo,
  onSubmitRegister,
  setRegister,
}: RegisterComponentProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-2">
      <div className="flex w-full flex-col rounded-xl bg-slate-800 md:w-1/2">
        <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
          <p className="pt-5 text-center text-3xl">Welcome to play.dem</p>
          <p className="text-center">Registration form</p>
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={onSubmitRegister}
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

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                Password confirm
              </label>
              <input
                type="password"
                id="password"
                value={passwordTwo}
                onChange={(e) => setPasswordTwo(e.target.value)}
                placeholder="Password"
                className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <input
              type="submit"
              value="Register"
              className="mt-8 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700"
            />
          </form>
          <div className="pt-12 pb-12 text-center ">
            <div>
              You already have an account?{" "}
              <button onClick={() => setRegister(false)}>
                <span className="cursor-pointer font-semibold underline">
                  Login
                </span>
              </button>{" "}
              now.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
