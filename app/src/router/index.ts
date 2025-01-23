import {reactive} from "vue";
import {createRouter, createWebHistory} from "vue-router";

import coreRouter from "./routes/core"
import route1 from "./routes/modules/dashboard"
import route2 from "./routes/modules/demo"


const moduleRoute = reactive([
    ...coreRouter,
    ...route1,
    ...route2,
])
console.log(moduleRoute)
const router = createRouter({
    history: createWebHistory(),
    routes: moduleRoute
})

export default router
