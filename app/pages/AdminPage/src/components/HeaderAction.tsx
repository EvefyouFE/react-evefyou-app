import { FC, useCallback } from 'react';
import { PropsWithCls } from "react-evefyou-common";
import { LocaleDropdown } from "react-evefyou-ui/modules/LocaleDropdown";
import { UserActionDropdown } from "react-evefyou-ui/modules/UserActionDropdown";
import { Reminder } from './Reminder';
import { ReactComponent as Logo } from '@/assets/logo/nika_logo.svg';
import { useUserRecoilState } from "@core/stores/user";
import { useAppContext } from "@/core/providers/AppProvider";
import 'virtual:windi.css';

export const HeaderAction: FC<PropsWithCls> = () => {
  const itemClsName = 'flex justify-center items-center h-full pl-4';
  const [{ userInfo }, { setLocale }] = useUserRecoilState()
  const { locales } = useAppContext()
  const onLocaleChange = useCallback((locale: string) => {
    setLocale(locale)
  }, [setLocale])
  return (
    <div className="flex items-center justify-around h-full">
      <Reminder className={`${itemClsName} cursor-pointer`} />
      <LocaleDropdown className={itemClsName} items={locales ?? []} onChange={onLocaleChange} />
      <UserActionDropdown className={`${itemClsName} px-5`} face={<Logo />} name={userInfo?.username} />
    </div>
  );
};
