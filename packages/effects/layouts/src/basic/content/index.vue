<script lang="ts" setup>
import {useTabbarStore} from "@zbm/stores";

defineOptions({
    name: "BasicContent"
})
const tabbarStore = useTabbarStore()
</script>

<template>
    <div class="zbm-content">
        <router-view v-slot="{Component,route}">
            <transition mode="out-in" name="fade">
                <component :is="Component" v-if="!tabbarStore.reload" :key="route.name"/>
            </transition>
        </router-view>
    </div>

</template>

<style lang="scss" scoped>
.zbm-content {
    height: calc(100vh - var(--header-height) - var(--tababr-height));
    background: rgb(var(--overlay-content), 0.45);
    overflow-x: hidden;
}

//从左到右消失
.fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

</style>
