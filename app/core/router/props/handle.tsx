/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\routes\props\handle.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { CrumbData, CrRouteObject } from "react-evefyou-router";
import { MenuItemLabel } from "react-evefyou-ui/components/BasicMenu";
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

export interface RouteHandle {
  crumb: RouteAntdCrumbHandle;
}
export type RouteAntdCrumbHandle = (data?: CrumbData) => BreadcrumbItemType;


/**
 *
 * @param title
 * @returns 最后一个面包屑返回没跳转reactnode，目录面包屑返回处理函数，首页返回有跳转reactnode
 */
export function routeAntdBreadCrumbHandle({
  locale,
  path,
}: CrRouteObject): RouteAntdCrumbHandle {
  return locale
    ? () => ({
      title: <MenuItemLabel locale={locale} title={locale || ''} to={path} />,
    })
    : (data?: CrumbData) => ({
      title: <MenuItemLabel locale={data?.title} title={data?.title || ''} />,
      menu: {
        items: data?.menuTreeList?.map((item) => ({
          key: item.key,
          label: (
            <MenuItemLabel
              locale={item.locale}
              title={item.name}
              to={item.path}
            />
          ),
        })),
      },
    });
}

export function crumbHandleFn(option: CrRouteObject = {}): RouteHandle {
  const crumb = routeAntdBreadCrumbHandle(option);
  return {
    crumb,
  };
}
