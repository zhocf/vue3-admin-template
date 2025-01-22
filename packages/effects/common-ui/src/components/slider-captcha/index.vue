<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {computed, ref, useTemplateRef} from "vue";


const emit = defineEmits<{
    (e: 'start'): void;
    (e: 'end', completed: boolean): void;
}>();

//进度条
const sliderValue = ref<number>(0)
const getSliderSize = computed<string>(() => {
    return sliderValue.value + 'px'
})
// 进度条容器 DOM 引用
const sliderRef = useTemplateRef<HTMLElement>("sliderBox");
const barRef = useTemplateRef<HTMLDivElement>("barRef")

let startValue = 0;
//是否拖拽中
const isMove = ref<boolean>(false)
//拖拽完成
const isDone = ref<boolean>(false)


//开始拖拽
const onDragStart = (e: TouchEvent | MouseEvent) => {
    if (!isDone.value) {
        isMove.value = true
        if ("touches" in e) {
            startValue = e.touches[0].clientX
        } else {
            startValue = e.clientX
        }
        emit('start');
    }
}
//拖拽中
const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (isMove.value) {
        const rect = sliderRef.value.getBoundingClientRect();
        const barWidth = barRef.value.getBoundingClientRect().width;
        //最大范围
        let maxValue = rect.width - barWidth
        //值
        let newValue = 0
        if ("touches" in e) {
            newValue = e.touches[0].clientX - startValue
        } else {
            newValue = e.clientX - startValue
        }
        sliderValue.value = Math.max(0, Math.min(newValue, maxValue))
        //效验完成
        if (sliderValue.value == maxValue) {
            isDone.value = true
            emit("end", true)
        }
    }
}
//放开
const onDragEnd = () => {
    if (isMove.value) {
        isMove.value = false
        if (!isDone.value) {
            emit("end", false)
            sliderValue.value = 0
        }
    }
}

</script>

<template>
    <div class="slider-box"
         ref="sliderBox"
         @mousemove="onDragMove"
         @mouseup="onDragEnd"
         @mouseleave="onDragEnd"
         @touchend="onDragEnd"
         @touchmove="onDragMove">
        <div :class="['slider-bg',!isMove ? 'duration' : '']"
             :style="{width:getSliderSize}"/>
        <div
            :class="['slider-bar','flex-center',!isMove ? 'duration' : '']"
            :style="{left:getSliderSize}"
            ref="barRef"
            @mousedown="onDragStart"
            @touchstart="onDragStart">
            <Icon icon="mdi:chevron-double-right" width="20"/>
        </div>

        <div class="slider-tip" :class="{'slider-success':isDone}">
            {{ isDone ? '验证通过' : '请按住滑块拖动' }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.slider-box {
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    background-color: var(--background-deep);
    width: 100%;
    height: 40px;
    position: relative;
    overflow: hidden;
    box-sizing: content-box;

    .slider-bg {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgb(var(--success));
        z-index: 1;

    }

    .slider-bar {
        position: absolute;
        height: 100%;
        aspect-ratio: 1;
        z-index: 3;
        left: 0;
        top: 0;
        background-color: var(--background-bg);
        color: rgba(var(--text-1), 0.5);
        cursor: all-scroll;
    }

    .slider-tip {
        font-size: 12px;
        position: absolute;
        width: fit-content;
        height: fit-content;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
        pointer-events: none;
        user-select: none;
        transition: all 0.3s;
    }

    .duration {
        transition: all 0.3s;
    }

    .slider-success {
        color: white;
    }
}
</style>
