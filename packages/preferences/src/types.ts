export type ThemeModeType = 'auto' | 'dark' | 'light'

export interface ThemePreferences {
    /** 当前主题 */
    mode: ThemeModeType;
    //主题颜色
    themeColor: string;
}

export type AsideLayoutType = "columnLayout" | "twoColumnLayout"

export interface AsidePreferences {
    /*** 布局模式*/
    layout: AsideLayoutType;
    /*** 是否深色*/
    isDark: boolean;
    /*** 菜单折叠,true折叠 */
    collapse: boolean;
    /*** 菜单隐藏 */
    hideMenu: boolean;
    /*** 菜单宽度 */
    menuWidth: number;
    /*** 自动激活子菜单 */
    autoActive: boolean;

}


export default interface Preferences {
    /**
     * 主题配置
     */
    theme: ThemePreferences
    /**
     * 菜单配置
     */
    aside: AsidePreferences

}
