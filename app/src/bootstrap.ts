import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@zbm/styles"

function install(app: any) {
    app.use(ElementPlus, {
        locale: zhCn,
    })
}

export default {
    install
}
