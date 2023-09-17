<p align="center">
  <a href="https://ant.design">
    <img width="200" src="">
  </a>
</p>

<h1 align="center">React-Evefyou-App</h1>

<div align="left">

简洁容易上手的 react 应用模板设计 UI 库

</div>

中文 | [English](./README.md)

## ✨ 特性

- 只有一个 App 入口，无需设置 router、fetch、store
- React18+ React-router6+
- 约定式路由
- 基于 react-query 的简单易用的 fetch
- 基于 recoil，可以像 pinia 一样在 react 中定义全局管理状态
- 您可以在 react 中注册属性，而不是直接分配它们
- 缓存路由页面
- 使用 Ant Design UI
- 在每个组件中使用 Windicss（TailWind） 和 css 注入
- 使用 react-intl 实现国际化处理
- 使用 react-evefyou-hooks 定义可继承的状态钩子并支持 typecript
- 基于 Vite 生态构建

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
    name={pkg.name}
    author={pkg.author.name}
    env={import.meta.env as unknown as AppImportMetaEnv}
    locales={locales}
    pageModules={import.meta.glob<PageModule>('/src/views/**/$*.{ts,tsx}')}
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
