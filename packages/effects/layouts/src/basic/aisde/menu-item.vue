<script lang="ts" setup>
import {computed, type PropType} from "vue";
import {type RouteRawType} from "@zbm/typings";
import {Icon} from "@iconify/vue";

const props = defineProps({
    routeData: {
        type: Object as PropType<RouteRawType>,
        required: true
    },
    basePath: {
        type: String,
        default: "",
    },
})
/**
 * 获取菜单级别
 * sub级别为1，item为2
 */
const menuLevel = computed<number>(() => {
    let {routeData} = props
    if (routeData.children && routeData.children.length > 0) {
        return 1
    }
    return 2
})

/**
 * 获取当前菜单的完整路径
 */
const pathResolve = computed<string>(() => {
    let {routeData, basePath} = props
    if (menuLevel.value == 1 || menuLevel.value == 2) {
        let path = basePath + '/' + routeData?.path
        path = path.replaceAll(/\/\//g, '/')
        return path
    }
    return ''
})
</script>

<template>
    <el-sub-menu v-if="menuLevel == 1"
                 :hide-timeout="0"
                 :index="pathResolve"
                 class="zbm-sub-menu"
                 :show-timeout="0">
        <template #title>
            <Icon v-if="routeData.meta.icon"
                  :icon="routeData.meta.icon"
                  class="menu-icon"/>
            <span class="menu-name">{{ routeData.meta.title }}</span>
        </template>
        <menu-item v-for="item in routeData.children"
                   :key="pathResolve"
                   :base-path="pathResolve"
                   :route-data="item"/>
    </el-sub-menu>

    <router-link v-else-if="menuLevel === 2" :to="pathResolve">
        <el-menu-item :index="pathResolve" class="zbm-menu_item">
            <Icon class="menu-icon" icon="gravity-ui:objects-align-left"/>
            <template #title>
                <span class="menu-name">{{ routeData.meta.title }}</span>
            </template>
        </el-menu-item>
    </router-link>
</template>

<style lang="scss" scoped>
$radius: 10px;
$marginBottom: 5px;

@mixin active {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
}

.zbm-sub-menu {
    &.is-active {
        :deep(.el-sub-menu__title) {
            @include active;
            background-color: transparent;
        }
    }

    :deep(.el-sub-menu__title) {
        border-radius: $radius;
        margin-bottom: $marginBottom;

    }
}

.extra_collapse {
    .zbm-sub-menu.is-active {
        :deep(.el-sub-menu__title) {
            @include active;
        }
    }
}

.zbm-menu_item {
    padding-left: 8px;
    border-radius: $radius;
    margin-bottom: $marginBottom;

    &.is-active {
        @include active;
    }
}

.menu-icon {
    font-size: 18px;
    margin-right: 5px;
}

</style>
