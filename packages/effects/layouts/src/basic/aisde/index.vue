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
    <collapse-transition direction="horizontal">
        <aside v-show="!preferences.aside.hideMenu"
               :class="{
                    'basic-aside':true,
                    'aside-hide': preferences.aside.hideMenu,
                }">
            <div v-if="preferences.aside.layout =='mixedLayout'"
                 :class="{
                    'sidebar-wrapper':true,
                    'dark':preferences.aside.dark
                }">
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
    background-color: rgb(var(--background-bg));
    height: 100%;

    .sidebar-wrapper {
        min-width: var(--slidebar-width);
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--border);
        transition: background-color 0.3s;
        --aside-color: rgb(var(--text-1));
        --aside-item-hover: rgb(var(--heavy));

        &.dark {
            --aside-color: white;
            background-color: rgba(var(--aside-dark));
            --aside-item-hover: rgb(var(--heavy), 0.2);
        }

        .logo-box {
            height: 50px;

            img {
                width: 32px;
            }
        }

    }
}
</style>
