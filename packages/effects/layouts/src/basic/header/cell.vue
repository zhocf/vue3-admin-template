<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import type {UserDropDownType} from "../type";

const props = defineProps<UserDropDownType>()

const handle = () => {
    props.handle()
}
</script>

<template>
    <div class="info-cell flex-align" @click="handle">
        <Icon v-if="props.icon"
              :icon="props.icon"
              class="info-icon"/>
        <span>{{ props.title }}</span>
    </div>
</template>

<style lang="scss" scoped>
.info-cell {
    padding: 10px;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 5px;
    transition: all 0.3s;
    border-radius: 10px;
    color: rgb(var(--text-1));
    font-size: 14px;

    &:hover {
        background-color: rgba(var(--accent), 1);
    }

    & + .info-cell {
        margin-top: 5px;
    }

    .info-icon {
        margin-right: 10px;
    }
}
</style>
