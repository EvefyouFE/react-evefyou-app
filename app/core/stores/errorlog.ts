/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-26 00:03:33
 * @FilePath: \react-evefyou-app\pro\_core\stores\errorlog.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { is } from "ramda";
import { defineRecoilValue } from "react-evefyou-hooks";
import { Nullable } from "react-evefyou-common";
import { atom } from "recoil";
import { AxiosError } from "axios";
import { DEFAULT_PROJECT_CONFIG } from "@config/admin/projectConfig"
import { ErrorTypeEnum } from "@common/enums/exceptionEnum";
import { formatToDateTime } from "react-evefyou-common/utils/date";
// import { formatToDateTime } from "@/utils/dateUtil";

// Lock screen information
export interface LockInfo {
    // Password required
    pwd?: string | undefined;
    // Is it locked?
    isLock?: boolean;
}


// Error-log information
export interface ErrorLogInfo {
    // Type of error
    type: ErrorTypeEnum;
    // Error file
    file?: string;
    // Error name
    name?: string;
    // Error message
    message: string;
    // Error stack
    stack?: string;
    // Error detail
    detail?: string;
    // Error url
    url?: string;
    // Error time
    time?: string;
}

export interface ErrorLogState {
    errorLogInfoList: Nullable<ErrorLogInfo[]>;
    errorLogListCount: number;
}

const DEFAULT_ERROR_LOG_STATE: ErrorLogState = {
    errorLogInfoList: null,
    errorLogListCount: 0,
}

export const errorLogAtom = atom({
    key: 'errorLogAtom',
    default: DEFAULT_ERROR_LOG_STATE
})

export const useErrorLogRecoilState = defineRecoilValue({
    name: 'errorLogState',
    state: DEFAULT_ERROR_LOG_STATE,
    getters: {
        getErrorLogInfoList(state): ErrorLogInfo[] {
            return state.errorLogInfoList || [];
        },
        getErrorLogListCount(state): number {
            return state.errorLogListCount;
        },
    },
    setters: {
        setErrorLogListCount(errorLogListCount: number | ((c: number) => number)): void {
            if (is(Function, errorLogListCount)) {
                this.set(log => {
                    const count = errorLogListCount(log.errorLogListCount)
                    return {
                        ...log,
                        errorLogListCount: count
                    }
                })
            }
            this.setProps({ errorLogListCount: errorLogListCount as number })
        },
        setErrorLogInfoList(errorLogInfoList: ErrorLogInfo[]): void {
            this.setProps({ errorLogInfoList })
        },
    },
    actions: {
        addErrorLogInfo(info: ErrorLogInfo) {
            const item = {
                ...info,
                time: formatToDateTime(new Date()),
            }
            this.setErrorLogInfoList([item, ...(this.errorLogState.errorLogInfoList || [])])
            this.setErrorLogListCount(c => c + 1)
        },

        /**
         * Triggered after ajax request error
         * @param error
         * @returns
         */
        addAjaxErrorInfo(error: AxiosError) {
            const { useErrorHandle } = DEFAULT_PROJECT_CONFIG;
            if (!useErrorHandle) {
                return;
            }
            const errInfo: ErrorLogInfo = {
                message: error.message,
                type: ErrorTypeEnum.AJAX,
            };
            if (error.response) {
                const {
                    config: { url = '', data: params = '', method = 'get', headers = {} } = {},
                    data = {},
                } = error.response;
                errInfo.url = url;
                errInfo.name = 'Ajax Error!';
                errInfo.file = '-';
                errInfo.stack = JSON.stringify(data);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                errInfo.detail = JSON.stringify({ params, method, headers });
            }
            this.addErrorLogInfo(errInfo);
        },
    },
}, errorLogAtom)