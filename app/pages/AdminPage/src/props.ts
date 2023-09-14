import { PropsWithChildrenCls } from "react-evefyou-common";

export interface AdminPageProps extends PropsWithChildrenCls {
  appLogo?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerAction?: React.ReactNode;
}