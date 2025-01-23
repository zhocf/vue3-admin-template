<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import {computed} from "vue";

const router = useRouter()

let routerList = computed(() => {
    return router.options.routes.filter(item => {
        if (item.meta && item.meta.hideMenu == true) {
            return false
        }
        return item
    })
})
console.log(routerList.value)
</script>

<template>
    <ul class="mixed-menu">
        <router-link v-for="item in routerList"
                     :key="item.name"
                     :to="item.path"
                     active-class="mixed-menu_item-active"
                     class="mixed-menu_item  flex-column-center">
            <Icon :icon="(item.meta?.icon || 'ce')" class="menu_icon"/>
            <span class="menu-name">
                {{ item.meta?.menuName || '未填写' }}
            </span>
        </router-link>
    </ul>
</template>

<style lang="scss" scoped>
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
        color: rgb(var(--text-1));
        transition: all 0.2s;
        text-decoration: none;

        .menu_icon {
            font-size: 20px;
            transition: transform 0.2s;
        }

        .menu-name {
            font-size: 13px;
            margin-top: 5px;
        }

        &:hover {
            color: var(--primry);
            background-color: rgb(var(--heavy));

            .menu_icon {
                transform: scale(1.2);
            }
        }
    }

    .#{$itemName}-active {
        background-color: var(--primry) !important;
        color: white !important;
    }

}
</style>
