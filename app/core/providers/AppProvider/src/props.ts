import { AxiosProviderProps } from "@core/providers/AxiosProvider";
import { LocaleInfo } from "./typing";

export interface AppProviderProps extends AxiosProviderProps {
  prefixCls?: string;
  author?: string;
  organization?: string;
  copyright?: string;
  locales?: LocaleInfo[];
}