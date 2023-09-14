/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\routes\props\errorElement.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { FC } from 'react';
import { BasicResult } from "react-evefyou-ui/components/BasicResult";
import { useRouteError } from 'react-router';

export const RouteErrorBoundary: FC = () => {
  const error = useRouteError();
  console.error('error', error);
  return <BasicResult code={500} />;
};

// eslint-disable-next-line react-refresh/only-export-components
export function errorBoundary() {
  return <RouteErrorBoundary />;
}
