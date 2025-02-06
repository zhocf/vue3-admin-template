<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import {computed, inject} from "vue";
import {preferences} from "@zbm/preferences";
import type {MenuProps} from "../type";

let w = 15
const router = useRouter()
const menuOptions = inject<MenuProps>('menuOptions');
/**
 * 是否菜单深色
 */
const isDark = computed(() => {
    return preferences.aside.dark
})

let routerList = computed(() => {
    return router.options.routes.filter(item => {
        if (item.meta && item.meta.hideMenu == true) {
            return false
        }
        return item
    })
})
</script>

<template>
    <div :class="['sidebar-wrapper',isDark ? 'dark':'']">
        <div class="logo-box flex-center">
            <img :src="menuOptions?.logo" alt=""/>
        </div>
        <!--        菜单列表-->
        <ul class="mixed-menu">
            <router-link v-for="item in routerList"
                         :key="item.name"
                         :to="item.path"
                         active-class="mixed-menu_item-active"
                         class="mixed-menu_item  flex-column-center">
                <Icon :icon="(item.meta?.icon || 'icon-[fluent-mdl2--product]') as string" class="menu_icon"/>
                <span class="menu-name">
                {{ item.meta?.menuName || '未填写' }}
            </span>
            </router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-wrapper {
    min-width: var(--slidebar-width);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
    transition: background-color 0.3s;
    background-color: rgba(var(--background-bg));

    .logo-box {
        height: 60px;

        img {
            width: 32px;
        }
    }
}

$itemName: "mixed-menu_item";
.mixed-menu {
    width: 100%;
    flex: 1;
    margin-top: 10px;

    .#{$itemName} {
        padding: 9px 0;
        margin: 4px 8px;
        aspect-ratio: 1;
        cursor: pointer;
        border-radius: 10px;
        color: rgba(var(--text-1), 0.8);
        transition: all 0.2s;
        text-decoration: none;

        .menu_icon {
            font-size: 18px;
            transition: transform 0.2s;
        }

        .menu-name {
            font-size: 13px;
            margin-top: 5px;
        }

        &:hover {
            color: var(--mixed-hover-color);
            background-color: rgba(var(--accent));

            .menu_icon {
                transform: scale(1.2);
            }
        }
    }

    .#{$itemName}-active {
        background-color: rgb(var(--primary)) !important;
        color: white !important;
    }

}
</style>
