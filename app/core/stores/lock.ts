import { defineRecoilValue } from "react-evefyou-hooks/defineRecoilValue";
import { atom } from "recoil";
import { Persistent } from "@common/utils/cache/persistent";
import { LOCK_INFO_KEY } from "@common/enums/cacheEnum";
import { Nullable } from "react-evefyou-common";
import { useUserRecoilState } from "./user";

// Lock screen information
export interface LockInfo {
    // Password required
    pwd?: string | undefined;
    // Is it locked?
    isLock?: boolean;
}

interface LockState {
    lockInfo: Nullable<LockInfo>;
}

const DEFAULT_LOCK_STATE: LockState = {
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY)
}

export const lockAtom = atom({
    key: 'lockAtom',
    default: DEFAULT_LOCK_STATE
})

export const useLockRecoilState = defineRecoilValue({
    name: 'lockState',
    state: DEFAULT_LOCK_STATE,
    getters: {
        getLockInfo(state: LockState): Nullable<LockInfo> {
            return state.lockInfo;
        },
    },
    setters: {
        setLockInfo(info: LockInfo) {
            this.set({ lockInfo: info })
            Persistent.setLocal(LOCK_INFO_KEY, info, true);
        },
        resetLockInfo() {
            Persistent.removeLocal(LOCK_INFO_KEY, true);
            this.set({ lockInfo: null })
        },
    },
    useFn: () => {
        const [{ userInfo }, { login }] = useUserRecoilState()
        return {
            login,
            userInfo
        }
    },
    actions: {
        async unLock(password?: string) {
            if (this.lockState.lockInfo?.pwd === password) {
                this.resetLockInfo();
                return true;
            }
            const tryLogin = async () => {
                try {
                    const username = this.userInfo?.username ?? '';
                    const res = await this.login({
                        username,
                        password: password!,
                    }, {
                        goHome: false,
                        mode: 'none',
                    });
                    if (res) {
                        this.resetLockInfo();
                    }
                    return res;
                } catch (error) {
                    return false;
                }
            };
            return tryLogin();
        },
    }
}, lockAtom)
