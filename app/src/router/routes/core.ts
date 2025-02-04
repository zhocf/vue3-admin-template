import {RouteRecordRaw} from "vue-router";

const route: RouteRecordRaw[] = [
    {
        path: "/login",
        name: 'login',
        component: () => import("@/layout/login.vue"),
        meta: {
            title: '登录',
            hideMenu: true,
            ignore: true,
        },
    },
    {
        path: '/',
        name: 'root',
        redirect: '/analytics',
        meta: {
            hideMenu: true,
        }
    }
]

export default route
