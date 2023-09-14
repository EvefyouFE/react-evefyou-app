import { divide, multiply } from "ramda";
import { useCallback, useMemo } from "react";
import { useProRecoilValue } from "@core/stores/pro";
import { LayoutSetting } from "@config/typing";

export type LayoutSettingKeyWithUnit = `${keyof Omit<LayoutSetting, 'unit'>}WithUnit`
export type LayoutSettingWithUnit = Record<LayoutSettingKeyWithUnit, string>;
export type LayoutSettingKeyPxVal = `${keyof Omit<LayoutSetting, 'unit'>}PxVal`
export type LayoutSettingPxVal = Record<LayoutSettingKeyPxVal, number>;
export type CalcLayoutSettingKey = `calc${(Capitalize<keyof Omit<LayoutSetting, 'unit'>>)}`
export type CalcLayoutSetting = Record<CalcLayoutSettingKey, (cb?: (n: number) => number) => string>

export function useLayoutSettingValue() {
    const [, { getLayoutSetting, setLayoutSetting }] = useProRecoilValue();
    const layoutSetting = getLayoutSetting()
    const setMobileLayout = () => setLayoutSetting({
        unit: 'rem',
        siderWidth: 14,
        headerHeight: 3,
        pageTabsNavHeight: 2,
        pageContainerPadding: 0.6,
        footerHeight: 2,
    })
    const { unit } = layoutSetting;
    const { fontSize } = layoutSetting;
    const filter = ([k]: [string, any]) => k !== 'unit' && k !== 'fonteSize';

    const translatePx2WithUint = (n: number) => {
        switch (unit) {
            case 'em':
            case 'rem':
                return divide(n, fontSize);
            case 'px':
            default:
                return n;
        }
    }

    const translateWithUint2Px = useCallback((n: number) => {
        switch (unit) {
            case 'em':
            case 'rem':
                return multiply(n, fontSize);
            case 'px':
            default:
                return n;
        }
    }, [fontSize, unit])

    const layoutSettingWithUnit = useMemo(() => Object.fromEntries(
        Object.entries(layoutSetting)
            .filter(filter)
            .map(([k, v]) => [`${k}WithUnit`, `${v as string}${unit}`])
    ), [layoutSetting, unit]);

    const layoutSettingPxVal = useMemo(() => Object.fromEntries(
        Object.entries(layoutSetting)
            .filter(filter)
            .map(([k, v]) => [`${k}PxVal`, translateWithUint2Px(v)])
    ), [layoutSetting, translateWithUint2Px]);

    const calcLayoutSetting = useMemo(() => Object.fromEntries(
        Object.entries(layoutSetting)
            .filter(filter)
            .map(([k, v]) => [
                `calc${k.slice(0, 1).toUpperCase()}${k.slice(1)}`,
                (cb?: (n: number) => number) => cb ? `${cb(v)}${unit}` : `${v as string}${unit}`
            ])
    ), [layoutSetting, unit]);

    return {
        ...layoutSetting,
        ...layoutSettingPxVal as LayoutSettingPxVal,
        ...layoutSettingWithUnit as LayoutSettingWithUnit,
        ...calcLayoutSetting as CalcLayoutSetting,
        setLayoutSetting,
        setMobileLayout,
        translatePx2WithUint,
        translateWithUint2Px,
    }
}