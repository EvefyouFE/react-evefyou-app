import { ThemeConfig } from "antd";

export const primaryColor = '#0960bd';
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,
    fontSize: 14,
  },
  components: {
    Popover: {
      minWidth: 177 * 3
    }
  }
}