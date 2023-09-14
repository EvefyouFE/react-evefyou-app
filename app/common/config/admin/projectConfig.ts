/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:32
 * @FilePath: \react-evefyou-app\pro\config\project\projectConfig.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { SessionTimeoutProcessingEnum } from "@common/enums/proEnum";
import { CacheTypeEnum } from "@common/enums/cacheEnum";
import { DEFAULT_BASE_SETTING } from "./setting/baseSetting";
import { DEFAULT_MENU_SETTING } from "./setting/menuSetting";
import { ProjectConfig } from "@config/typing";
import { DEFAULT_ROUTER_CONFIG } from "./routerConfig";
import { DEFAULT_COMPONENT_SETTING } from "./setting/componentSetting";
import { DEFAULT_DESIGN_CONFIG } from "./designConfig";

export const DEFAULT_PROJECT_CONFIG: ProjectConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.PAGE_COVERAGE,
  useErrorHandle: true,
  designConfig: DEFAULT_DESIGN_CONFIG,
  componentSetting: DEFAULT_COMPONENT_SETTING,
  baseSetting: DEFAULT_BASE_SETTING,
  menuSetting: DEFAULT_MENU_SETTING,
  routerConfig: DEFAULT_ROUTER_CONFIG,
};
