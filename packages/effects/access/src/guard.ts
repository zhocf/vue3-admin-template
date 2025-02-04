import type {Router} from "vue-router";
import {useAccessStore} from "@zbm/stores";

/**
 * 权限访问守卫配置
 * @param router
 */
export function setupAccessGuard(router: Router) {
    router.beforeEach((to, _, next) => {
        const accessStore = useAccessStore();
        if (accessStore.accessToken) {
            if (to.path == '/login') {
                next("/")
                return
            }
            accessStore.accessCodes = (to.meta.accessBtn || []) as string[]
            next()
        } else if (to.meta.ignore) {
            next()
        } else {
            next("/login")
        }
    })
}

