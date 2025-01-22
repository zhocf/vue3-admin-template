import preferencesManager from "./preferences"
import type Preferences from "./types";

export type * from './types';

const preferences: Preferences = preferencesManager.getPreferences.call(preferencesManager);

const initPreferences = preferencesManager.initPreferences.bind(preferencesManager)

const updatePreferences = preferencesManager.updatePreferences.bind(preferencesManager)

export {
    initPreferences,
    updatePreferences,
    preferences
}

