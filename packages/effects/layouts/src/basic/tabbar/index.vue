<script lang="ts" setup>
import {useTabbarStore} from "@zbm/stores";
import {Icon} from "@iconify/vue";

import {useTabbar} from "./tabbar-hook";
import {ref} from "vue";
import {preferences, updatePreferences} from "@zbm/preferences";

defineOptions({
    name: 'basicTabbar'
})
const tabStore = useTabbarStore()
const {
    currentActive,
    currentTab,
    handleClick,
    handleClose,
    closeOtherTabs,
    handReset
} = useTabbar()

//点击后关闭
const popoverRef = ref()
const hidePopover = () => {
    popoverRef.value.hide()
}

/**
 * 打开新窗口
 */
const newWindow = () => {
    window.open(window.location.href, '_blank');
}
/**
 * 设置tabbar全屏模式
 */
const setTabbarScreen = () => {
    updatePreferences({
        tabbar: {
            screen: !preferences.tabbar.screen
        }
    })
}

</script>

<template>
    <div class="zbm-tabbar flex-between">
        <div class="t-scroll">
            <div class="tabular-list">
                <div v-for="(item) in tabStore.tabs"
                     :key="item.fullPath"
                     :class="{'is-active':currentActive == item.fullPath}"
                     class="t-wrapper">
                    <svg class="round-svg left"
                         viewBox="0 0 7 7">
                        <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z" data-v-f9970ddf=""></path>
                    </svg>
                    <div class="tabular-item flex-center" @click="handleClick(item.fullPath)">
                        <Icon v-if="item.icon" :icon="item.icon" class="icon"/>
                        <div class="tabular-name">{{ item.title }}</div>
                        <Icon v-if="tabStore.tabs.length > 1"
                              class="close"
                              icon="lucide:x"
                              @click.stop="handleClose(item.fullPath)"/>
                    </div>
                    <svg class="round-svg right"
                         viewBox="0 0 7 7">
                        <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z" data-v-f9970ddf=""></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="tabular-set">
            <el-popover ref="popoverRef"
                        popper-class="tabbar-popover"
                        trigger="click"
                        width="140">
                <template #reference>
                    <div class="s-item flex-center">
                        <Icon icon="lucide:chevron-down"/>
                    </div>
                </template>
                <template #default>
                    <div @click="hidePopover">
                        <div :class="{'tabbar-popover_disable':currentTab?.affix || tabStore.tabs.length == 1}"
                             class="tabbar-popover_item flex-align"
                             @click="handleClose(currentActive)">
                            <Icon icon="lucide:x"/>
                            <span>关闭</span>
                        </div>
                        <div class="tabbar-popover_item flex-align" @click="handReset">
                            <Icon icon="lucide:rotate-cw"/>
                            <span>重新加载</span>
                        </div>
                        <div class="tabbar-popover_item flex-align" @click="newWindow">
                            <Icon icon="lucide:external-link"/>
                            <span>在新窗口打开</span>
                        </div>
                        <div class="tabbar-popover_item flex-align" @click="closeOtherTabs">
                            <Icon icon="lucide:fold-horizontal"/>
                            <span>关闭其他标签</span>
                        </div>
                    </div>
                </template>
            </el-popover>

            <div class="s-item flex-center" @click="setTabbarScreen">
                <Icon :icon="preferences.tabbar.screen ? 'lucide:minimize-2' :'lucide:fullscreen'"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.zbm-tabbar {
    height: var(--tababr-height);
    border-bottom: 1px solid var(--border);

    .t-scroll {
        flex: 1 1 0;
        display: flex;
        overflow: hidden;
        align-self: stretch;
    }

    .tabular-list {
        display: flex;
        gap: 2px;
        flex: 1;
        width: 0;
        padding: 4px 10px 0;
        overflow: auto;

        .t-wrapper {
            height: 100%;
            padding-bottom: 4px;
            position: relative;
            --active-color: rgba(var(--primary), 0.15) !important;

            .round-svg {
                position: absolute;
                display: none;
                bottom: 0;
                fill: var(--active-color);
                width: 12px;

                &.left {
                    left: 0;
                    transform: translateX(-100%);
                }

                &.right {
                    right: 0;
                    transform: translateX(100%);
                }
            }

            .tabular-item {
                font-size: 14px;
                padding: 4px 13px;
                white-space: nowrap;
                height: 100%;
                cursor: pointer;
                border-radius: 30px;
                transition: all 0.3s;
                transform: translateY(2px);

                .icon {
                    font-size: 16px;
                    margin-right: 3px;
                }

                .tabular-name {
                    margin-right: 10px;
                }

                .close {
                    font-size: 14px;
                    border-radius: 50%;
                    transition: all 0.2s;

                    &:hover {
                        background-color: rgba(var(--background-deep), 0.8);
                    }
                }
            }

            &:hover:not(.is-active) .tabular-item {
                background-color: rgba(var(--background-deep), 0.4);
            }

            &.is-active {
                position: relative;
                background-color: var(--active-color);
                color: rgb(var(--primary));
                border-radius: 8px 8px 0 0;

                .round-svg {
                    display: block;

                }
            }
        }
    }

    .tabular-set {
        display: flex;
        height: 100%;

        .s-item {
            height: 100%;
            padding: 0 9px;
            border-left: 1px solid var(--border);
            align-self: center;
            cursor: pointer;
            color: var(--text-2);
            font-size: 16px;

            &:hover {
                background-color: rgba(var(--background-deep), 0.3);
            }
        }

    }
}

.tabbar-popover {
    --el-popover-padding: 7px 5px;
    --el-popover-border-radius: 10px;

    .tabbar-popover_item {
        padding: 7px 7px;
        cursor: pointer;
        color: rgba(var(--text-1), 0.8);
        border-radius: var(--base-radius);
        font-size: 14px;

        &:hover {
            background-color: rgba(var(--background-deep), 0.3);
        }

        & + .tabbar-popover_item {
            margin-top: 3px;
        }

        &.tabbar-popover_disable {
            opacity: 0.5;
            cursor: context-menu;
            pointer-events: none;
        }

        svg {
            margin-right: 5px;
        }
    }
}

</style>
