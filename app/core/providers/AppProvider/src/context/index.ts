import { LocaleInfo } from "../typing";
import { createContext, useContext } from 'react';

export interface AppContextProps {
    name: string;
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
    author: 'Evefyou',
    prefixCls: 'evefyou',
    isMobile: false,
    copyright: `[name] ©${new Date().getFullYear()}-now Created by [author]`,
    locales: []
}

export const AppContext = createAppContext(DEFAULT_APP_VALUE);

export const useAppContext = () => useContext(AppContext);
