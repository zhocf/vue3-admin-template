import type Preferences from "./types";
import {preferences} from "@zbm/preferences"
import {watchEffect} from "vue";
import {getRgbColor, updateCSSVariables} from "@zbm/utils";

/**
 * 更新主题
 * @param preferences
 */
export function updateCssVariables(preferences: Preferences) {
    const root = document.documentElement;

    //设置主题
    const theme = preferences?.theme ?? {};
    if (Reflect.has(theme, "mode")) {
        let theme = getDarkTheme(preferences.theme.mode)
        root.setAttribute("data-theme", theme)
    }
}

/**
 * 获取主题欧式
 * @param theme
 */
function getDarkTheme(theme: string) {
    if (theme == "auto") {
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDarkMode ? 'dark' : 'light';
    } else {
        return theme
    }
}


export function useElementPlusDesignTokens() {
    watchEffect(() => {
        const variables: Record<string, string> = {
            '--el-color-primary': getRgbColor(preferences.theme.themeColor, 1),
            '--el-color-primary-dark-2': getRgbColor(preferences.theme.themeColor, 0.8),
            "--el-color-primary-light-3": getRgbColor(preferences.theme.themeColor, 0.7),
            "--el-color-primary-light-5": getRgbColor(preferences.theme.themeColor, 0.5),
            "--el-color-primary-light-7": getRgbColor(preferences.theme.themeColor, 0.3),
            "--el-color-primary-light-8": getRgbColor(preferences.theme.themeColor, 0.2),
            "--el-color-primary-light-9": getRgbColor(preferences.theme.themeColor, 0.1),
        }
        updateCSSVariables(variables, "zbm-element_design")
    })
}

