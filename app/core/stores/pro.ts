/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-app\pro\_core\stores\pro.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineRecoilValue } from "react-evefyou-hooks";
import { atom } from "recoil";
import { BaseSetting, LayoutSetting, MenuSetting, KeepAliveSetting, ProjectConfig } from "@config/typing";
import { DEFAULT_PROJECT_CONFIG } from "@config/admin/projectConfig";
import { ThemeConfig } from "antd";

export type ProState = ProjectConfig;
export const DEFAULT_PRO_STATE: ProState = DEFAULT_PROJECT_CONFIG

export const proAtom = atom<ProState>({
    key: 'proAtom',
    default: DEFAULT_PRO_STATE
})

export const useProRecoilValue = defineRecoilValue({
    name: 'proState',
    state: DEFAULT_PRO_STATE,
    getters: {
        getBaseSetting(state) {
            return state.baseSetting
        },
        getLayoutSetting(state) {
            return state.designConfig.layoutSetting
        },
        getMenuSetting(state) {
            return state.menuSetting
        },
        getKeepAliveSetting(state) {
            return state.routerConfig.keepAliveSetting
        },
        getKeepAlivePaths(state) {
            const { includeAll, includes, viewPaths } = state.routerConfig.keepAliveSetting
            return includeAll ? viewPaths : includes
        },
    },
    setters: {
        setThemeConfig(themeConfig: ThemeConfig) {
            this.deepMerge(['designConfig', 'themeConfig'] as const, themeConfig)
        },
        setBaseSetting(baseSetting: BaseSetting) {
            this.deepMerge(['baseSetting'] as const, baseSetting)
        },
        setLayoutSetting(layoutSetting: Partial<LayoutSetting>) {
            this.deepMerge(['designConfig', 'layoutSetting'] as const, layoutSetting)
        },
        setMenuSetting(menuSetting: Partial<MenuSetting>) {
            this.deepMerge(['menuSetting'] as const, menuSetting as MenuSetting)
        },
        setKeepAliveSetting(keepAliveSetting: KeepAliveSetting) {
            this.deepMerge(['routerConfig', 'keepAliveSetting'] as const, keepAliveSetting)
        },
        setKeepAliveSettingViewPaths(viewPaths: string[]) {
            this.deepMerge(['routerConfig', 'keepAliveSetting', 'viewPaths'] as const, viewPaths)
        },
    },
    actions: {
        toggleCollapsed() {
            const menuSetting = this.proState.menuSetting
            this.setMenuSetting({
                collapsed: !menuSetting.collapsed,
                showMenu: !menuSetting.showCollapsed ? menuSetting.collapsed : true
            })
        }
    }
}, proAtom)