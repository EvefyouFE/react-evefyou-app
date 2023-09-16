<p align="center">
  <a href="https://ant.design">
    <img width="200" src="">
  </a>
</p>

<h1 align="center">React-Evefyou-App</h1>

<div align="center">

A Universal React18+ App Design library. Like Admin ...

English | [中文](./README-zh_CN.md)

## ✨ Features

- Conventional Routing Page
- Simple and easy-to-use fetch based on react-query
- Based on recoil, store status can be defined in react like pinia
- You can register properties in react instead of assigning them directly
- KeepAlive Router
- Using Windicss and css inject in every component
- Using react-intl to implement internationalization processing
- Using react-evefyou-hooks define inheritable state hooks and support typecript

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

## 🔨 Usage

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

### Conventional Routing Page structure

#### common example

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

#### simple example

```
- views
    $index.ts
    - dashboard
        $index.tsx
    - project
        $index.tsx
        $List.tsx
```

### Fetching data

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
