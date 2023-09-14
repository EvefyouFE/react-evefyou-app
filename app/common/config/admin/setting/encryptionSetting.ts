/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-26 02:00:52
 * @FilePath: \react-evefyou-app\pro\_common\config\project\admin\encrypt\encryptionSetting.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { isDevMode } from '@/core/env';

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes encryption key
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = () => !isDevMode();
