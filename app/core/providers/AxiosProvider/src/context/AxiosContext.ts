/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-27 17:18:08
 * @FilePath: \react-evefyou-app\pro\components\AxiosProvider\context\AxiosContext.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { AxiosInstance } from "axios";
import { createAxios } from "@core/request";
import { createContext, useContext } from "react";


export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(createAxios().getAxios(), {
    apply: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
    get: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
  }),
);

export const useAxiosContext = () => useContext(AxiosContext)