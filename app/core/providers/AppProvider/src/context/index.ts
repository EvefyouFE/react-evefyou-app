import { LocaleInfo } from "../typing";
import { createContext, useContext } from 'react';

export interface AppContextProps {
    name: string;
    organization: string;
    author: string;
    prefixCls: string;
    isMobile: boolean;
    copyright?: string;
    locales?: LocaleInfo[]
}

export const createAppContext = (props: AppContextProps) =>
    createContext(props);

export const DEFAULT_APP_VALUE: AppContextProps = {
    name: 'Evefyou App',
    organization: 'EvefyouFE',
    author: 'Evefyou',
    prefixCls: 'evefyou',
    isMobile: false,
    copyright: `[author] Admin ©${new Date().getFullYear()}-now Created by [organization]`,
    locales: []
}
DEFAULT_APP_VALUE.copyright = DEFAULT_APP_VALUE.copyright?.replace('[author]', DEFAULT_APP_VALUE.author)
DEFAULT_APP_VALUE.copyright = DEFAULT_APP_VALUE.copyright?.replace('[organization]', DEFAULT_APP_VALUE.organization)

export const AppContext = createAppContext(DEFAULT_APP_VALUE);

export const useAppContext = () => useContext(AppContext);
