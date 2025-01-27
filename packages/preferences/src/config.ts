import type Preferences from "./types";

const defaultPreferences: Preferences = {
    app: {
        radius: 0.25
    },
    theme: {
        mode: 'light',
        themeColor: '#FF2D55',
    },
    aside: {
        layout: "mixedLayout",
        dark: false,
        collapse: false,
        hideMenu: false,
        menuWidth: 220,
        autoActive: true,
    },
}
export default defaultPreferences
