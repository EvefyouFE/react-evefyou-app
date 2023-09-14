import { LoginByUsernameReq } from "./typing";

export interface LoginByUsernameProps {
  onLogin?: (form: LoginByUsernameReq) => Promise<any>;
  isLogging?: boolean;
}
export interface LoginFormProps extends LoginByUsernameProps {
  weChatLogo?: React.ReactNode;
  qqLogo?: React.ReactNode;
}