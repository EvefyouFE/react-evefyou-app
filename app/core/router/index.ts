import { CrRouteOptions, CrRouteConfig, PageModule, generateCrRoutes, getPageModulePaths, MenuTreeList } from "react-evefyou-router"
import { errorBoundary } from './props/errorElement'
import { crumbHandleFn } from './props/handle'
import { wrapComponent } from './props/element'
import { defaultIndexLoader } from './props/loader'
import { RouteObject, RouterProviderProps } from "react-router";
import React from "react"
import { head, keys, last, pipe, split, values } from "ramda"
import { getBaseName } from "../env"
import { createBrowserRouter } from "react-router-dom"

const errorElement = errorBoundary()

const defaultModules = import.meta.glob<PageModule>('/app/core/router/pages/**/$*.{ts,tsx}', { eager: true })
const defaultCrRouteViewConfig: CrRouteConfig = keys(defaultModules).reduce((acc, k) => {
  const name = pipe(
    split('pages/'),
    last,
    split('/'),
    head
  )(k) as string
  const isIndex = name === 'views'
  const comp = defaultModules[k].default
  const element = isIndex ? wrapComponent(comp) : comp
  const options: CrRouteOptions = {
    element: React.createElement(element),
    path: isIndex ? '/' : '/'.concat(name),
    wrapComponent,
    errorElement,
    loader: isIndex ? defaultIndexLoader : undefined,
    handleFn: isIndex ? crumbHandleFn : undefined,
    isIndex
  }
  acc[name as any] = options
  return acc
}, {} as CrRouteConfig)

export function generateRoutes(
  modules?: Record<string, () => Promise<PageModule>>,
  expandConfig = {} as CrRouteConfig,
  includeDefaultPages = true,
): RouteObject[] {
  if (!includeDefaultPages) {
    values(defaultCrRouteViewConfig).forEach(v => v.element = undefined)
  }
  let crRouteViewConfig = {
    ...defaultCrRouteViewConfig,
    ...expandConfig
  } as CrRouteConfig
  // if (isNotNil(expandConfig)) {
  // const sameConfig: CrRouteConfig = pickBy((_, k) => has(k, defaultCrRouteViewConfig), expandConfig)
  // keys(sameConfig).forEach(k => {
  //   const loader = async () => {
  //     await sameConfig[k].loader?.()
  //     return await defaultCrRouteViewConfig[k].loader?.()
  //   }
  //   crRouteViewConfig[k].loader = loader
  // })
  // const otherConfig = omit(keys(sameConfig) as string[], expandConfig)
  // crRouteViewConfig = {
  //   ...defaultCrRouteViewConfig,
  //   ...otherConfig
  // }
  // }
  if (!modules) {
    return keys(crRouteViewConfig).reduce((acc, k) => {
      const {
        path = '/'.concat(k as string),
        ...rest
      } = crRouteViewConfig[k]
      acc.push({
        ...rest,
        path
      })
      return acc
    }, [] as RouteObject[])
  }
  return generateCrRoutes(modules, crRouteViewConfig) as RouteObject[]
}

export const generateRouter = (
  modules?: Record<string, () => Promise<PageModule>>,
  expandConfig = {} as CrRouteConfig,
  includeDefaultPages = true,
): RouterProviderProps['router'] => {
  const routes = generateRoutes(modules, expandConfig, includeDefaultPages)
  return createBrowserRouter(routes, {
    basename: getBaseName()
  })
}

export const getViewPaths = (modules?: Record<string, () => Promise<PageModule>>): string[] => {
  return modules ? getPageModulePaths(modules) : []
}

export type { PageModule, MenuTreeList }