<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {preferences} from "@zbm/preferences";
import {treeFilter} from "@zbm/utils/src/tree";
import MenuItem from "./menu-item.vue";
import type {RouteRawType} from "@zbm/typings";

const route = useRoute()
const router = useRouter()

//父级路由
let parentUrl = ref<string>('')

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
</script>

<template>
    <div class="extra-menu">
        <div class="w-name">
            Zbm Admin
        </div>
        <el-menu class="extra-menu_list">
            <menu-item v-for="(item) in routeMenuList"
                       :key="item.path"
                       :base-path="parentUrl"
                       :route-data="item"/>
        </el-menu>

        <div class="sidebar-footer">
            <div class="s-f_item flex-center">
                <Icon icon="mdi:chevron-double-right" width="20"/>
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

    .w-name {
        height: var(--header-height);
        text-align: center;
        line-height: var(--header-height);
        font-size: 16px;
        font-weight: 700;
        border-bottom: 1px solid var(--border);
    }

    .extra-menu_list {
        flex: 1;
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
}
</style>
