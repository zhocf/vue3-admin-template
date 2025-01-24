import type Preferences from "./types";

const defaultPreferences: Preferences = {
    theme: {
        mode: 'light',
        themeColor: 'red',
    },
    aside: {
        layout: "twoColumnLayout",
        isDark: false,
        collapse: false,
        hideMenu: false,
        menuWidth: 220,
        autoActive: true,
    }
}
export default defaultPreferences
