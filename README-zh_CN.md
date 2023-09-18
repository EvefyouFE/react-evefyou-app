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

### 约定式路由

```
解析以$为前缀的文件，满足格式即可，可以不是 Vite
```

```
{
  '/src/views/$.ts': () => import('/src/views/$.ts'),
  '/src/views/dashboard/$index.tsx': () => import('/src/views/dashboard/$index.tsx'),
  '/src/views/dashboard/$Other.tsx': () => import('/src/views/dashboard/$Other.tsx'),
}
```

| file       | description                     |
| ---------- | ------------------------------- |
| $.ts       | Layout（nested Outlet if need） |
| $index.ts  | default page                    |
| $other.tsx |                                 |

#### 页面结构

##### 通用例子

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

##### 最简例子

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

### 定义 store state

```
export const DEFAULT_USER_STATE: UserState = {
    token: '',
    userInfo: null,
    isSessionTimeout: false,
    lastUpdateTime: new Date().getTime()
}

export const userAtom = atom<UserState>({
    key: 'userAtom',
    default: DEFAULT_USER_STATE
});

export const useUserRecoilState = defineRecoilValue({
    name: 'userState',
    state: DEFAULT_USER_STATE,
    getters: {
        getToken(state) {
            return state.token
        },
        ...
    },
    setters: {
        setToken(token: string) {
            this.setProps({ token })
        },
        ...
    },
    useFn: () => {
        const loginMutation = mutationLogin.useMutation()
        const navigate = useNavigate()
        const [, { setProps: setAuthProps, refreshAuthAction }] = useAuthRecoilState()
        return {
            loginMutation,
            setAuthProps,
            refreshAuthAction,
            navigate
        }
    },
    actions: {
        async login(
            params: LoginByUsernameReq,
            options?: {
                goHome?: boolean;
                mode?: ErrorMessageMode;
            },
        ): Promise<Nullable<UserInfo>> {
            try {
                const { goHome = true } = options ?? {};
                const { token } = await this.loginMutation.mutateAsync(params);
                this.setToken(token);
                ...
            } catch (error) {
                return Promise.reject(error);
            }
        }
    },
}, userAtom)
```

### 定义 可继承 state hook

```
export const defineActiveItemsState = <
  T extends KeyItem<K>,
  K = T extends KeyItem<infer P> ? P : React.Key,
  N extends string = string,
>(
  name: N = 'activeItemsState' as N
) => {
  const useKeyItemsState = defineKeyItemsState<T, K>()
  return defineUseState({
    name,
    useState: (initialSt?: ActiveItem<T, K>) => useRelationState({
      itemsState: useKeyItemsState(initialSt?.itemsState),
      activeKeyState: useState(initialSt?.activeKeyState)
    }),
    getters: {
      getActiveKey(state: ActiveItem<T, K>) {
        return state.activeKeyState
      },
      ...
    },
    setters: {
      active(key: K) {
        this.activeKeyState.set(key)
      }
      ...
    },
    actions: {
      removeByKey(key: K) {
        ...
      }
      ...
    }
  })
}

export const useTabsContainerItemsState = defineUseState({
  name: 'useTabsContainerItemsState',
  useState: () => useActiveItemsState(),
  getters: {
    getViewTabItems(state) {
      const items = state.itemsState
      if (items.length === 1) {
        items[0].closable = false;
      } else if (items.length > 1) {
        items[0].closable = true;
      }
      return items
    }
  }
})
```
