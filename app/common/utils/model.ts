/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-25 22:31:57
 * @FilePath: \react-evefyou-app\pro\utils\model.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
export const enum2Obj = <K extends string = string>(e: any): Record<K, number | string> => {
    const obj = {} as Record<keyof typeof e, number | string>;
    for (const key in e) {
        if (isNaN(Number(key))) {
            if (typeof e[key] === 'number') {
                obj[key] = e[key] as unknown as number;
            } else {
                obj[key] = e[key] as unknown as number;
            }
        }
    }
    return obj;
}