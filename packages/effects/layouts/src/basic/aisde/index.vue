<script lang="ts" setup>
import MixedMenu from "./mixed-menu.vue"
import ExtraMenu from "./extra-menu.vue";
import {preferences} from "@zbm/preferences";
import {CollapseTransition} from "@zbm/common-ui"
import {computed} from "vue";

defineOptions({
    name: 'basicAside'
})

/**
 * 菜单模式
 */
const menuLayout = computed(() => {
    return preferences.aside.layout
})


</script>

<template>
    <collapse-transition direction="horizontal">
        <aside v-show="!preferences.aside.hideMenu"
               :class="['basic-aside',menuLayout]">
            <mixed-menu v-if="menuLayout =='mixedLayout'"/>
            <extra-menu/>
        </aside>
    </collapse-transition>
</template>

<style lang="scss">
@use "@zbm/styles/src/theme/dark" as dark;

@mixin menuStyle {
    //样式
    --el-menu-base-level-padding: 10px;
    --el-menu-level-padding: 15px;
    --el-menu-item-height: 45px;
    --el-menu-sub-item-height: 45px;
}

@mixin elMenu {
    --el-menu-text-color: rgba(var(--text-1), 0.8);
    --el-menu-hover-bg-color: rgba(var(--accent));
    --el-menu-bg-color: rgba(var(--background-bg));
    --menu-hover-color: rgba(var(--text-1));
}

.basic-aside {
    display: flex;
    border-right: 1px solid var(--border);
    background-color: rgb(var(--background-bg));
    height: 100%;
    //侧栏mixed菜单宽度
    --slidebar-width: 80px;
    //侧栏菜单menu宽度
    --extra-width: 220px;
    //悬浮字体颜色
    --mixed-hover-color: rgba(var(--primary));
    @include menuStyle;

    .el-menu {
        @include elMenu;
    }

    .sidebar-wrapper.dark {
        --mixed-hover-color: white;
    }

    &.verticalLayout .el-menu {
        --menu-hover-color: rgba(var(--primary));
    }
}


.basic-popper_menu {
    @include menuStyle;

    .el-menu {
        @include elMenu;
    }
}

</style>
