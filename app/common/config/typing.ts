/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-23 18:13:15
 * @FilePath: \react-evefyou-app\pro\types\config.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { CacheTypeEnum } from "@common/enums/cacheEnum";
import { SessionTimeoutProcessingEnum } from "@common/enums/proEnum";
import { BasicTableSetting } from "react-evefyou-ui/components/BasicTable";
import { ThemeConfig } from "antd";

export interface DesignConfig {
  themeConfig: ThemeConfig;
  layoutSetting: LayoutSetting;
}

export interface BaseSetting {
  prefixCls: string;
  locale: string;
}

export interface ComponentSetting {
  table: BasicTableSetting;
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  useErrorHandle: boolean;

  designConfig: DesignConfig;
  componentSetting: ComponentSetting;
  baseSetting: BaseSetting;
  menuSetting: MenuSetting;
  routerConfig: RouterConfig;
}

export interface IconMapSetting {
  [key: string]: string;
}

export interface TabsMenuItem {
  title: string,
  icon: string,
}

export interface LayoutSetting {
  fontSize: number;
  unit: string;
  siderWidth: number;
  headerHeight: number;
  pageTabsNavHeight: number;
  pageContainerPadding: number;
  footerHeight: number;
}

export interface MenuSetting {
  showCollapsed: boolean;
  showMenu: boolean;
  collapsed: boolean;
  menuIconMap: IconMapSetting;
  isRoutesMenu: boolean;
  exposeMenuList: string[];
}

export interface KeepAliveSetting {
  includes?: string[];
  excludes?: string[];
  includeAll?: boolean;
  viewPaths?: string[];
  active?: boolean;
  maxLen?: number;
}

export interface RouterConfig {
  keepAliveSetting: KeepAliveSetting;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}