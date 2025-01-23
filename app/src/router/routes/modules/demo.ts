import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/demo",
        name: 'demo',
        component: () => import("@/layout/basic.vue"),
        meta: {
            icon: 'tabler:presentation',
            menuName: '演示'
        },
        children: [
            {
                path: 'test1',
                name: 'test12',
                component: () => import("@/views/dashboard/test1.vue"),
            },
            {
                path: 'test2',
                name: 'test122',
                component: () => import("@/views/dashboard/test2.vue"),
            }
        ]
    }
]
export default routes
