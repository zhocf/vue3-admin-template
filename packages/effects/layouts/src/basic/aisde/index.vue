<script lang="ts" setup>
import MixedMenu from "./mixed-menu.vue"
import ExtraMenu from "./extra-menu.vue";
import {preferences} from "@zbm/preferences";
import {CollapseTransition} from "@zbm/common-ui"

defineOptions({
    name: 'basicAside'
})

interface Props {
    logo?: string
}

const props = withDefaults(defineProps<Props>(), {
    logo: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp'
})

</script>

<template>
    <collapse-transition>
        <aside v-show="preferences.aside.hideMenu" class="basic-aside">
            <div v-if="preferences.aside.layout =='twoColumnLayout'" class="sidebar-wrapper">
                <div class="logo-box flex-center">
                    <img :src="props.logo"/>
                </div>
                <mixed-menu/>
            </div>
            <extra-menu/>
        </aside>
    </collapse-transition>
</template>

<style lang="scss" scoped>
.basic-aside {
    display: flex;
    border-right: 1px solid var(--border);
    background-color: rgb(var(--card));
    height: 100%;

    .sidebar-wrapper {
        width: var(--slidebar-width);
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--border);

        .logo-box {
            height: 50px;

            img {
                width: 32px;
            }
        }


    }
}
</style>
