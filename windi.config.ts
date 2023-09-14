/*
 * @Author: EvefyouFE
 * @Date: 2023-08-17 22:07:42
 * @FilePath: \react-evefyou-app\windi.config.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'
import { generate } from '@ant-design/colors';

const primaryColor = '#0960bd';
const theme = 'default'
const palettes = generate(primaryColor, {
    theme,
})
const primary = palettes[5];

export default defineConfig({
    darkMode: 'class',
    safelist: 'p-0 p-3 p-4 p-5',
    theme: {
        extend: {
            colors: {
                primary,
                headerLeftTiggerHover: '#f1f1f1',
                textColor: 'c9d1d9',
            },
            height: {
                layoutTopHeight: '3.5rem',
            }
        },
    },
    plugins: [formsPlugin],
    preflight: false,
})