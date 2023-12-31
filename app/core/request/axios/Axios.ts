/*
 * Copyright Notice:
 * Original code Copyright (c) 2020-present, Vben
 * This code section is based on vue-vben-admin.
 *
 * Modified Code Copyright:
 * Copyright (c) 2023-present EvefyouFE/evef
 * The following are modifications to the original code:
 * - change config type to InternalAxiosRequestConfig
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clone, is } from "ramda";
import axios from 'axios';
import qs from 'qs';
import { ContentTypeEnum, RequestEnum } from '@common/enums/httpEnum';
import { AxiosCanceler } from "./AxiosCanceler";
import { PAxiosRequestConfig, PRequestOptions, Res, UploadFileParams } from "@core/request/axios/typing";

/**
 * @description:  axios module
 */
export class PAxios {
  private axiosInstance: AxiosInstance;

  private readonly config: PAxiosRequestConfig;

  constructor(options: PAxiosRequestConfig) {
    this.config = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: PAxiosRequestConfig): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform() {
    const { transform } = this.config;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: PAxiosRequestConfig) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: Interceptor configuration 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      const { requestOptions } = config as PAxiosRequestConfig
      const { ignoreCancelToken } = requestOptions ?? {}
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.config.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && is(Function, requestInterceptors)) {
        config = requestInterceptors(config, this.config);
      }
      return config;
    }, undefined);

    // Request interceptor error capture
    requestInterceptorsCatch &&
      is(Function, requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && is(Function, responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      is(Function, responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (error) =>
        responseInterceptorsCatch(this.axiosInstance, {
          ...error,
          config: this.config
        })
      );
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.config.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get<T = any, D = any>(config: AxiosRequestConfig<D>, options?: PRequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any, D = any>(config: AxiosRequestConfig<D>, options?: PRequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any, D = any>(config: AxiosRequestConfig<D>, options?: PRequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any, D = any>(config: AxiosRequestConfig<D>, options?: PRequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request<T = any, D = any>(config: AxiosRequestConfig<D>, options?: PRequestOptions): Promise<T> {
    let conf: PAxiosRequestConfig = clone(config);
    // cancelToken 如果被深拷贝，会导致最外层无法使用cancel方法来取消请求
    if (config.cancelToken) {
      conf.cancelToken = config.cancelToken
    }

    const transform = this.getTransform();

    const { requestOptions } = this.config;

    const opt: PRequestOptions = { ...requestOptions, ...options };

    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};
    if (beforeRequestHook && is(Function, beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Res>>(conf)
        .then((res: AxiosResponse<Res>) => {
          if (transformResponseHook && is(Function, transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && is(Function, requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
