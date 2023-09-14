/*
 * Copyright Notice:
 * Original code Copyright (c) 2020-present, Vben
 * This code section is based on vue-vben-admin.
 */
import { getStorageShortName } from '@/core/env';
import { createStorage as create, CreateStorageParams, IWebStorage } from './storageCache';
import { enableStorageEncryption, DEFAULT_CACHE_TIME } from '@config/admin/setting/encryptionSetting';

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => ({
  // No encryption in debug mode
  hasEncrypt: enableStorageEncryption(),
  storage,
  prefixKey: getStorageShortName(),
  ...options,
})

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}): IWebStorage => create(createOptions(storage, options));

export const createSessionStorage = (options: Options = {}): IWebStorage => createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });

export const createLocalStorage = (options: Options = {}): IWebStorage => createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });

export const createWebStorage = () => create(createOptions(sessionStorage))

export * from './memory'
export * from './persistent'
export * from './storageCache'