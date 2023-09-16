<p align="center">
  <a href="https://ant.design">
    <img width="200" src="">
  </a>
</p>

<h1 align="center">React-Evefyou-App</h1>

<div align="center">

通用 React18+ 应用程序设计库. 比如 管理系统应用 ...

中文 | [English](./README.md)

## ✨ 特性

- 常规路由页面
- 基于 react-query 的简单易用的 fetch
- 基于反冲，可以像 pinia 一样在 react 中定义商店状态
- 您可以在 react 中注册属性，而不是直接分配它们
- 保持活动路由器
- 在每个组件中使用 Windicss 和 css 注入
- 使用 react-intl 实现国际化处理
- 使用 react-evefyou-hooks 定义可继承的状态钩子并支持 typecript

## 📦 Install

```bash
npm install react-evefyou-app
```

```bash
yarn add react-evefyou-app
```

```bash
pnpm add react-evefyou-app
```

## 🔨 使用

```jsx
import { AdminApp, AppImportMetaEnv, PageModule } from "react-evefyou-app";
import 'react-evefyou-app/windicss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AdminApp
    version={pkg.version}
    env={import.meta.env as unknown as AppImportMetaEnv}
    locales={locales}
    pageModules={import.meta.glob<PageModule>('/src/views/**/$*.{ts,tsx}')}
    name="Evefyou Admin"
    author="EvefyouFE"
    recoilDebug
    strictMode
  />
);
```

### 约定式路由页面结构

#### 通用例子

```
- pages
    - login (Already built into the library)
        $.ts
    - views
        $.ts (Already built into the library)
        $index.ts
        - dashboard
            $index.tsx
        - project
            $index.tsx
            $List.tsx
    - other
        $.ts
```

#### 最简例子

```
- views
    $index.ts
    - dashboard
        $index.tsx
    - project
        $index.tsx
        $List.tsx
```

### 请求数据

```
import { queryFetch, queryFetchPage, MenuTreeList, Page } from "react-evefyou-app";
import { Project, ProjectReq } from '@models/project';

enum Api {
    GetProjectList = '/getProjectList',
}

export const queryGetProjectList = queryFetchPage<Page<Project>, ProjectReq>({ url: Api.GetProjectList })

queryGetProjectList.useQuery({
    params,
})
queryGetProjectList.useQueryRes({
    params,
})
queryGetProjectList.fetchQuery({
    params,
})
```
