import ElementPlus from "element-plus"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@zbm/styles"
import {initStores} from "@zbm/stores"

function install(app: any) {
    //配置pinia
    initStores(app)

    //配置element
    app.use(ElementPlus, {
        locale: zhCn,
    })

    app.mount('#app');
}

export default {
    install
}
