import {RouteRecordRaw} from "vue-router";

/**
 * 路由元信息类型
 */
export interface RouteMetaType {
    /**
     * 页面标题
     */
    title: string;
    /**
     * 菜单名称
     */
    menuName?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 菜单激活图标
     */
    activeIcon?: string;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 缓存路由
     * @default false 默认不缓存
     */
    keepAlive?: boolean;
    /**
     * 侧栏隐藏菜单，可选
     * @default false 默认不隐藏
     */
    hideMenu?: boolean;
    /**
     * 是否需要跳过权限效验
     * @default false 默认不跳过效验
     */
    ignore?: boolean;
    /**
     * 页面下的按钮权限
     * @default []
     */
    accessBtn?: string[]
    /**
     * 是否固定标签页
     * @default false
     */
    affixTab?: boolean;
    /**
     * 当前路由在标签页不展现
     * @default false
     */
    hideInTab?: boolean;
}

export type RouteRawType = {
    meta: RouteMetaType,
    children?: RouteRawType[]
} & RouteRecordRaw
