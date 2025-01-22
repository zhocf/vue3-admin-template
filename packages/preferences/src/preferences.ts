import Preferences from "./types";
import {markRaw, reactive, readonly, toRaw} from "vue";
import StorageManager from "@zmin/utils/src/storage";
import defaultPreferences from "./config";
import {deepMerge} from "@zmin/utils";


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
        console.log('----------1---------------')
        const merged = deepMerge(defaultPreferences, options)
        this.updatePreferences(merged)
    }

    /**
     * 更新配置
     * @param updates
     */
    updatePreferences(updates: DeepPartial<Preferences>) {
        const merged = deepMerge(markRaw(this.state), updates)
        // 使用 Object.assign 保持原有的响应式对象
        Object.assign(this.state, merged);
        this.savePreferences()
    }

    resetPreferences(value: number) {

    }

    /**
     * 保存配置到本地
     */
    savePreferences() {
        this.cacheStorage.setItem(this.cacheKey, this.state)
    }

    public getPreferences() {
        console.log('----2------------')
        return this.state;
    }

    /**
     * 加载偏好设置
     * @returns {Preferences} 加载的偏好设置
     */
    private loadPreferences(): Preferences {
        console.log('----------0---------------')
        let localPreferences = this.cacheStorage.getItem<Preferences>(this.cacheKey)
        return localPreferences || defaultPreferences
    }
}

const preferencesManager = new PreferencesManager();


export default preferencesManager
