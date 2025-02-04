import {createRouter, createWebHistory} from "vue-router";

import coreRouter from "./routes/core"
import {RouteRawType} from "@zbm/typings";
import {createRouterGuard} from "./guard";

//动态路由列表
const dynamicRoutes: RouteRawType[] = []
const dynamicRouteFiles = import.meta.glob("@/router/routes/modules/*.ts", {eager: true})

Object.keys(dynamicRouteFiles).forEach(key => {
    const module = (dynamicRouteFiles[key] as any).default
    dynamicRoutes.push(...module)
})

//路由模块
const moduleRoute = [
    ...coreRouter,
    ...dynamicRoutes
]
const router = createRouter({
    history: createWebHistory(),
    routes: moduleRoute
})
/**
 * 路由守卫
 */
// createRouterGuard(router)

export default router
