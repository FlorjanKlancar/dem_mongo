import React from "react";
import TitleImg from "../../public/assets/Napis.png";
import LoginBackgroundImg from "../../public/assets/Ozadje_01.png";
import LogoImg from "../../public/assets/Logo.png";
import Image from "next/image";
import ProviderButton from "./ProviderButton";

type LoginComponentProps = {
  providers?: any;
};

function NewLogin({ providers }: LoginComponentProps) {
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

        <div className="relative flex h-[690px] items-center  bg-slate-800">
          <div className="mx-12 my-4 flex flex-col justify-center space-y-4 md:justify-start ">
            <p className=" text-center text-3xl text-primary">
              Welcome to play.dem
            </p>

            <div className="mt-5 flex w-full flex-col items-center">
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <ProviderButton provider={provider} key={provider.id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
