import { PropsWithCls } from "react-evefyou-common";
import { LocaleDropdownItem } from "./typing";

export interface LocaleDropdownProps extends PropsWithCls {
  selectedKey?: string;
  items: LocaleDropdownItem[];
  onChange?: (locale: string) => void;
}