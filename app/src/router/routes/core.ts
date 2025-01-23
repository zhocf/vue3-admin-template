import {RouteRecordRaw} from "vue-router";

const route: RouteRecordRaw[] = [
    {
        path: "/login",
        name: 'login',
        component: () => import("@/layout/login.vue"),
        meta: {
            title: '登录',
            hideMenu: true,
        },
    },
    // {
    //     path: '/',
    //     name: '/',
    //     component: () => import("@/layout/basic.vue"),
    //     meta: {
    //         hideMenu: true,
    //     }
    // }
]

export default route
