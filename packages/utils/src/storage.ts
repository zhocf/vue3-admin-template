type StorageType = "localStorage" | "sessionStorage"

class StorageManager {
    prefix: string;
    private storage: Storage;

    constructor(pre?: string, storageType: StorageType = "localStorage") {
        this.prefix = pre || ''
        this.storage = storageType === 'localStorage' ? window.localStorage : window.sessionStorage;
    }

    /**
     * 获取缓存中的值
     * @param key 键
     * @param defaultValue
     */
    getItem<T>(key: string, defaultValue?: null | T): T | null {
        key = this.prefix + key
        let value = this.storage.getItem(key)
        if (value) {
            if (!Number.isNaN(Number(value))) {
                return Number(value) as T
            } else {
                try {
                    return JSON.parse(value)
                } catch (e) {
                    return value as T
                }
            }
        }
        return defaultValue
    }

    /**
     * 获取缓存的值
     * @param key  键
     * @param value 储存的值
     */
    setItem(key: string, value: any) {
        key = this.prefix + key
        this.storage.setItem(key, JSON.stringify(value))
    }

    /**
     * 删除键
     * @param key
     */
    removeItem(key: string) {
        key = this.prefix + key
        this.storage.removeItem(key)
    }

    /**
     * 删除开头的所有键
     */
    clear() {
        if (this.prefix) {
            const keysToRemove = [];
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach((key) => this.storage.removeItem(key));
        }
    }
}

export default StorageManager
