<script lang="ts" setup>
import Block from "../widgets/block.vue";
import {type Component, markRaw, reactive} from "vue";
import {VerticalLayout, MixedLayout, HorizontalLayout} from "../icons/index";
import {FullLayout} from "../icons";
import type {AsideLayoutType} from "@zbm/preferences";

const moduleValue = defineModel<AsideLayoutType>({default: 'horizontalLayout'})

interface LayoutItem {
    name: string,
    type: AsideLayoutType,
    icon: Component
}

const layoutList = reactive<LayoutItem[]>([
    {
        name: '垂直',
        type: 'verticalLayout',
        icon: markRaw(VerticalLayout),
    },
    {
        name: '双列菜单',
        type: 'mixedLayout',
        icon: markRaw(MixedLayout),
    },
    {
        name: '水平',
        type: 'horizontalLayout',
        icon: markRaw(HorizontalLayout),
    },
    {
        name: '内容全屏',
        type: 'fullLayout',
        icon: markRaw(FullLayout),
    }
])

/**
 * 修改布局
 */
const onChangeLayout = (value: AsideLayoutType) => {
    moduleValue.value = value
}

</script>

<template>
    <Block title="布局">
        <div class="layout-list">
            <div v-for="(item,index) in layoutList"
                 :key="index"
                 :class="['l-item', 'flex-column-center',item.type == moduleValue ? 'active' : '']"
                 @click="onChangeLayout(item.type)">
                <div class="l-con  flex-center">
                    <component :is="item.icon"/>
                </div>
                <div class="l-tip">{{ item.name }}</div>
            </div>
        </div>

    </Block>
</template>

<style lang="scss" scoped>
.layout-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    .l-item {
        cursor: pointer;
        position: relative;

        &.active .l-con {
            border-color: rgb(var(--primary));
        }
    }

    .l-con {
        width: 100%;
        border-radius: 5px;
        border: 1px solid var(--border);
        padding: 5px;
        transition: all 0.3s;

        svg {
            width: 100%;
        }
    }

    .l-tip {
        font-size: 12px;
        margin-top: 5px;
        color: var(--text-2);
    }
}
</style>
