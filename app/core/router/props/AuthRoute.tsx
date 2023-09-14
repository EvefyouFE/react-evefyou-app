/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-app\pro\components\AuthRoute\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { FC } from 'react';
import { BasicResult } from "react-evefyou-ui/components/BasicResult";
import { Navigate, RouteProps, useLoaderData } from 'react-router';
import { usePermission } from '@hooks/pro/usePermission';
import { HomeLoaderData } from "./loader";

export const AuthRoute: FC<RouteProps> = ({ children }) => {
  const { token } = useLoaderData() as HomeLoaderData;
  const { authenticateRouting } = usePermission();
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!authenticateRouting()) {
    return <BasicResult code={403} />;
  }

  return <div>{children}</div>;
};

AuthRoute.displayName = 'AuthRoute';
