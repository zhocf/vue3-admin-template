import {setupAccessGuard} from "@zbm/access";
import {Router} from "vue-router";


/**
 * 项目守卫配置
 */
export function createRouterGuard(router: Router) {
    setupAccessGuard(router)
}
