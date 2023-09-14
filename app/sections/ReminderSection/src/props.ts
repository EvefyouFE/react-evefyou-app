import { PropsWithCls } from "react-evefyou-common";

export interface ReminderSectionProps extends PropsWithCls {
  icon?: React.ReactNode;
  iconCls?: string;
  contentCls?: string;
  title?: React.ReactNode;
  titleCls?: string;
  text?: React.ReactNode;
  textCls?: string;
  footer?: React.ReactNode;
  footerCls?: string;
  showTitleTip?: boolean;
  showTextTip?: boolean;
  showFooterTip?: boolean;
}