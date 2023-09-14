/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 23:45:42
 * @FilePath: \react-evefyou-app\pro\_core\stores\auth.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { atom } from "recoil";
import { defineRecoilState } from "react-evefyou-hooks";
import { localStorageEffect } from "./base";
import { Role } from "@common/models/auth";
import { convertListToTree } from "react-evefyou-common/utils/list/convertListToTree";
import { MenuList } from "@common/models/menu";
import { MenuItem, MenuTreeList } from "react-evefyou-router";

export interface PermissionState {
    // Permission code list
    // 权限代码列表
    permissionList: string[] | number[];
    roleList: Role[];
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: number;
    // Backstage menu list
    // 后台菜单列表
    menuTreeList: MenuTreeList;
    // 路由
    routes: string[];
}

export const DEFAULT_AUTH_STATE: PermissionState = {
    // 权限代码列表
    permissionList: [],
    roleList: ['guest'],
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // Backstage menu list
    // 后台菜单列表
    menuTreeList: [],
    routes: []
}

export const authAtom = atom({
    key: 'authAtom',
    default: DEFAULT_AUTH_STATE,
    effects: [localStorageEffect('YXV0aA==')],
})

export const useAuthRecoilState = defineRecoilState({
    name: 'authState',
    defaultValue: DEFAULT_AUTH_STATE,
    useState: authAtom,
    getters: {
        getPermissionList(state) {
            return state.permissionList;
        },
        getRoleList(state) {
            return state.roleList;
        },
        getMenuTreeList(state) {
            return state.menuTreeList;
        },
        getLastBuildMenuTime(state) {
            return state.lastBuildMenuTime;
        },
        getRoutes(state) {
            return state.routes;
        },
    },
    setters: {
        setPermissionList(permissionList: string[] | number[]) {
            this.setProps({ permissionList });
        },
        setRoleList(roleList: Role[]) {
            this.setProps({ roleList });
        },
        setMenuTreeList(menuTreeList: MenuTreeList) {
            this.setProps({ menuTreeList });
            menuTreeList?.length > 0 && this.setLastBuildMenuTime();
        },
        setLastBuildMenuTime() {
            this.setProps({ lastBuildMenuTime: new Date().getTime() });
        },
        setRoutes(routes: string[]) {
            this.setProps({ routes });
        },
    },
    actions: {
        async refreshAuthAction(menuList: MenuList): Promise<string[]> {
            if (!menuList) {
                this.setMenuTreeList([])
                this.setRoutes([])
                return []
            }
            const routes = menuList.map(m => m.path)
            this.setRoutes(routes)
            const menuTreeList = convertListToTree<MenuItem>(menuList, 0)
            this.setMenuTreeList(menuTreeList)
            return routes
        },
    }
});

