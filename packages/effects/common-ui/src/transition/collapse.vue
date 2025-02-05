<script lang="ts" setup>
import type {RendererElement} from "vue";

interface Prop {
    direction: "horizontal" | "vertical";
}

const props = withDefaults(defineProps<Prop>(), {
    direction: "vertical",
});

// 清空样式
const reset = (el: RendererElement) => {
    el.style.maxWidth = "";
    el.style.maxHeight = "";
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingLeft = el.dataset.oldPaddingLeft;
    el.style.paddingRight = el.dataset.oldPaddingRight;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
};

const beforeEnter = (el: RendererElement) => {
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingLeft = el.style.paddingLeft;
    el.dataset.oldPaddingRight = el.style.paddingRight;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    if (props.direction === "horizontal") {
        if (el.style.width) {
            el.dataset.elExistsWidth = el.style.width;
        }
        el.style.maxWidth = "0";
        el.style.paddingLeft = "0";
        el.style.paddingRight = "0";
    } else {
        if (el.style.height) {
            el.dataset.elExistsHeight = el.style.height;
        }
        el.style.maxHeight = "0";
        el.style.paddingTop = "0";
        el.style.paddingBottom = "0";
    }
};

const enter = (el: RendererElement) => {
    requestAnimationFrame(() => {
        el.dataset.oldOverflow = el.style.overflow;
        if (props.direction === "horizontal") {
            if (el.dataset.elExistsWidth) {
                el.style.maxWidth = el.dataset.elExistsWidth;
            } else if (el.scrollWidth !== 0) {
                el.style.maxWidth = `${el.scrollWidth}px`;
            } else {
                el.style.maxWidth = "0";
            }
            el.style.paddingLeft = el.dataset.oldPaddingLeft;
            el.style.paddingRight = el.dataset.oldPaddingRight;
        } else {
            if (el.dataset.elExistsHeight) {
                el.style.maxHeight = el.dataset.elExistsHeight;
            } else if (el.scrollHeight !== 0) {
                el.style.maxHeight = `${el.scrollHeight}px`;
            } else {
                el.style.maxHeight = "0";
            }
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
        el.style.overflow = "hidden";
    });
};

const afterEnter = (el: RendererElement) => {
    if (props.direction === "horizontal") {
        el.style.maxWidth = "";
    } else {
        el.style.maxHeight = "";
    }
    el.style.overflow = el.dataset.oldOverflow;
};

const beforeLeave = (el: RendererElement) => {
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingLeft = el.style.paddingLeft;
    el.dataset.oldPaddingRight = el.style.paddingRight;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    if (props.direction === "horizontal") {
        el.style.maxWidth = `${el.scrollWidth}px`;
    } else {
        el.style.maxHeight = `${el.scrollHeight}px`;
    }
    el.style.overflow = "hidden";
};

const leave = (el: RendererElement) => {
    if (props.direction === "horizontal") {
        el.style.maxWidth = "0";
        el.style.paddingLeft = "0";
        el.style.paddingRight = "0";
    } else {
        el.style.maxHeight = "0";
        el.style.paddingTop = "0";
        el.style.paddingBottom = "0";
    }
};
</script>

<template>
    <!-- 过渡动画 -->
    <transition
        name="zbm-collapse"
        @enter="enter"
        @leave="leave"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @enter-cancelled="reset"
        @before-leave="beforeLeave"
        @after-leave="reset"
    >
        <slot></slot>
    </transition>
</template>

<style lang="scss" scoped>
/* 过渡动画 */
.zbm-collapse-enter-active,
.zbm-collapse-leave-active {
    transition: all 0.3s ease-in-out !important;
}
</style>
