import { isDevMode } from "../../core/env";

const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

export function warn(message: string) {
  isDevMode() && console.warn(`[${projectName} warn]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`);
}
