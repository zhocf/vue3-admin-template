import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/analytics",
        name: 'analytics',
        component: () => import("@/layout/basic.vue"),
        meta: {
            icon: 'lucide:layout-dashboard',
            menuName: '概览'
        },
        children: [
            {
                path: 'test',
                name: 'test1',
                component: () => import("@/views/dashboard/test1.vue"),
            },
            {
                path: 'test2',
                name: 'test2',
                component: () => import("@/views/dashboard/test2.vue"),
            }
        ]
    }
]
export default routes
