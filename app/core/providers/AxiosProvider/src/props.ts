import { Res } from "@core/request/axios/typing";
import { AxiosError, AxiosResponse } from "axios";
import { PropsWithChildren } from "react";

export interface AxiosInterceptorProps {
  onResponseInterceptor?: (res: AxiosResponse<Res>) => void;
  onErrorInterceptor?: (error: AxiosError) => void;
  onTimeout?: (res: AxiosResponse<Res>) => void;
  onNotAuthenticated?: (error: AxiosError, message: React.ReactNode) => void;
  onNotAuthorized?: (error: AxiosError, message: React.ReactNode) => void;
  onSystemError?: (error: AxiosError, message: React.ReactNode) => void;
}

export interface AxiosProviderProps extends PropsWithChildren, AxiosInterceptorProps {
}