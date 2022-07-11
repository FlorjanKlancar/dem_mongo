import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {RootState} from "../../types/storeModel";

function HeroCircle() {
  const {hero}: any = useSelector((state: RootState) => state.hero);
  const {zilWallet}: any = useSelector((state: RootState) => state.zilWallet);

  return (
    <div className="avatar w-[250px]">
      <Link href={Object.keys(zilWallet).length ? "/hero" : ""}>
        <div
          className="relative h-32 w-32 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
          onClick={() => {
            Object.keys(zilWallet).length
              ? {}
              : toast.error("No wallet connected!");
          }}
        >
          <Image
            src={`${
              hero.resources
                ? hero?.resources[0]?.uri ??
                  "https://wallpaperaccess.com/full/167765.jpg"
                : "https://wallpaperaccess.com/full/167765.jpg"
            }`}
            objectFit="cover"
            alt="nft-img"
            className={`rounded-full object-top  ${
              !Object.keys(zilWallet).length ? "opacity-50" : ""
            }`}
            layout="fill"
          />
        </div>
      </Link>
    </div>
  );
}

export default HeroCircle;
