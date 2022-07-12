import {StaticImageData} from "next/image";

export interface MenuItemModel {
  image: StaticImageData | string;
  title: string;
  logo?: boolean;
  link: string;
  disabled?: boolean;
  hasNotifications?: boolean;
}
