/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-27 18:18:31
 * @FilePath: \react-evefyou-app\pro\_common\models\menu.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { MenuItem } from "react-evefyou-router";

export type MenuChild = Omit<MenuItem, 'children'> & {
  id: number;
  pId: number;
};

export type MenuList = MenuChild[];