<script lang="ts" setup>

</script>

<template>
    <!-- 过渡动画 -->
    <transition name="horizontal-collapse">
        <slot></slot>
    </transition>
</template>

<style lang="scss" scoped>
/* 过渡动画 */
.horizontal-collapse-enter-active,
.horizontal-collapse-leave-active {
    transition: all 0.3s linear;
}

.horizontal-collapse-enter-from,
.horizontal-collapse-leave-to {
    max-width: 0; /* 折叠时宽度为 0 */
    opacity: 0; /* 可选：添加透明度过渡 */
    padding-left: 0;
    padding-right: 0;
}

.horizontal-collapse-enter-to,
.horizontal-collapse-leave-from {
    max-width: 300px; /* 展开时宽度为 300px */
    opacity: 1; /* 可选：添加透明度过渡 */
    padding-left: 10px;
    padding-right: 10px;
}
</style>
