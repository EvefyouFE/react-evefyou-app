import { AppProviderProps } from "@core/providers/AppProvider";
import { ConfigProviderProps } from "antd/es/config-provider";
import { RouterProviderProps } from "react-router";
import { AppImportMetaEnv } from "@core/env";
import { Recordable } from "react-evefyou-common";
import { CrRouteConfig, PageModule } from "react-evefyou-router";

export interface AdminAppCompProps extends AppProviderProps {
  configProviderProps?: ConfigProviderProps;
  locale?: string;
  viewsPaths?: string[];
  router?: RouterProviderProps['router'];
}
export interface AdminAppProps extends AdminAppCompProps {
  recoilDebug?: boolean;
  strictMode?: boolean;
  env: AppImportMetaEnv;
  version: string;
  pageModules?: Recordable<() => Promise<PageModule>>;
  routeConfig?: CrRouteConfig;
  includeDefaultPages?: boolean;
}