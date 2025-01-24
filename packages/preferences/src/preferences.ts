import type Preferences from "./types";
import {markRaw, reactive} from "vue";
import StorageManager from "@zbm/utils/src/storage";
import defaultPreferences from "./config";
import {deepMerge, setThemeColor} from "@zbm/utils";
import type {DeepPartial} from "@zbm/utils/src/helper";
import {updateCssVariables, useElementPlusDesignTokens} from "./update_theme";


class PreferencesManager {
    private cacheKey = "preferences"
    /*** 缓存管理器 */
    private cacheStorage: StorageManager = new StorageManager("zmin-theme-")
    /*** 状态数据管理器 */
    private state: Preferences = reactive<Preferences>({
        ...this.loadPreferences()
    })

    /**
     * 初始化配置
     */
    initPreferences(options?: DeepPartial<Preferences>) {
        const merged = deepMerge({}, options, markRaw(this.state))
        this.updatePreferences(merged)
        useElementPlusDesignTokens()
    }

    /**
     * 更新配置
     * @param updates
     */
    updatePreferences(updates: DeepPartial<Preferences>) {
        const merged = deepMerge(markRaw(this.state), updates)
        // 使用 Object.assign 保持原有的响应式对象
        Object.assign(this.state, merged);
        updateCssVariables(this.state)
        //更新主题色
        setThemeColor(merged.theme.themeColor)
        this.savePreferences()
    }

    /**
     * 保存配置到本地
     */
    savePreferences() {
        this.cacheStorage.setItem(this.cacheKey, this.state)
    }

    public getPreferences() {
        return this.state;
    }

    /**
     * 加载偏好设置
     * @returns {Preferences} 加载的偏好设置
     */
    private loadPreferences(): Preferences {
        let localPreferences = this.cacheStorage.getItem<Preferences>(this.cacheKey)
        if (localPreferences) {
            return deepMerge({}, defaultPreferences, localPreferences)
        }
        return defaultPreferences
    }
}

const preferencesManager = new PreferencesManager();

export default preferencesManager
