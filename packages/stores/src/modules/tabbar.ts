import {defineStore} from "pinia";
import type {TabDefinition} from "@zbm/typings"
import {toRaw} from "vue";

interface TabbarType {
    title: string,
    icon: string,
    fullPath: string,
    affix: boolean
}

interface TabbarState {
    /**
     * 当前打开的标签页列表
     */
    tabs: TabbarType[]
    /**
     * 刷新页面
     */
    reload: boolean
}


/**
 * tabbar列表
 */
export const useTabbarStore = defineStore("zbm-tabbar", {
    persist: {
        // 持久化
        pick: ['tabs'],
    },
    state: (): TabbarState => ({
        tabs: [],
        reload: false,
    }),
    actions: {
        /**
         * 初始化标签页
         */
        initTab() {
            if (this.tabs.length == 0) {
                let affix = this.tabs.filter(tab => tab.affix)
                this.tabs = affix
            }
        },
        /**
         * 添加标签页
         * @param routeTab
         */
        addTab(routeTab: TabDefinition) {
            if (!isTabShown(routeTab)) {
                return
            }
            const tabIndex = this.tabs.findIndex(tab => {
                return tab.fullPath === routeTab.fullPath
            })
            if (tabIndex == -1) {
                this.tabs.push({
                    title: routeTab.meta.title,
                    fullPath: routeTab.fullPath,
                    icon: routeTab.meta.icon || '',
                    affix: routeTab.meta.affixTab || false,
                })
            } else {
                let item = toRaw(this.tabs)[tabIndex] as TabbarType
                const mergedTab = {
                    ...item,
                    ...routeTab.meta,
                }
                this.tabs.splice(tabIndex, 1, mergedTab);
            }
        },
        /**
         * 移除标签页
         */
        removeTab(path: string) {
            this.tabs = this.tabs.filter(item => item.fullPath != path)
        },
        /**
         * 刷新页面
         */
        reloadPage() {
            this.reload = true
            setTimeout(() => {
                this.reload = false
            }, 300)
        }
    },
})

/**
 * @zh_CN 是否显示标签
 * @param tab
 */
function isTabShown(tab: TabDefinition) {
    const matched = tab?.matched ?? [];
    return !tab.meta.hideInTab && matched.every((item) => !item.meta.hideInTab);
}
