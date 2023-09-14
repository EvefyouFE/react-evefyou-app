
import { PAxios, PAxiosRequestConfig } from "./axios";
import { clone, mergeDeepRight } from "ramda";
import { ContentTypeEnum } from "@common/enums/httpEnum";
import { getAppEnvConfig } from "@core/env";
import { createAxiosTransform } from "./axios/AxiosTransform";

export * from './axios'

const { VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX } = getAppEnvConfig()

export const DEFAULT_AXIOS_REQUEST_CONFIG: PAxiosRequestConfig = {
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
  // authentication schemes，e.g: Bearer
  // authenticationScheme: 'Bearer',
  authenticationScheme: '',
  timeout: 10 * 1000,
  // 基础接口地址
  // baseURL: globSetting.apiUrl,

  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // 如果是form-data格式
  // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  // 数据处理方式
  transform: clone(createAxiosTransform(VITE_GLOB_API_URL_PREFIX)),
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: 'message',
    // 接口地址
    apiUrl: VITE_GLOB_API_URL,
    // 接口拼接地址
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    //  是否加入时间戳
    joinTime: true,
    // 忽略重复请求
    ignoreCancelToken: true,
    // 是否携带token
    withToken: true,
    retryRequest: {
      isOpenRetry: true,
      count: 5,
      waitTime: 100,
    },
  },
}

export function createAxios(opt?: Partial<PAxiosRequestConfig>) {
  return new PAxios(
    // 深度合并
    mergeDeepRight(
      DEFAULT_AXIOS_REQUEST_CONFIG,
      opt || {},
    ) as PAxiosRequestConfig,
  );
}

export let request: PAxios = createAxios(DEFAULT_AXIOS_REQUEST_CONFIG) as PAxios;

export function registerAxiosRequest(opt?: Partial<PAxiosRequestConfig>) {
  request = createAxios(opt)
  // console.log('registerAxiosRequest', opt, request)
  return request
}