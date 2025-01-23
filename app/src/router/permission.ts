import coreRoutes from "./routes"

/**
 * 动态路由
 */
const dynamicRouteFiles = import.meta.glob("@/router/modules/*.ts", {eager: true})

/**
 * 基本路由列表
 */

export default () => {

}
