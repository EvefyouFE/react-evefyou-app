import { useProRecoilValue } from "@/core/stores/pro"
import ConfigProvider, { ConfigProviderProps, ThemeConfig } from "antd/es/config-provider"
import { mergeDeepRight } from "ramda"
import { useMemo } from "react"


export const AppConfigProvider: React.FC<ConfigProviderProps> = ({
  theme,
  children
}) => {
  const [{ designConfig: { themeConfig } }] = useProRecoilValue()
  const themeMemo = useMemo(() => mergeDeepRight(theme ?? {}, themeConfig) as ThemeConfig, [theme, themeConfig])
  return (
    <ConfigProvider theme={themeMemo} >
      {children}
    </ConfigProvider>
  )
}