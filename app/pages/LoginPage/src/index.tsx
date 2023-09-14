import { LoginForm, LoginByUsernameReq } from "@modules/LoginForm";
import { useCallback } from "react";
import { ReactComponent as QQLogoSvg } from '@/assets/logo/qq_logo.svg';
import { ReactComponent as WechatLogoSvg } from '@/assets/logo/wechat_logo.svg';
import { useUserRecoilState } from "@core/stores/user";
import { useDesign } from "react-evefyou-hooks/useDesign";
import { useAppContext } from "@/core/providers/AppProvider";
import { BasicFooterProps } from "react-evefyou-ui/layouts/BasicFooter";
import { CommonLayout } from "react-evefyou-ui/layouts/CommonLayout";

export const LoginPage = () => {
  const { prefixCls } = useDesign('login-page')
  const { copyright } = useAppContext()
  const footerProps: BasicFooterProps = {
    content: copyright
  }
  const [
    ,
    {
      login,
      loginMutation: { isLoading },
    },
  ] = useUserRecoilState();
  const onLogin = useCallback(async (form: LoginByUsernameReq) => {
    await login(form)
  }, [login])

  return (
    <CommonLayout className={prefixCls} footerProps={footerProps}>
      <LoginForm
        weChatLogo={< WechatLogoSvg />}
        qqLogo={< QQLogoSvg />}
        isLogging={isLoading}
        onLogin={onLogin}
      />
    </CommonLayout>
  )
}
