/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 19:33:04
 * @FilePath: \react-evefyou-app\pro\AdminPro\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { AdminAppProps } from "./props";
import React, { useMemo } from "react";
import { RecoilRoot } from "recoil";
import { DebugObserver, initializeState } from "@core/stores/base";
import { registerAppEnv } from "@/core/env";
import { AdminAppComp } from "./components/AdminAppComp";
import { generateRouter, getViewPaths } from "@/core/router";

export const AdminApp: React.FC<AdminAppProps> = ({
  env,
  version,
  pageModules,
  routeConfig,
  includeDefaultPages = true,
  router,
  viewsPaths,
  recoilDebug = false,
  strictMode = false,
  children,
  ...rest
}) => {
  registerAppEnv({ version, env })
  router ??= useMemo(
    () => generateRouter(pageModules, routeConfig, includeDefaultPages)
    , [pageModules, routeConfig, includeDefaultPages]
  )
  viewsPaths ??= useMemo(() => getViewPaths(pageModules), [pageModules])
  const comp = (
    <RecoilRoot initializeState={initializeState}>
      {
        recoilDebug && <DebugObserver />
      }
      <AdminAppComp
        {...rest}
        router={router}
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