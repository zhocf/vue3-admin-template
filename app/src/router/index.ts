import {reactive} from "vue";
import system from "@/router/modules/system";
import {createRouter, createWebHistory} from "vue-router";

export const moduleRoute = reactive([...system])
const router = createRouter({
    history: createWebHistory(),
    routes: moduleRoute
})

export default router
