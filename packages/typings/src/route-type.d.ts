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
     * 缓存路由
     * @default false 默认不缓存
     */
    keepAlive?: boolean;
    /**
     * 侧栏隐藏菜单，可选
     * @default false 默认不隐藏
     */
    hideMenu?: boolean;


}
