import {RouteRawType} from "@zbm/typings";

const routes: RouteRawType[] = [
    {
        path: "/analytics",
        name: 'analytics',
        component: () => import("@/layout/basic.vue"),
        meta: {
            icon: 'lucide:layout-dashboard',
            menuName: '概览',
            title: '概括',
        },
        children: [
            {
                path: 'test',
                name: 'test1',
                component: () => import("@/views/dashboard/test1.vue"),
                meta: {
                    title: '测试1'
                }
            },
            {
                path: 'test2',
                name: 'test2',
                component: () => import("@/views/dashboard/test2.vue"),
                meta: {
                    title: '测试2'
                }
            }
        ]
    }
]
export default routes
