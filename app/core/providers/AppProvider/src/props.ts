import { AxiosProviderProps } from "@core/providers/AxiosProvider";
import { LocaleInfo } from "./typing";

export interface AppProviderProps extends AxiosProviderProps {
  prefixCls?: string;
  name?: string;
  author?: string;
  copyright?: string;
  locales?: LocaleInfo[];
}