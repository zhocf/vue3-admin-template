import {useRoute, useRouter} from "vue-router";
import {computed, watch} from "vue";
import type {TabDefinition} from "@zbm/typings"
import {useTabbarStore} from "@zbm/stores";

export function useTabbar() {
    const route = useRoute();
    const router = useRouter();
    const tabStore = useTabbarStore()
    //初始化
    tabStore.initTab()
    /**
     * 获取当前路由地址
     */
    const currentActive = computed(() => {
        return route.fullPath;
    });
    /**
     * 获取当前tab信息
     */
    const currentTab = computed(() => {
        return tabStore.tabs.find(tab => tab.fullPath === currentActive.value)
    })

    /**
     * 点击tab，跳转路由
     */
    const handleClick = (path: string) => {
        router.push(path)
    }
    /**
     * 关闭tab标签
     */
    const handleClose = (path: string) => {
        if (tabStore.tabs.length > 1) {
            tabStore.removeTab(path)
            //判断关闭标签是不是当前页
            if (path == currentActive.value) {
                router.replace({
                    path: tabStore.tabs.at(-1)!.fullPath as string
                })
            }
        }
    }
    /**
     * 关闭其他标签
     */
    const closeOtherTabs = () => {
        //获取所有符合条件的标签
        let list = tabStore.tabs.filter(tab => {
            if (tab.affix || tab.fullPath == currentActive.value) {
                return tab
            }
        })
        tabStore.tabs = list
    }

    /**
     * 刷新页面
     */
    const handReset = () => {
        tabStore.reloadPage()
    }

    /**
     * 监听路由变化
     */
    watch(() => route.path, () => {
        const meta = route.matched?.[route.matched.length - 1]?.meta;
        tabStore.addTab(<TabDefinition>{
            ...route,
            meta: meta || route.meta
        })
    }, {immediate: true})


    return {
        currentActive,
        currentTab,
        handleClick,
        handleClose,
        closeOtherTabs,
        handReset
    }
}
