import { AppProviderProps } from "@core/providers/AppProvider";
import { ConfigProviderProps } from "antd/es/config-provider";
import { RouterProviderProps } from "react-router";
import { AppEnvOptions } from "@core/env";

export interface AdminAppCompProps extends AppProviderProps {
  configProviderProps?: ConfigProviderProps;
  locale?: string;
  viewsPaths?: string[];
  // messages?: Record<string, string> | Record<string, MessageFormatElement[]>;
  router?: RouterProviderProps['router'];
}
export interface AdminAppProps extends AdminAppCompProps {
  recoilDebug?: boolean;
  strictMode?: boolean;
  env: AppEnvOptions;
}