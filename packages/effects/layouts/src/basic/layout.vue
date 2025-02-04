<script lang="ts" setup>
import BasicAside from "./aisde/index.vue"
import BasicHeader from "./header/index.vue";
import BasicTabbar from "./tabbar/index.vue";
import BasicContent from "./content/index.vue";
import {computed, provide} from "vue";
import type {LayoutType} from "@zbm/typings";
import {preferences} from "@zbm/preferences";

const props = withDefaults(defineProps<LayoutType>(), {
    name: 'Zbm Admin',
    logo: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp'
})

/**
 * 判断布局是不是全屏
 */
const IsFull = computed(() => {
    return preferences.aside.layout == 'fullLayout'
})
/**
 * 判断tabbar是不是全屏
 */
const tabbarFull = computed(() => {
    return preferences.tabbar.screen
})

provide("layoutOptions", props)
</script>

<template>
    <div class="zbm-container">
        <basic-aside v-show="!IsFull && !tabbarFull"/>
        <div class="zbm-main">
            <basic-header v-show="!tabbarFull"/>
            <basic-tabbar/>
            <basic-content/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.zbm-container {
    height: 100vh;
    display: flex;

    .zbm-main {
        flex: 1;
    }

}
</style>
