import preferencesManager from "./preferences"
import Preferences from "./types";


const preferences: Preferences = preferencesManager.getPreferences.call(preferencesManager);

const initPreferences = preferencesManager.initPreferences.bind(preferencesManager)

const updatePreferences = preferencesManager.updatePreferences.bind(preferencesManager)


export {
    initPreferences,
    updatePreferences,
    preferences
}
export type * from './types';
