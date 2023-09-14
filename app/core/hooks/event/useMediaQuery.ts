/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 21:01:05
 * @FilePath: \react-evefyou-app\pro\hooks\effect\useMediaQueryEffect.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import {
    useEffect,
    useMemo,
    useState
} from 'react';
import { ConfigurableWindow, defaultWindow } from '../dom/configurable';

export const useMediaQuery = (
    query: string,
    options: ConfigurableWindow = {}
) => {
    const { window = defaultWindow } = options;
    const isSupported = useMemo(
        () =>
            window &&
            'matchMedia' in window &&
            typeof window.matchMedia === 'function',
        [window]
    );

    const [matches, setMatches] = useState(false);

    useEffect(() => {
        let mediaQuery: MediaQueryList | undefined;
        const updateMatches = () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            mediaQuery = window!.matchMedia(query);
            setMatches(!!mediaQuery?.matches)
        }

        isSupported && updateMatches();
        isSupported
            && mediaQuery
            && 'addEventListener' in mediaQuery
            && mediaQuery.addEventListener('change', updateMatches);
        return () => {
            isSupported
                && mediaQuery
                && 'removeEventListener' in mediaQuery
                && mediaQuery.removeEventListener('change', updateMatches)
        }
    }, [isSupported, query, window]);

    return matches;
}