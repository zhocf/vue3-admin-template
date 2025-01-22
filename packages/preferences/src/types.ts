export type ThemeModeType = 'auto' | 'dark' | 'light'
export interface ThemePreferences {
    /** 当前主题 */
    mode: ThemeModeType
    //主题颜色
    themeColor: string
}

export default interface Preferences {
    //主题配置
    theme: ThemePreferences
}
