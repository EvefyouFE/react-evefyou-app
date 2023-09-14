/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 19:33:04
 * @FilePath: \react-evefyou-app\pro\AdminPro\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { AdminAppCompProps } from "../props";
import { AppProvider } from "@core/providers/AppProvider";
import { IntlProvider } from "react-intl";
import { BasicNProgress } from "react-evefyou-ui/components/BasicNProgress";
import { BasicFallback, FallbackTypeEnum } from "react-evefyou-ui/components/BasicFallback";
import React, { Suspense, useEffect, useMemo } from "react";
import { RouterProvider } from "react-router";
import moment from 'moment';
import { AxiosProvider } from "@/core/providers/AxiosProvider";
import { useProRecoilValue } from "@/core/stores/pro";
// import { AppConfigProvider } from "@/core/providers/AppConfigProvider";
import { ConfigProvider } from "antd";
import { mergeDeepRight } from "ramda";
import { ConfigProviderProps } from "antd/es/config-provider";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/core/query";

export const AdminAppComp: React.FC<AdminAppCompProps> = ({
  configProviderProps,
  router,
  locales,
  locale: defaultLocale = 'zh-cn',
  children,
  viewsPaths
  // onErrorInterceptor,
  // onNotAuthenticated,
  // onNotAuthorized,
  // onResponseInterceptor,
  // onSystemError,
  // onTimeout
}) => {

  const [
    {
      baseSetting: { locale },
      designConfig: { themeConfig }
    },
    {
      setKeepAliveSettingViewPaths
    }
  ] = useProRecoilValue();
  const localeValue = defaultLocale ?? locale

  const intlMessages = locales?.find((item) => item.key === locale.toLowerCase())?.messages

  const configProviderPropsValue = useMemo(() => {
    const config = {
      theme: themeConfig,
      locale: locales?.find((item) => item.key === locale.toLowerCase())?.antdMessages
    }
    return configProviderProps ? mergeDeepRight(config, configProviderProps) as ConfigProviderProps : config
  }, [configProviderProps, locales])

  useEffect(() => {
    if (localeValue.toLowerCase() === 'en-us') {
      moment.locale('en');
    } else if (localeValue.toLowerCase() === 'zh-cn') {
      moment.locale('zh');
    }
  }, [localeValue]);

  useEffect(() => {
    viewsPaths && setKeepAliveSettingViewPaths(viewsPaths)
  }, [viewsPaths])

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<BasicFallback fallbackType={FallbackTypeEnum.errorResult} />}>
        <ConfigProvider {...configProviderPropsValue} >
          <IntlProvider
            locale={localeValue}
            messages={intlMessages}
            onError={(err) => {
              if (err.code === 'MISSING_TRANSLATION') {
                console.warn(`intl error: ${err.message}`);
                return;
              }
              throw err;
            }}
          >
            <BasicNProgress>
              <Suspense fallback={<BasicFallback fallbackType={FallbackTypeEnum.loading} />}>
                <AppProvider >
                  <AxiosProvider>
                    {
                      router && <RouterProvider router={router} />
                    }
                    {children}
                  </AxiosProvider>
                </AppProvider>
              </Suspense>
            </BasicNProgress>
          </IntlProvider>
        </ConfigProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}