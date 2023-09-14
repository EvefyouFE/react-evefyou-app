import { useCallback, useEffect } from "react";
import type { AxiosError, AxiosResponse } from 'axios';
import { ResultEnum } from '@common/enums/httpEnum';
import { useBaseLocale } from "react-evefyou-common/locale";
import { useErrorLogRecoilState } from "@core/stores/errorlog";
import { ErrorMessageMode, Res } from "@core/request/axios/typing";
import { AxiosInterceptorProps } from "../props";
import { MessageHelper } from "react-evefyou-ui/components/MessageHelper";
import { request } from "@/core/request";

export const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({
  onTimeout,
  onNotAuthenticated,
  onNotAuthorized,
  onSystemError,
  onResponseInterceptor,
  onErrorInterceptor
}) => {
  const { formatById } = useBaseLocale()
  const [errorlog, { addAjaxErrorInfo }] = useErrorLogRecoilState()

  const handleResInterceptor = useCallback((res: AxiosResponse<Res>) => {
    if (onResponseInterceptor) {
      onResponseInterceptor?.(res)
      return;
    }
    const { data } = res
    if (!data) return;
    const { code } = data
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    switch (code) {
      case ResultEnum.TIMEOUT:
        onTimeout?.(res)
        break;
      default:
    }
  }, [onResponseInterceptor, onTimeout])

  const handleErrorInterceptor = useCallback((error: any) => {
    if (onResponseInterceptor) {
      onErrorInterceptor?.(error)
      return;
    }
    const { response, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none' as ErrorMessageMode;
    const msg: string = response?.data?.error?.message ?? '';
    const status = response?.status
    let errMessage: React.ReactNode = '';

    switch (status) {
      case 400:
        errMessage = `${msg}`;
        break;
      // 401: Not logged in
      // Jump to the login page if not logged in, and carry the path of the current page
      // Return to the current page after successful login. This step needs to be operated on the login page.
      case 401:
        errMessage = msg || formatById('sys.api.error.msg.401');
        onNotAuthenticated?.(error, errMessage)
        break;
      case 403:
        errMessage = formatById('sys.api.error.msg.403');
        onNotAuthorized?.(error, errMessage)
        break;
      // 404请求不存在
      case 404:
        errMessage = formatById('sys.api.error.msg.404');
        break;
      case 405:
        errMessage = formatById('sys.api.error.msg.405');
        break;
      case 408:
        errMessage = formatById('sys.api.error.msg.408');
        break;
      case 500:
        errMessage = formatById('sys.api.error.msg.500');
        onSystemError?.(error, errMessage)
        break;
      case 501:
        errMessage = formatById('sys.api.error.msg.501');
        break;
      case 502:
        errMessage = formatById('sys.api.error.msg.502');
        break;
      case 503:
        errMessage = formatById('sys.api.error.msg.503');
        break;
      case 504:
        errMessage = formatById('sys.api.error.msg.504');
        break;
      case 505:
        errMessage = formatById('sys.api.error.msg.505');
        break;
      default:
    }

    if (errMessage) {
      if (errorMessageMode === 'modal') {
        MessageHelper.createErrorModal({ title: formatById('sys.api.error.tip'), content: errMessage });
      } else if (errorMessageMode === 'message') {
        MessageHelper.createMessage.error({ content: errMessage, key: `global_error_message_status_${status}` });
      }
    }
  }, [formatById, onErrorInterceptor, onNotAuthenticated, onNotAuthorized, onResponseInterceptor, onSystemError])

  useEffect(() => {
    const errorInterceptor = (error: AxiosError) => {
      addAjaxErrorInfo(error);
      return error;
    }
    const interceptor = request.getAxios().interceptors.response.use((r: AxiosResponse) => r, errorInterceptor)
    return () => request.getAxios().interceptors.response.eject(interceptor)
  }, [addAjaxErrorInfo, errorlog])

  useEffect(() => {
    const resInterceptor = (res: AxiosResponse<Res>) => {
      handleResInterceptor(res)
      return res;
    }
    const errorInterceptor = (error: AxiosError) => {
      handleErrorInterceptor(error)
      return error;
    }
    const interceptor = request.getAxios().interceptors.response.use(resInterceptor, errorInterceptor)
    return () => request.getAxios().interceptors.response.eject(interceptor)
  }, [handleResInterceptor, handleErrorInterceptor])
  return null
}