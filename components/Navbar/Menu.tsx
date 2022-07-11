import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import ResourcesImg from "../../public/assets/Resources.png";
import StatisticImg from "../../public/assets/Statistic.png";
import VillageImg from "../../public/assets/Village.png";
import InventoryImg from "../../public/assets/Inventory.png";
import LogoImg from "../../public/assets/Logo.png";
import {MenuItemModel} from "../../types/MenuItemModel";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "../../types/storeModel";

function Menu() {
  const router = useRouter();

  const {battleReports}: any = useSelector(
    (state: RootState) => state.battleReports
  );

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
      image: LogoImg,
      title: "Play DEM",
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
      title: "Reports",
      link: "/reports",
      hasNotifications: true,
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/3903/3903967.png",
      title: "Queue",
      link: "/queue",
    },
  ];

  return (
    <>
      {menu.map((item) =>
        !item.disabled ? (
          <Link href={item.link} key={item.title}>
            <div
              className={`flex	flex-row justify-start space-x-4 md:h-20 md:w-24 md:flex-col  md:items-center md:justify-center md:space-x-0 ${
                item.logo
                  ? ""
                  : "  cursor-pointer rounded-xl px-4 py-2 transition duration-300 ease-in-out hover:scale-110 hover:bg-primary hover:text-white"
              } ${item.link === router.asPath ? "bg-primary text-white " : ""}`}
            >
              <div>
                {item.hasNotifications ? (
                  <div className="indicator">
                    {battleReports > 0 ? (
                      <span className="badge indicator-item badge-secondary mt-1">
                        {battleReports}
                      </span>
                    ) : (
                      <></>
                    )}
                    <div
                      className={`relative h-7  w-7 md:h-12 md:w-12 ${
                        item.logo ? "xl:h-20 xl:w-20" : "xl:h-14 xl:w-14"
                      }`}
                    >
                      <Image src={item.image} alt={item.title} layout="fill" />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`relative h-7  w-7 md:h-12 md:w-12 ${
                      item.logo ? "xl:h-20 xl:w-20" : "xl:h-14 xl:w-14"
                    }`}
                  >
                    <Image src={item.image} alt={item.title} layout="fill" />
                  </div>
                )}
              </div>

              <div className="md:hidden lg:block">
                <h1
                  className={`${
                    item.logo ? "font-semibold text-primary " : ""
                  }`}
                >
                  {item.logo ? "" : item.title}
                </h1>
              </div>
            </div>
          </Link>
        ) : (
          <div
            key={item.title}
            className="tooltip tooltip-bottom"
            data-tip={`${item.title} is disabled ATM`}
          >
            <div className="flex flex-row	justify-start space-x-4 rounded-xl px-4 py-2 opacity-40 md:h-20 md:w-24 md:flex-col md:items-center md:justify-center md:space-x-0">
              <div>
                <div className="relative h-7  w-7 md:h-12 md:w-12 xl:h-14 xl:w-14">
                  <Image src={item.image} alt={item.title} layout="fill" />
                </div>
              </div>
              <div className="md:hidden lg:block">
                <h1
                  className={`${
                    item.logo ? "font-semibold text-primary " : ""
                  }`}
                >
                  {item.title}
                </h1>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Menu;
