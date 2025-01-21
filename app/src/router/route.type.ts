import {RouteComponent, RouteRecordRaw} from "vue-router";
/*
    配置单项路由RouteRecordRaw
*/
export type RouteType = {
    // 访问路径
    path: string,
    //组件名称。唯一，
    name: string,
    // 组件
    component: RouteComponent,
    //元信息
    meta: MetaType,
    // 重定向地址，可选
    redirect?: string,
    //是否是首页
    isHome?: boolean,
    //子路由
    children?: RouteType[]
    hideChildren?: boolean, //当只有一个子路由时，是否隐藏子路由
} & RouteRecordRaw


export interface MetaType {
    title: string, //页面标题
    menuName?: string,//菜单名称
    icon?: string,  //icon
    keepAlive?: boolean,  //是否缓存路由。默认不会
    //侧栏是否显示菜单，可选,默认显示,true隐藏
    hideMenu?: boolean,
}
