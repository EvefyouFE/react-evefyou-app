/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-app\pro\components\AppProvider\index.tsx
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { FC, useEffect, useState } from 'react';
import { ModalProvider } from 'react-evefyou-ui/components/BasicModal';
import { useBreakpoint } from '@hooks/dom/useBreakpoint';
import { useLayoutSettingValue } from '@hooks/pro/setting/useLayoutSetting';
import { AppContext, DEFAULT_APP_VALUE } from './context';
import { useProRecoilValue } from '@core/stores/pro';
import { AppProviderProps } from "./props";
import { BreakpointsAntd } from "@common/enums/breakpointsEnum";

export const AppProvider: FC<AppProviderProps> = (props) => {
  const {
    children,
    name = DEFAULT_APP_VALUE.name,
    author = DEFAULT_APP_VALUE.author,
    copyright = DEFAULT_APP_VALUE.copyright?.replace('[name]', name).replace('[author]', author),
    locales
  } = props;
  const breakpoints = useBreakpoint(BreakpointsAntd);
  const { setMobileLayout } = useLayoutSettingValue();
  const [, { setMenuSetting }] = useProRecoilValue();
  const [isMobileState, setIsMobileState] = useState(false);

  const lgAndSmaller = breakpoints.smaller('LG');
  useEffect(() => {
    const isMobile = lgAndSmaller;
    setIsMobileState(isMobile);
    isMobile &&
      setMenuSetting({ collapsed: true, showCollapsed: true, showMenu: true });
    isMobile && setMobileLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lgAndSmaller]);

  return (
    <AppContext.Provider
      value={{
        isMobile: isMobileState,
        prefixCls: DEFAULT_APP_VALUE.prefixCls,
        name,
        author,
        copyright,
        locales
      }}
    >
      <ModalProvider>{children}</ModalProvider>
    </AppContext.Provider>
  );
};
