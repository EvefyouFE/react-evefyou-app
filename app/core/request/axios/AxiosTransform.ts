import { ReactNode } from "react";
import { includes, is, isEmpty, isNil, not } from "ramda";
import axios from "axios";
import { MessageHelper } from "react-evefyou-ui/components/MessageHelper";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RequestEnum, ResultEnum } from '@common/enums/httpEnum';
import { getToken } from "@utils/auth";
import { formatRequestDate, joinTimestamp, setObjToUrlParams } from "./AxiosHelper";
import { AxiosRetry } from "./AxiosRetry";
import { PAxiosRequestConfig, PAxiosTransform, PRequestOptions, Res } from "@core/request/axios/typing";
import { Recordable } from "react-evefyou-common";
import enUS from '@/locales/en_US'

export function createAxiosTransform(urlPrefix: string = '', formatById = (id: keyof typeof enUS) => enUS[id]) {
  // 请求之前处理config
  /**
   * @description: 请求拦截器处理
   */
  const beforeRequestHook = (config: AxiosRequestConfig, options: PRequestOptions) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url ?? ''}`;
    }

    if (apiUrl && is(String, apiUrl) && not(includes(apiUrl)(config.url ?? ''))) {
      config.url = `${apiUrl}${config.url ?? ''}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !is(String, data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!is(String, params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = `${(config.url ?? '') + params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else if (!is(String, params)) {
      formatDate && formatRequestDate(params);
      if (
        Reflect.has(config, 'data') &&
        config.data &&
        (Object.keys(config.data).length > 0 || config.data instanceof FormData)
      ) {
        config.data = data;
        config.params = params;
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params;
        config.params = undefined;
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(
          config.url as string,
          { ...config.params, ...config.data },
        );
      }
    } else {
      // 兼容restful风格
      config.url += params;
      config.params = undefined;
    }
    return config;
  }

  const requestInterceptors = (config: InternalAxiosRequestConfig, options: PAxiosRequestConfig) => {
    // 请求之前处理config
    const token = getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  }

  /**
   * @description: 响应拦截器处理
   */
  const responseInterceptors = (res: AxiosResponse<any>) => res

  const transformResponseHook = (res: AxiosResponse<Res>, options: PRequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回

    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(formatById('sys.api.apiRequestFailed'));
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result, message } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      let successMsg = message;

      if (isNil(successMsg) || isEmpty(successMsg)) {
        successMsg = formatById(`sys.api.operationSuccess`);
      }

      if (options.successMessageMode === 'modal') {
        MessageHelper.createSuccessModal({ title: formatById('sys.api.success.tip'), content: successMsg });
      } else if (options.successMessageMode === 'message') {
        MessageHelper.createMessage.success(successMsg);
      }
      return result;
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = formatById('sys.api.timeoutMessage');
        break;
      case ResultEnum.ERROR:
        timeoutMsg = formatById('sys.api.error.msg.500');
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    // errorMessageMode='modal'的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      MessageHelper.createErrorModal({ title: formatById('sys.api.error.tip'), content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      MessageHelper.createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || formatById('sys.api.apiRequestFailed'));
  }


  /**
   * @description: 响应错误处理
   */
  const responseInterceptorsCatch = (axiosInstance: AxiosInstance, error: AxiosError & { config: PAxiosRequestConfig }) => {
    const { code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const err: string = error?.toString?.() ?? '';
    let errMessage: ReactNode = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = formatById('sys.api.apiTimeoutMessage');
      }
      if (err?.includes('Network Error')) {
        errMessage = formatById('sys.api.networkExceptionMsg');
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          MessageHelper.createErrorModal({ title: formatById('sys.api.error.tip'), content: errMessage });
        } else if (errorMessageMode === 'message') {
          MessageHelper.createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as string);
    }

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config?.requestOptions?.retryRequest ?? {};
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  }

  const transform: PAxiosTransform = {
    beforeRequestHook,
    requestInterceptors,
    responseInterceptors,
    transformResponseHook,
    responseInterceptorsCatch
  }
  return transform
}