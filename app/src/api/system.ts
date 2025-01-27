import request from "@/until/request";

//获取动态路由
export function getMenu() {
    return request.get("/admin/common/get_menus")
}
