import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ResourcesImg from "../../public/assets/Resources.png";
import StatisticImg from "../../public/assets/Statistic.png";
import VillageImg from "../../public/assets/Village.png";
import InventoryImg from "../../public/assets/Inventory.png";
import BackgroundImage from "../../public/assets/Ozadje_menu.png";
import { MenuItemModel } from "../../types/MenuItemModel";
import Image from "next/image";

function Menu() {
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
      image: StatisticImg,
      title: "Statistics",
      link: "/statistics",
    },
    {
      image: InventoryImg,
      title: "Queue",
      link: "/queue",
    },
  ];

  return (
    <>
      {menu.map((item) => (
        <Link href={item.link} key={item.title}>
          <div
            className={`flex	flex-row justify-start space-x-4 md:h-20 md:w-24 md:flex-col  md:items-center md:justify-center md:space-x-0 ${
              item.logo
                ? ""
                : "  cursor-pointer rounded-xl px-4 py-2 transition duration-300 ease-in-out hover:scale-110 hover:bg-primary hover:text-white"
            } ${item.link === router.asPath ? "bg-primary text-white " : ""}`}
          >
            <div className="h-7 w-7  md:h-12 md:w-12 xl:h-14 xl:w-14">
              {item.logo ? (
                <div className="hidden justify-center md:flex">Logo</div>
              ) : (
                <Image src={item.image} />
              )}
            </div>

            <div className="md:hidden lg:block">
              <h1>{item.title}</h1>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Menu;
