/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 19:33:04
 * @FilePath: \react-evefyou-app\pro\AdminPro\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { AdminAppProps } from "./props";
import React from "react";
import { RecoilRoot } from "recoil";
import { DebugObserver, initializeState } from "@core/stores/base";
import { registerAppEnv } from "@/core/env";
import { AdminAppComp } from "./components/AdminAppComp";

export const AdminApp: React.FC<AdminAppProps> = ({
  env,
  configProviderProps,
  router,
  locales,
  locale,
  viewsPaths,
  recoilDebug = false,
  strictMode = false,
  children,
  // onErrorInterceptor,
  // onNotAuthenticated,
  // onNotAuthorized,
  // onResponseInterceptor,
  // onSystemError,
  // onTimeout
}) => {
  registerAppEnv(env)
  const comp = (
    <RecoilRoot initializeState={initializeState}>
      {
        recoilDebug && <DebugObserver />
      }
      <AdminAppComp
        configProviderProps={configProviderProps}
        router={router}
        locales={locales}
        locale={locale}
        viewsPaths={viewsPaths}
      >
        {children}
      </AdminAppComp>
    </RecoilRoot>
  )
  return (
    <>
      {strictMode ? <React.StrictMode>{comp}</React.StrictMode> : comp}
    </>
  )
}