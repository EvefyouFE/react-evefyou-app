import { ProjectConfig } from "@config/typing";
import { Role } from "./auth";
import { Device } from "./info";
import { MenuTreeList } from "react-evefyou-router";

export interface CurrentUserRes extends UserInfo {
  roleList: Role[];
  permissionList: string[]
}


export interface UserInfo {
  username: string;

  /** menu list for init tagsView */
  menuList: MenuTreeList;

  /** user's device */
  device: Device;

  /** user's language */
  locale: string;

  /** Is first time to view the site ? */
  newUser: boolean;

  settings?: ProjectConfig;
  avatar: string;
  homePath?: string;
  token?: string;
}

