import {defineStore} from "pinia";
import type {RouteRecordRaw} from "vue-router";

interface AccessState {
    /**
     * 登录token
     */
    accessToken: string | null;
    /**
     * 权限码
     */
    accessCodes: string[];
    /**
     * 可访问路由列表
     */
    accessRoute: RouteRecordRaw[]
}


export const useAccessStore = defineStore("zbm-access", {
    state: (): AccessState => ({
        accessToken: '',
        accessCodes: [],
        accessRoute: []
    }),
    actions: {}
})
