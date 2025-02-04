import type {App} from "vue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type {Pinia} from "pinia";
import {createPinia} from "pinia";

let pinia: Pinia;
/**
 * 初始化pinia
 */
export function initStores(app: App) {
    pinia = createPinia();
    pinia.use(piniaPluginPersistedstate)
    app.use(pinia)
    return pinia
}
