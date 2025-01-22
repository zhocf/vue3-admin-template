import type Preferences from "./types";

function updateCssVariables(preferences: Preferences) {
    const root = document.documentElement;

    //设置主题
    const theme = preferences?.theme ?? {};
    if (Reflect.has(theme, "mode")) {
        let theme = getDarkTheme(preferences.theme.mode)
        root.setAttribute("data-theme", theme)
    }
}

function getDarkTheme(theme: string) {
    if (theme == "auto") {
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDarkMode ? 'dark' : 'light';
    } else {
        return theme
    }
}

export default updateCssVariables
