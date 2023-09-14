import { CommonLayout } from "react-evefyou-ui/layouts/CommonLayout";
import { BasicFooterProps } from "react-evefyou-ui/layouts/BasicFooter";
import { Outlet } from 'react-router';
import { useAppContext } from "@/core/providers/AppProvider";
import 'virtual:windi.css';
import { useDesign } from "react-evefyou-hooks/useDesign";

export const CommonPage: React.FC = () => {
  const { prefixCls } = useDesign('common-page')
  const { copyright } = useAppContext()
  const footerProps: BasicFooterProps = {
    content: copyright
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <CommonLayout className={prefixCls} footerProps={footerProps}>
      <Outlet />
    </CommonLayout>
  )
}

