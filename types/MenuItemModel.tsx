import {StaticImageData} from "next/image";

export interface MenuItemModel {
  image: StaticImageData;
  title: string;
  logo?: boolean;
  link: string;
}
