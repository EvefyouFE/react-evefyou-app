/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 23:47:29
 * @FilePath: \react-evefyou-app\pro\components\AxiosProvider\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import React, { useState } from 'react';
import { AxiosContext } from "./context/AxiosContext";
import { useAxios } from "./hooks/useAxios";
import { useMountEffect } from "react-evefyou-hooks/useMountEffect";
import { useGlobSetting } from "@hooks/pro/setting/useGlobalSetting";
import { AxiosInstance } from "axios";
import { AxiosProviderProps } from "./props";
import { AxiosInterceptor } from "./components/AxiosInterceptor";
import { registerAxiosRequest, request } from "@/core/request";


export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children, ...rest }) => {
  const { urlPrefix = '', apiUrl } = useGlobSetting();
  const { transform } = useAxios(urlPrefix)
  const [axiosState, setAxiosState] = useState<AxiosInstance>(request.getAxios())

  useMountEffect(() => {
    const request = registerAxiosRequest({
      transform,
      requestOptions: {
        apiUrl,
        urlPrefix
      }
    })
    setAxiosState(request.getAxios())
  })
  return (
    <AxiosContext.Provider value={axiosState}>
      <AxiosInterceptor  {...rest} />
      {children}
    </AxiosContext.Provider>
  );
};
