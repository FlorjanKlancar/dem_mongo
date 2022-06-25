import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeroCircle() {
  return (
    <div className="avatar ">
      <Link href="/hero">
        <div className="relative h-32 w-32 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          <Image
            src={"https://wallpaperaccess.com/full/167765.jpg"}
            objectFit="cover"
            alt="nft-img"
            className="rounded-full"
            layout="fill"
          />
        </div>
      </Link>
    </div>
  );
}

export default HeroCircle;
