
import { createAxiosTransform } from "@/core/request/axios/AxiosTransform";
import { useBaseLocale } from "react-evefyou-common/locale";

export function useAxios(urlPrefix: string = '') {
  const { formatById } = useBaseLocale()
  const transform = createAxiosTransform(urlPrefix, formatById)
  return {
    transform
  }
}