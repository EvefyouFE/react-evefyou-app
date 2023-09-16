import { atom } from "recoil";
import React from "react";
import { defineRecoilValue } from "react-evefyou-hooks/defineRecoilValue";
import { useAuthRecoilState } from "@core/stores/auth";
import { proAtom, ProState } from "@core/stores/pro";
import { Nullable } from "react-evefyou-common";
import { MenuTreeList } from "react-evefyou-router";
import { LoginByUsernameReq } from "react-evefyou-ui/modules/LoginForm";
import { UserInfo } from "@models/user";
import { ErrorMessageMode } from "@core/request/axios/typing";
import { MessageHelper } from "react-evefyou-ui/components/MessageHelper";
import { PageEnum } from "@common/enums/pageEnum";
import { mutationLogin, queryGetCurrentMenuList, queryGetCurrentUser, queryLogout } from "@/core/api";
// import { setAuthCache } from "@/utils/auth";
import { formatBaseById } from "react-evefyou-common/locale";
import { useNavigate } from "react-router";

export interface UserState {
    userInfo: Nullable<UserInfo>;
    token: string;
    isSessionTimeout: boolean;
    lastUpdateTime: number;
}

export const DEFAULT_USER_STATE: UserState = {
    token: '',
    userInfo: null,
    isSessionTimeout: false,
    lastUpdateTime: new Date().getTime()
}

export const userAtom = atom<UserState>({
    key: 'userAtom',
    default: DEFAULT_USER_STATE
});

export const useUserRecoilState = defineRecoilValue({
    name: 'userState',
    state: DEFAULT_USER_STATE,
    getters: {
        getMenuList(state) {
            return state.userInfo?.menuList
        },
        getDefaultLocale(state) {
            const appState: ProState = this.getState(proAtom)
            const locale = appState?.baseSetting?.locale
            return state.userInfo?.locale ?? locale
        },
        getUser(state) {
            return state.userInfo
        },
        getToken(state) {
            return state.token
        },
    },
    setters: {
        setMenuList(menuList: MenuTreeList) {
            this.deepSet(['userInfo', 'menuList'] as const, menuList)
        },
        setLocale(locale: string) {
            this.deepSet(['userInfo', 'locale'] as const, locale)
        },
        setToken(token: string) {
            this.setProps({ token })
        },
        setIsSessionTimeout(isSessionTimeout: boolean) {
            this.setProps({ isSessionTimeout })
        },
        setUserInfo(userInfo: Nullable<UserInfo>) {
            this.setProps({ userInfo, lastUpdateTime: new Date().getTime() })
            // setAuthCache(USER_INFO_KEY, userInfo);
        },
    },
    useFn: () => {
        const loginMutation = mutationLogin.useMutation()
        const navigate = useNavigate()
        const [, { setProps: setAuthProps, refreshAuthAction }] = useAuthRecoilState()
        return {
            loginMutation,
            setAuthProps,
            refreshAuthAction,
            navigate
        }
    },
    actions: {
        async login(
            params: LoginByUsernameReq,
            options?: {
                goHome?: boolean;
                mode?: ErrorMessageMode;
            },
        ): Promise<Nullable<UserInfo>> {
            try {
                const { goHome = true } = options ?? {};
                const { token } = await this.loginMutation.mutateAsync(params);
                this.setToken(token);
                return await this.afterLoginAction(goHome, { token });
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async afterLoginAction(goHome?: boolean, state?: Partial<UserState>): Promise<Nullable<UserInfo>> {
            const { token } = state ?? this.userState
            if (!token) return null;
            const userInfo = await this.getUserInfoAction({ token });
            const sessionTimeout = this.userState.isSessionTimeout;
            if (sessionTimeout) {
                this.setIsSessionTimeout(false);
            } else {
                const menuList = await queryGetCurrentMenuList.fetchQuery()
                await this.refreshAuthAction(menuList);
                goHome && this.navigate(userInfo?.homePath || PageEnum.BASE_HOME);
            }
            return userInfo;
        },
        async getUserInfoAction(state?: Partial<UserState>): Promise<Nullable<UserInfo>> {
            const { token } = state ?? this.userState
            if (!token) return null;
            const { permissionList = [], roleList = [], ...rest } = await queryGetCurrentUser.fetchQuery()
            this.setAuthProps({ permissionList, roleList })
            this.setProps({
                token,
                userInfo: rest,
            })
            return rest;
        },
        async logout(goLogin = false) {
            if (this.userState.token) {
                try {
                    await queryLogout.fetchQuery();
                } catch {
                    console.log('注销Token失败');
                }
            }
            this.setToken('');
            this.setIsSessionTimeout(false);
            this.setUserInfo(null);
            goLogin && this.navigate(PageEnum.BASE_LOGIN);
        },
        confirmLoginOut() {
            MessageHelper.createConfirm({
                iconType: 'warning',
                title: React.createElement('span', {}, [formatBaseById('sys.app.logout.tip')]),
                content: React.createElement('span', {}, formatBaseById('sys.app.logout.msg')),
                onOk: async () => {
                    await this.logout(true);
                },
            });
        },
    },
}, userAtom)