import Image from "next/image";
import React from "react";
import BackgroundImage from "/public/assets/Ozadje_DEM_game.png";

type WrapperProps = {
  children: React.ReactNode;
};

function Wrapper({children}: WrapperProps) {
  return (
    <div className="h-screen w-full absolute top-0">
      <Image src={BackgroundImage} layout="fill" objectFit="cover" />
      {children}
    </div>
  );
}

export default Wrapper;
