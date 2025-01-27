<script lang="ts" setup>
interface Props {
    title: string
}

withDefaults(defineProps<Props>(), {
    title: ''
})
</script>

<template>
    <div class="options-module">
        <div class="o_title">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.options-module {
    margin-bottom: 20px;

    .o_title {
        font-weight: 700;
        margin-bottom: 10px;
    }
}
</style>
