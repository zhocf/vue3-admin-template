<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {ThemeToggle} from "@zbm/layouts"
import ColorPicker from "./color-picker.vue";
import {preferences, updatePreferences} from "@zbm/preferences";
import PreferencesAlert from "./preferences/index.vue";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {capitalizeFirstLetter} from "@zbm/utils";
import {useTabbarStore} from "@zbm/stores";
import type {HeaderProps} from "../type";
import UserDropdown from "./user-dropdown.vue";

defineOptions({
    name: 'basicHeader'
})

interface BreadCrumbType {
    title: string;
    icon: string;
    path: string;
}

const route = useRoute()
const setShow = ref<boolean>(false)
const tabbarStore = useTabbarStore()


const props = withDefaults(defineProps<HeaderProps>(), {
    menu: []
})

/**
 * 控制菜单显示
 */
const onToggleMenu = () => {
    updatePreferences({
        aside: {
            hideMenu: !preferences.aside.hideMenu
        }
    })
}
/**
 * 屏幕全屏放大
 */
const onScreen = () => {
    let isFullScreen = document.fullscreenElement
    let element = document.documentElement;
    if (isFullScreen) {
        document.exitFullscreen().then()
    } else {
        element.requestFullscreen().then();
    }
}

/**
 * 刷新页面
 */
const onRefreshPage = ((event: Event) => {
    let current = event.currentTarget as HTMLDivElement
    let svg = current.querySelector("svg") as SVGSVGElement
    svg.style.transition = 'all 0.3s'
    svg.style.transform = `rotate(360deg)`
    setTimeout(() => {
        svg.style.removeProperty("transform")
        svg.style.removeProperty("transition")
    }, 300)
    tabbarStore.reloadPage()
})

/**
 * preferences 转成 vue props
 */
const attrs = computed(() => {
    const result: Record<string, any> = {}
    for (const [key, value] of Object.entries(preferences)) {
        for (const [subKey, subValue] of Object.entries(value)) {
            result[`${key}${capitalizeFirstLetter(subKey)}`] = subValue;
        }
    }
    return result
})
/**
 * preferences 转成 vue listener
 */
const listen = computed(() => {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(preferences)) {
        if (typeof value === 'object') {
            for (const subKey of Object.keys(value)) {
                result[`update:${key}${capitalizeFirstLetter(subKey)}`] = (
                    val: any,
                ) => {
                    updatePreferences({[key]: {[subKey]: val}});
                };
            }
        } else {
            result[key] = value;
        }
    }
    return result;
})
/**
 * 获取路由中的面包屑
 */
const getBreadCrumb = computed<BreadCrumbType[]>(() => {
    let matched = route.matched;
    return matched.map(item => {
        const meta = item.meta as any;
        return {
            title: meta?.title,
            icon: meta?.icon || '',
            path: item.path,
        };
    });
});


</script>

<template>
    <header class="zbm-header flex-align">
        <!--        收缩菜单-->
        <div class="header-btn" @click="onToggleMenu">
            <Icon icon="mingcute:menu-fill"/>
        </div>
        <!--        面包屑-->
        <el-breadcrumb class="zbm-breadcrumb" separator="/">
            <el-breadcrumb-item v-for="item in getBreadCrumb"
                                :key="item.path"
                                :to="item.path">
                <div class="breadcrumb-item flex-align">
                    <Icon v-if="item.icon"
                          :icon="item.icon"
                          width="16"/>
                    <span>{{ item.title }}</span>
                </div>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <!--      水平模式下-  菜单列表-->
        <div class="vertical-menu">

        </div>
        <div class="header-actions">
            <div class="menu-search flex-align">
                <Icon class="s-icon" icon="uil:search" width="16"/>
                <span class="placeholder">搜索</span>
                <div class="kj">Ctrl K</div>
            </div>
            <div class="header-btn">
                <color-picker/>
            </div>
            <div class="header-btn" @click="setShow=!setShow">
                <Icon icon="lucide:settings"/>
            </div>
            <div class="header-btn">
                <theme-toggle/>
            </div>
            <div class="header-btn" @click="onScreen">
                <Icon icon="lucide:maximize"/>
            </div>
            <div class="header-btn" @click="onRefreshPage">
                <Icon icon="mdi:refresh" width="20"/>
            </div>
            <slot name="user-dropdown">
                <user-dropdown :menu="props.menu"/>
            </slot>

        </div>
        <preferences-alert v-model="setShow"
                           v-bind="{...attrs}"
                           v-on="{...listen}"/>
    </header>
</template>

<style lang="scss" scoped>
$size: 32px;
.zbm-header {
    height: var(--header-height);
    border-bottom: 1px solid var(--border);
    padding: 0 10px;
    --hover: rgba(var(--background-deep), 0.3);

    .header-btn {
        width: $size;
        height: $size;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
        color: var(--text-2);

        &:hover {
            background-color: var(--hover);
            border-radius: var(--base-radius);
        }
    }

    .zbm-breadcrumb {
        margin-left: 10px;

        :deep(.el-breadcrumb__inner.is-link) {
            font-weight: 500;
            color: var(--text-2);

            &:hover {
                color: rgb(var(--text-1));
            }
        }


        :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
            color: rgb(var(--text-1));
        }

        .breadcrumb-item {
            span {
                margin-left: 4px;
            }
        }
    }

    .vertical-menu {
        flex: 1;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 5px;

        //菜单搜索
        .menu-search {
            align-self: stretch;
            border-radius: 30px;
            background-color: rgba(var(--background-deep), 0.4);
            padding: 5px 14px;
            cursor: pointer;
            color: rgba(var(--text-1), 0.5);
            margin-right: 20px;

            .placeholder {
                font-size: 12px;
                margin-left: 10px;
            }

            .kj {
                font-size: 12px;
                margin-left: 10px;
                background-color: rgb(var(--background-bg));
                padding: 2px 6px;
                border-radius: 5px;
            }
        }

    }

}

</style>
