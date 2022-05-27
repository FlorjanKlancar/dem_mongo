import Image from "next/image";
import React, {ReactSVG} from "react";
import ResourcesImg from "../../public/assets/Resources.png";
import StatisticImg from "../../public/assets/Statistic.png";
import VillageImg from "../../public/assets/Village.png";
import InventoryImg from "../../public/assets/Inventory.png";
import BackgroundImage from "../../public/assets/Ozadje_menu.png";
import Link from "next/link";
import {useRouter} from "next/router";
import NavbarMobile from "./NavbarMobile";
import {MenuItemModel} from "../../types/MenuItemModel";
import Menu from "./Menu";

function NavbarDem() {
  const router = useRouter();

  const menu: MenuItemModel[] = [
    {
      image: ResourcesImg,
      title: "Resources",
      link: "/resources",
    },
    {
      image: VillageImg,
      title: "Village",
      link: "/village",
    },
    {
      image: InventoryImg,
      title: "Logo",
      logo: true,
      link: "/",
    },
    {
      image: InventoryImg,
      title: "Inventory",
      link: "/inventory",
    },
    {
      image: StatisticImg,
      title: "Statistics",
      link: "/statistics",
    },
  ];

  return (
    <>
      <div className="md:hidden">
        <NavbarMobile />
      </div>

      <div className="m-auto mt-5 hidden w-3/4 justify-around rounded-2xl border-2 border-primary/50 bg-slate-800/80 p-3 md:flex lg:w-2/3 2xl:w-2/5">
        <Menu />
      </div>
    </>
  );
}

export default NavbarDem;
