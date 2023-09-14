import { CrRouteOptions, CrRouteViewConfig, PageModule } from "react-evefyou-router"
import { errorBoundary } from './props/errorElement'
import { crumbHandleFn } from './props/handle'
import { wrapComponent } from './props/element'
import { HomeLoaderData } from "./props/loader"
import { RouteObject } from "react-router";
export * from 'react-evefyou-router'
export * from './props'
import { generateCrRoutes, generateCrViewsPaths } from "react-evefyou-router"
import React from "react"
import { head, keys, last, pipe, split, values } from "ramda"

const errorElement = errorBoundary()
const defaultModules = import.meta.glob<PageModule>('/app/core/router/pages/**/$*.{ts,tsx}', { eager: true })
const defaultCrRouteViewConfig: CrRouteViewConfig = keys(defaultModules).reduce((acc, k) => {
  const name = pipe(
    split('pages/'),
    last,
    split('/'),
    head
  )(k)
  const isIndex = name === 'views'
  const comp = defaultModules[k].default
  const element = isIndex ? wrapComponent(comp) : comp
  const options: CrRouteOptions = {
    element: React.createElement(element),
    path: '/',
    wrapComponent,
    errorElement,
    handleFn: crumbHandleFn
  }
  acc[name as any] = options
  return acc
}, {} as CrRouteViewConfig)

export function generateRoutes(
  modules: Record<string, () => Promise<PageModule>>,
  loader: () => Promise<HomeLoaderData>,
  expandConfig = {} as CrRouteViewConfig,
  includeDefaultPages = true,
): RouteObject[] {
  defaultCrRouteViewConfig['views'].loader = loader
  if (!includeDefaultPages) {
    values(defaultCrRouteViewConfig).forEach(v => v.element = undefined)
  }
  const crRouteViewConfig = {
    ...defaultCrRouteViewConfig,
    ...expandConfig
  }
  const routes = generateCrRoutes(modules, crRouteViewConfig) as RouteObject[]
  return routes
}

export function getModulePaths(modules: Record<string, () => Promise<PageModule>>): string[] {
  return generateCrViewsPaths(modules)
}