<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {preferences, updatePreferences} from "@zbm/preferences";
import {treeFilter} from "@zbm/utils";
import MenuItem from "./menu-item.vue";
import type {RouteRawType} from "@zbm/typings";

const route = useRoute()
const router = useRouter()

//父级路由
let parentUrl = ref<string>('')

/**
 * 获取菜单列表
 */
const routeMenuList = computed<RouteRawType[]>(() => {
    let routeList: RouteRawType[] = []
    if (preferences.aside.layout == 'columnLayout') {
        routeList = [...router.options.routes] as RouteRawType[];
        parentUrl.value = ''
    } else if (preferences.aside.layout == 'twoColumnLayout' && route.matched[0]) {
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

const onMenuCollapse = () => {
    updatePreferences({
        aside: {
            collapse: !collapse.value
        }
    })
}

</script>

<template>
    <div :class="{'extra-menu':true,'extra_collapse':collapse}">
        <div class="w-name">
            <span>Zbm Admin</span>
        </div>
        <el-menu :collapse="collapse"
                 :default-active="activeMenu"
                 :hide-timeout="100"
                 :show-timeout="100"
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
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: width 0.3s;
    overflow: hidden;


    .w-name {
        height: var(--header-height);
        text-align: center;
        line-height: var(--header-height);
        font-size: 16px;
        font-weight: 700;
        border-bottom: 1px solid var(--border);
        transition: height 0.3s;
        overflow: hidden;
    }

    .extra-menu_list {
        flex: 1;
        width: 100%;
        padding: 10px;
        border-right: 0;
        --el-menu-base-level-padding: 10px;
        --el-menu-level-padding: 15px;
        --el-menu-item-height: 45px;
        --el-menu-sub-item-height: 45px;
        transition: all 10ms;
    }

    .sidebar-footer {
        padding: 10px;

        .s-f_item {
            cursor: pointer;
            width: 30px;
            aspect-ratio: 1;
            border-radius: 4px;
            background-color: rgba(var(--background-deep), 0.4);
            color: var(--text-2);
            transition: all 0.2s;

            &:hover {
                background-color: rgba(var(--background-deep), 1);
            }
        }
    }

    &.extra_collapse {
        width: 65px;

        .w-name {
            height: 0;
            border-bottom: 0;
        }
    }
}
</style>
