/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 22:33:44
 * @FilePath: \react-evefyou-app\pro\_common\enums\breakpointsEnum.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { enum2Obj } from "@utils/model";

export enum BreakpointsAntdEnum {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}
export const BreakpointsAntd = enum2Obj<keyof typeof BreakpointsAntdEnum>(BreakpointsAntdEnum)