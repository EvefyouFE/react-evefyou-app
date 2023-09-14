/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 22:59:20
 * @FilePath: \react-evefyou-app\pro\_core\hooks\pro\usePermission.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { Role } from "@common/models/auth";
import { includes } from "ramda";
import { useLocation } from "react-router";
import { ComponentPermissionEnum, ControlPermissionEnum } from "@common/enums/authEnum";
import { useAuthRecoilState } from "@core/stores/auth";
import { isSubList } from "react-evefyou-common/utils/list/isSubList";

export interface PermissionOptions {
    control?: ControlPermissionEnum;
    component?: ComponentPermissionEnum;
    roles?: Role[];
}

const WHITE_LIST = ['/']

export function transferRoutePathToPermissionCode(
    path: string
): string {
    return path.replaceAll('/', ':').slice(1)
}

export function usePermission() {
    const [{ permissionList, roleList, routes }] = useAuthRecoilState()
    const { pathname } = useLocation()

    function authenticateRouting() {
        if (includes(pathname, WHITE_LIST)) return true
        return includes(pathname, routes)
    }
    function authenticateRole(roles?: Role[]) {
        return !roles || isSubList(roles, roleList)
    }
    function authenticatePermission(permissions: string[] | number[]) {
        return !permissions || isSubList(permissions, permissionList)
    }
    function buildCompPermission(control?: ControlPermissionEnum, component?: ComponentPermissionEnum) {
        return component ? control ? `${component}:${control}` : `${component}` : control ? `${control}` : ''
    }
    function buildPermission(control?: ControlPermissionEnum, component?: ComponentPermissionEnum) {
        const compPermission = buildCompPermission(control, component)
        if (!compPermission) {
            return ''
        }
        const viewPermission = transferRoutePathToPermissionCode(pathname)
        return viewPermission.concat(':').concat(compPermission)
    }

    function hasPermission({ control, roles, component }: PermissionOptions = {}) {
        if (!control && !component) {
            return true
        }
        return authenticateRole(roles)
            && authenticatePermission([buildPermission(control, component)])
    }
    function hasNumberPermission(permissions: number[]) {
        return authenticatePermission(permissions)
    }
    return {
        authenticateRouting,
        hasPermission,
        hasNumberPermission
    }
}