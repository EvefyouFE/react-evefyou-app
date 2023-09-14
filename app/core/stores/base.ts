import { AtomEffect, DefaultValue } from 'recoil';
import { useEffect } from "react";
import { MutableSnapshot, useRecoilSnapshot } from "recoil";
import { isDevMode } from "@/core/env";
import { proAtom, DEFAULT_PRO_STATE } from "./pro";

// 定义 key 参数的类型
type LocalStorageKey = string;

// 定义 localStorageEffect 的类型
export const localStorageEffect = <T>(key: LocalStorageKey): AtomEffect<T> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: T, oldValue: T | DefaultValue, isReset: boolean) => {
    console.debug(oldValue)
    if (isReset) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  })
}

export function initializeState({ set }: MutableSnapshot) {
  set(proAtom, DEFAULT_PRO_STATE);
}

export function DebugObserver(): JSX.Element | null {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    isDevMode() && console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      const state = snapshot.getLoadable(node)
      isDevMode() && console.info(node.key, state);
    }
  }, [snapshot]);

  return null;
}