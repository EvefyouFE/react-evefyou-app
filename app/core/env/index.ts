/*
 * Copyright Notice:
 * Original code Copyright (c) 2020-present, Vben
 * This code section is based on vue-vben-admin.
 *
 * Modified Code Copyright:
 * Copyright (c) 2023-present EvefyouFE/evef
 * The following are modifications to the original code:
 * - change getConfigFileName import
 */
import { warn } from '@common/utils/log';
import { GlobEnvConfig } from "@config/typing";

export interface AppImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly VITE_PORT: number;
  readonly VITE_USE_MOCK: boolean;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_PROXY: [string, string][];
  readonly VITE_GLOB_API_URL: string;
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_GLOB_APP_SHORT_NAME: string;
  readonly VITE_GLOB_UPLOAD_URL: string;
  readonly VITE_GLOB_API_URL_PREFIX: string;

  readonly VITE_USE_PWA?: boolean;
  readonly VITE_USE_CDN?: boolean;
  readonly VITE_DROP_CONSOLE?: boolean;
  readonly VITE_BUILD_COMPRESS?: 'gzip' | 'brotli' | 'none';
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE?: boolean;
  readonly VITE_LEGACY?: boolean;
  readonly VITE_USE_IMAGEMIN?: boolean;
  readonly VITE_GENERATE_UI?: string;
}

export interface AppEnvOptions {
  version: string;
  env: AppImportMetaEnv;
}

export const DEFAULT_APP_ENV_OPTION: AppEnvOptions = {
  version: '0.0.0',
  env: {
    MODE: 'development',
    DEV: true,
    PROD: false,
    VITE_PORT: 3000,
    VITE_GLOB_APP_TITLE: 'Evefyou APP',
    VITE_GLOB_APP_SHORT_NAME: 'react_evefyou_APP',
    VITE_USE_MOCK: true,
    VITE_PUBLIC_PATH: '/',
    VITE_PROXY: [
      ['/basic-api', 'http://localhost:3000'],
      ['/upload', 'http://localhost:3300/upload']
    ],
    VITE_DROP_CONSOLE: false,
    VITE_GLOB_API_URL: '/basic-api',
    VITE_GLOB_UPLOAD_URL: '/upload',
    VITE_GLOB_API_URL_PREFIX: ''
  }
}

let appEnvOptions: AppEnvOptions = DEFAULT_APP_ENV_OPTION

export function registerAppEnv(opt: AppEnvOptions = DEFAULT_APP_ENV_OPTION) {
  // console.log('registerAppEnv', opt)
  appEnvOptions = opt;
}

export const getConfigFileName = (env: AppImportMetaEnv) =>
  `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');

export const getBaseName = () => {
  const { env } = appEnvOptions
  return env.VITE_PUBLIC_PATH
}

export function getAppEnvConfig() {
  const { env } = appEnvOptions
  const ENV_NAME = getConfigFileName(env);

  const ENV = (env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
    (env as unknown as GlobEnvConfig)
    : window[ENV_NAME as keyof typeof globalThis]) as unknown as GlobEnvConfig;

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV;

  if (!/^[a-zA-Z_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return appEnvOptions.env.MODE;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return appEnvOptions.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return appEnvOptions.env.PROD;
}


export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${appEnvOptions.version}`}__`.toUpperCase();
}