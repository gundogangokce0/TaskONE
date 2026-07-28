/// <reference types="vite/client" />

declare const __dirname: string

declare module 'vite' {
  export function defineConfig(config: any): any
}

declare module '@vitejs/plugin-vue' {
  const vue: any
  export default vue
}

declare module 'path' {
  export function resolve(...args: string[]): string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  export function createApp(rootComponent: any, rootProps?: any): any
  export function ref<T>(value: T): { value: T }
  export function reactive<T extends object>(target: T): T
  export function onMounted(fn: () => void): void
  export function computed<T>(getter: () => T): { readonly value: T }
  export function defineComponent(options: any): any
  export type DefineComponent<P = {}, B = {}, D = {}, C = {}, M = {}> = any
}

declare module 'vue-router' {
  export interface RouteRecordRaw {
    path: string
    name?: string
    component: any
    children?: RouteRecordRaw[]
    redirect?: string
  }
  export function createRouter(options: any): any
  export function createWebHistory(base?: string): any
  export function createWebHashHistory(base?: string): any
}

declare module 'axios' {
  export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: any
  }
  const axios: {
    get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>>
    post<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>>
    put<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>>
    delete<T = any>(url: string, config?: any): Promise<AxiosResponse<T>>
  }
  export default axios
}
