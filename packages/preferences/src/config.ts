import type Preferences from "./types";

const defaultPreferences: Preferences = {
    theme: {
        mode: 'light',
        themeColor: 'red',
    },
    aside: {
        layout: "twoColumnLayout",
        isDark: false
    }
}
export default defaultPreferences
