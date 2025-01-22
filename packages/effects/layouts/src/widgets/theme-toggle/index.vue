<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {type ThemeModeType, preferences, updatePreferences} from "@zmin/preferences"


const onChange = () => {
    let value: ThemeModeType = preferences.theme.mode == 'dark' ? 'light' : 'dark'
    updatePreferences({
        theme: {
            mode: value
        }
    })
    document.documentElement.style.setProperty('--x', '0px')
    document.documentElement.style.setProperty('--y', '0px')

    document.startViewTransition(() => {
        document.documentElement.classList.toggle('dark')
    })
}

</script>

<template>
    <div class="theme-icon flex-center" @click="onChange">
        <Icon v-if="preferences.theme.mode == 'light'"
              class="light"
              icon="iconamoon:mode-light-fill"
              width="16px"/>
        <Icon v-else-if="preferences.theme.mode == 'dark'" class="dark"
              icon="iconamoon:mode-dark-fill"
              width="16px"/>
    </div>
</template>

<style lang="scss" scoped>

.theme-icon {
    padding: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    .dark {
        color: rgba(var(--text-1), 0.9);
    }
}


</style>
