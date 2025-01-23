<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {useRoute} from "vue-router";

const route = useRoute()
console.log(route)
</script>

<template>
    <div class="extra-menu">
        <div class="w-name">
            Zbm Admin
        </div>
        <ul class="extra-menu_list">

        </ul>
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
