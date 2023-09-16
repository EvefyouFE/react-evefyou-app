/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\pages\layouts\admin\adminLayout.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { Suspense, useCallback, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TabsContainer } from 'react-evefyou-ui/containers/TabsContainer';
import { KeepAliveContainer } from 'react-evefyou-ui/containers/KeepAliveContainer';
import { BasicFallback, FallbackTypeEnum } from "react-evefyou-ui/components/BasicFallback";
import { BasicMenuProps } from "react-evefyou-ui/components/BasicMenu";
import { BasicSiderProps } from "react-evefyou-ui/layouts/BasicSider";
import { BasicHeaderProps } from "react-evefyou-ui/layouts/BasicHeader";
import { BasicFooter } from "react-evefyou-ui/layouts/BasicFooter";
import { AdminLayout } from "react-evefyou-ui/layouts/AdminLayout";
import { Outlet } from 'react-router-dom';
import { AdminPageProps } from "./props";
import { useAuthRecoilState } from "@core/stores/auth";
import { useProRecoilValue } from "@core/stores/pro";
import { useLayoutSettingValue } from "@core/hooks/pro/setting/useLayoutSetting";
import { useAppContext } from "@core/providers/AppProvider";
import { AppLogo } from "react-evefyou-ui/modules/AppLogo";
import 'virtual:windi.css';
import { useDesign } from "react-evefyou-hooks/useDesign";
import classNames from "classnames";
import { ReactComponent as LogoSvg } from '@/assets/logo/nika_logo.svg';
import { HeaderAction } from "./components/HeaderAction";

export const AdminPage: React.FC<AdminPageProps> = ({
  className,
  appLogo = <LogoSvg width="1.5em" height="1.5em" />,
  headerLeft,
  headerAction = <HeaderAction />
}) => {
  const [, { getKeepAlivePaths, getKeepAliveSetting, setMenuSetting, getMenuSetting, toggleCollapsed }] = useProRecoilValue();
  const [{ menuTreeList }] = useAuthRecoilState();
  const keepAliveSetting = getKeepAliveSetting();
  const { pageTabsNavHeightWithUnit, headerHeightWithUnit } = useLayoutSettingValue();
  const {
    footerHeightWithUnit,
    calcPageContainerPadding
  } = useLayoutSettingValue();
  const { isMobile, copyright, name } = useAppContext();
  const onContentClick = () => setMenuSetting({ collapsed: true });
  const { collapsed, showMenu } = getMenuSetting();
  const onCollapsed = useCallback(() => {
    toggleCollapsed()
  }, [toggleCollapsed])
  const keepAlivePaths = useMemo(() => getKeepAlivePaths(), [getKeepAlivePaths])

  const Logo = (
    <AppLogo
      logo={appLogo}
      title={name}
      showTitle={!collapsed}
      className="h-layoutTopHeight"
    />
  )
  const menuProps: BasicMenuProps = {
    menuTreeList
  }
  const siderProps: BasicSiderProps = {
    logo: Logo,
    menuProps,
    hidden: !showMenu
  }
  const headerProps: BasicHeaderProps = {
    style: {
      height: headerHeightWithUnit,
      borderBottom: '1px solid #eee',
    },
    showBreadcrumb: false,
    headerLeft,
    headerAction,
    onCollapsed
  }
  const footer = (
    <BasicFooter
      className="bg-slate-100"
      content={copyright}
      style={{
        height: footerHeightWithUnit,
        paddingLeft: calcPageContainerPadding(),
        paddingRight: calcPageContainerPadding((v) => 2 * v),
      }}
    />
  )
  const { prefixCls } = useDesign('admin-page')
  const clsName = classNames(prefixCls, className)
  return (
    <AdminLayout
      className={clsName}
      onContentClick={isMobile ? onContentClick : undefined}
      siderProps={siderProps}
      headerProps={headerProps}
      footerProps={{
        show: false
      }}
    >
      <TabsContainer footer={footer} tabBarHeight={pageTabsNavHeightWithUnit}>
        <KeepAliveContainer {...keepAliveSetting} includes={keepAlivePaths}>
          <ErrorBoundary fallback={<BasicFallback fallbackType={FallbackTypeEnum.errorResult} />}>
            <Suspense fallback={<BasicFallback fallbackType={FallbackTypeEnum.loading} />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </KeepAliveContainer>
      </TabsContainer>
    </AdminLayout>
  )
}
