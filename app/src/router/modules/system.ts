import {RouteType} from "@/router/route.type";

const route: RouteType[] = [
    {
        path: "/login",
        name: 'login',
        component: () => import("@/views/system/Login.vue"),
        meta: {
            title: '登录',
            hideMenu: true,
        },
    },
]

export default route
