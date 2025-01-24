<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {type ThemeModeType, preferences, updatePreferences} from "@zbm/preferences"


const onChange = (event: MouseEvent) => {
    let {clientX, clientY} = event
    let value: ThemeModeType = preferences.theme.mode == 'dark' ? 'light' : 'dark'

    let transition = document.startViewTransition(async () => {
        updatePreferences({
            theme: {
                mode: value
            }
        })
    })
    transition.ready.then(() => {
        document.documentElement.animate([
            {clipPath: `circle(0px at ${clientX}px ${clientY}px)`},
            {clipPath: `circle(120% at ${clientX}px ${clientY}px)`}
        ], {
            duration: 500,
            easing: 'ease-in',
            pseudoElement: '::view-transition-new(root)'
        })
    });
}

</script>

<template>
    <div class="theme-icon flex-center" @click="onChange">
        <Icon v-if="preferences.theme.mode == 'dark'"
              class="light"
              icon="line-md:moon-filled-to-sunny-filled-loop-transition"/>
        <Icon v-else-if="preferences.theme.mode == 'light'" class="dark"
              icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition"
        />
    </div>
</template>

<style lang="scss" scoped>

.theme-icon {
    padding: 7px;
    min-width: 30px;
    min-height: 30px;
    cursor: pointer;
    font-size: 20px;

    .dark {
        color: rgba(var(--text-1), 0.9);
    }
}


</style>
