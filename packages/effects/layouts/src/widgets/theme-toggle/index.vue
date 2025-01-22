<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {preferences, updatePreferences} from "@zmin/preferences"

const onClick = () => {

}

</script>

<template>
    {{ preferences.theme.mode }}
    <div class="theme-icon flex-center" @click="onClick">
        <!--        <Icon icon="iconamoon:mode-light-fill" width="16px" class="light"/>-->
        <Icon class="dark" icon="iconamoon:mode-dark-fill"/>
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
