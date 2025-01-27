<script lang="ts" setup>
interface Props {
    title: string;
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
    <div class="options-cell">
        <div class="c-label">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.options-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    padding: 5px;
    transition: background 0.3s;

    &:hover {
        background: rgba(var(--background-deep), 0.3);
    }

    .c-label {
        font-size: 14px;
    }
}
</style>
