import {RouteRawType} from "@zbm/typings";

const routes: RouteRawType[] = [
    {
        path: "/demo",
        name: 'demo',
        component: () => import("@/layout/basic.vue"),
        meta: {
            icon: 'tabler:presentation',
            menuName: '演示',
            title: "演示"
        },
        children: [
            {
                path: 'test1',
                name: 'test12',
                component: () => import("@/views/dashboard/test1.vue"),
                meta: {
                    title: '测试页面1'
                }
            },
            {
                path: 'test2',
                name: 'test122',
                component: () => import("@/views/dashboard/test2.vue"),
                meta: {
                    title: '测试页面2'
                }
            },
            {
                path: 'test3',
                name: 'test3',
                component: () => import("@/views/dashboard/test2.vue"),
                meta: {
                    title: '测试页面3',
                    ignore: true,
                },
                children: [
                    {
                        path: 'cece',
                        name: 'ceec',
                        component: () => import("@/views/dashboard/test2.vue"),
                        meta: {
                            title: '三级嵌套'
                        }
                    },
                ]
            }
        ]
    }
]
export default routes
