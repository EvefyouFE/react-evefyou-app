import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLogout } from './hooks/useLogout';
import { useDesign } from "react-evefyou-hooks/useDesign";

interface LogoutProps {
  locale?: string;
}

export const Logout: FC<LogoutProps> = ({ locale = '' }) => {
  const { prefixCls } = useDesign('logout')
  const { onLogout } = useLogout();
  return (
    <span className={prefixCls} role="button" tabIndex={0} onClick={onLogout} onKeyUp={onLogout}>
      <FormattedMessage id={locale} defaultMessage="登出" />
    </span>
  );
};
