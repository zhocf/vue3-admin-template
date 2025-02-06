<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {useRoute, useRouter} from "vue-router";
import {computed, inject, ref} from "vue";
import {preferences, updatePreferences} from "@zbm/preferences";
import {treeFilter} from "@zbm/utils";
import MenuItem from "./menu-item.vue";
import type {RouteRawType} from "@zbm/typings";
import {CollapseTransition} from "@zbm/common-ui"
import type {MenuProps} from "../type";

const route = useRoute()
const router = useRouter()
const menuOptions = inject<MenuProps>('menuOptions')!;
//父级路由
let parentUrl = ref<string>('')

/**
 * 获取菜单列表
 */
const routeMenuList = computed<RouteRawType[]>(() => {
    let routeList: RouteRawType[] = []
    if (preferences.aside.layout == 'verticalLayout') {
        routeList = [...router.options.routes] as RouteRawType[];
        parentUrl.value = ''
    } else if (preferences.aside.layout == 'mixedLayout' && route.matched[0]) {
        routeList = route.matched[0].children as RouteRawType[]
        parentUrl.value = route.matched[0].path
    }
    routeList = treeFilter(routeList, (item) => item.meta?.hideMenu != true)
    return routeList
})

/**
 * 获取高亮菜单
 */
let activeMenu = computed(() => {
    return route.path
})
/**
 * 获取折叠状态
 */
const collapse = computed(() => {
    return preferences.aside.collapse
})

/**
 * 菜单模式
 */
const menuLayout = computed(() => {
    return preferences.aside.layout
})
/**
 * 隐藏logo全部
 */
const hiddenHead = computed(() => {
    return menuLayout.value == 'mixedLayout' && collapse.value;
})
/**
 * 隐藏logo名称
 */
const hiddenLogoName = computed(() => {
    return menuLayout.value == 'verticalLayout' && collapse.value;
})
/**
 * 是否菜单深色
 */
const isDark = computed(() => {
    return menuLayout.value == 'verticalLayout' && preferences.aside.dark
})
/**
 * 控制收缩
 */
const onMenuCollapse = () => {
    updatePreferences({
        aside: {
            collapse: !collapse.value
        }
    })
}


</script>

<template>
    <div :class="{'extra-menu':true,'extra_collapse':collapse,'dark':isDark}">
        <collapse-transition direction="vertical">
            <div v-show="!hiddenHead">
                <div class="w-name">
                    <img v-if="menuLayout == 'verticalLayout'" :src="menuOptions.logo"/>
                    <span v-show="!hiddenLogoName">{{ menuOptions.name }}</span>
                </div>
            </div>

        </collapse-transition>

        <el-menu :collapse="collapse"
                 :default-active="activeMenu"
                 :hide-timeout="100"
                 :show-timeout="100"
                 :popper-class="[isDark ? 'dark': '','basic-popper_menu'].join(' ')"
                 class="extra-menu_list">
            <menu-item v-for="(item) in routeMenuList"
                       :key="item.path"
                       :base-path="parentUrl"
                       :route-data="item"/>
        </el-menu>

        <div class="sidebar-footer">
            <div class="s-f_item flex-center" @click="onMenuCollapse">
                <Icon :icon="collapse ? 'mdi:chevron-double-right' : 'mdi:chevron-double-left'" width="20"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.extra-menu {
    width: var(--extra-width);
    min-width: var(--extra-width);
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
    overflow: hidden;
    background-color: rgb(var(--background-bg));

    .w-name {
        height: var(--header-height);
        display: flex;
        align-items: center;
        line-height: var(--header-height);
        font-size: 16px;
        font-weight: 700;
        overflow: hidden;
        white-space: nowrap;
        padding: 0 20px;
        color: rgba(var(--text-1));

        img {
            width: 30px;
            margin-right: 5px;
        }
    }

    .extra-menu_list {
        flex: 1;
        width: 100%;
        padding: 10px;
        border-right: 0;
        transition: all 10ms;
    }

    .sidebar-footer {
        padding: 10px;

        .s-f_item {
            cursor: pointer;
            width: 30px;
            aspect-ratio: 1;
            border-radius: 4px;
            background-color: rgba(var(--background-deep), 0.3);
            color: var(--text-2);
            transition: all 0.2s;

            &:hover {
                background-color: rgba(var(--background-deep), 0.7);
            }
        }
    }

    &.extra_collapse {
        --extra-width: 65px;

        .w-name {
            //height: 0;
            border-bottom: 0;
        }
    }
}

</style>
