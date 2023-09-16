import { PageEnum } from "@/common/enums/pageEnum";
import { KeepAliveSetting } from "@config/typing";

export const DEFAULT_KEEP_ALIVE_SETTING: KeepAliveSetting = {
    includes: undefined,
    excludes: undefined,
    includeAll: true,
    active: false,
    maxLen: 10,
    viewPaths: [PageEnum.INDEX, PageEnum.BASE_LOGIN]
}