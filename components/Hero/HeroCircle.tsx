import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/storeModel";

function HeroCircle() {
  const { hero }: any = useSelector((state: RootState) => state.hero);

  return (
    <div className="avatar ">
      <Link href="/hero">
        <div className="relative h-32 w-32 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          <Image
            src={`${
              hero.resources
                ? hero?.resources[0].uri
                : "https://wallpaperaccess.com/full/167765.jpg"
            }`}
            objectFit="cover"
            alt="nft-img"
            className="rounded-full object-top	"
            layout="fill"
          />
        </div>
      </Link>
    </div>
  );
}

export default HeroCircle;
