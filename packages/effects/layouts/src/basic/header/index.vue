<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {ThemeToggle} from "@zbm/layouts"
import ColorPicker from "./color-picker.vue";
import {preferences, updatePreferences} from "@zbm/preferences";

defineOptions({
    name: 'basicHeader'
})

const onToggleMenu = () => {
    updatePreferences({
        aside: {
            hideMenu: !preferences.aside.hideMenu
        }
    })
}

</script>

<template>
    <header class="zbm-header flex-align">
        <!--        收缩菜单-->
        <div class="header-btn" @click="onToggleMenu">
            <Icon icon="mingcute:menu-fill"/>
        </div>
        <!--        面包屑-->
        <el-breadcrumb class="zbm-breadcrumb" separator="/">
            <el-breadcrumb-item>
                <div class="breadcrumb-item flex-align">
                    <Icon icon="lucide:layout-dashboard" width="16"/>
                    <span>概括</span>
                </div>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <div class="breadcrumb-item flex-align">
                    <Icon icon="lucide:layout-dashboard" width="16"/>
                    <span>测试</span>
                </div>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <!--      水平模式下-  菜单列表-->
        <div class="vertical-menu">

        </div>
        <div class="header-actions">
            <div class="menu-search flex-align">
                <Icon class="s-icon" icon="uil:search" width="16"/>
                <span class="placeholder">搜索</span>
                <div class="kj">Ctrl K</div>
            </div>
            <div class="header-btn">
                <color-picker/>
            </div>
            <div class="header-btn">
                <Icon icon="lucide:settings"/>
            </div>
            <div class="header-btn">
                <theme-toggle/>
            </div>
            <div class="header-btn">
                <Icon icon="lucide:maximize"/>
            </div>
            <div class="header-btn">
                <Icon icon="mdi:refresh" width="20"/>
            </div>

            <el-popover>
                <template #reference>
                    <div class="avatar">
                        <el-avatar
                            src="https://taolive.top/api/assets/1/acg/原/3637c519cb060a4694e1c1debe0054f2.jpg?size=500"
                            style="width: 100%;height: 100%"/>
                    </div>
                </template>
            </el-popover>
        </div>
    </header>
</template>

<style lang="scss" scoped>
$size: 32px;
.zbm-header {
    height: var(--header-height);
    border-bottom: 1px solid var(--border);
    padding: 0 10px;
    --hover: rgba(var(--background-deep), 0.3);

    .header-btn {
        width: $size;
        height: $size;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
        color: var(--text-2);

        &:hover {
            background-color: var(--hover);
            border-radius: var(--radius-base);
        }
    }

    .zbm-breadcrumb {
        margin-left: 10px;

        .breadcrumb-item {
            span {
                margin-left: 4px;
            }
        }
    }

    .vertical-menu {
        flex: 1;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 5px;

        //菜单搜索
        .menu-search {
            align-self: stretch;
            border-radius: 30px;
            background-color: rgba(var(--background-deep), 0.4);
            padding: 5px 14px;
            cursor: pointer;
            color: rgba(var(--text-1), 0.5);
            margin-right: 20px;

            .placeholder {
                font-size: 12px;
                margin-left: 10px;
            }

            .kj {
                font-size: 12px;
                margin-left: 10px;
                background-color: rgb(var(--card));
                padding: 2px 6px;
                border-radius: 5px;
            }
        }

        .avatar {
            width: $size;
            height: $size;
            border-radius: 50%;
            margin-left: 10px;
            position: relative;
            margin-right: 5px;
            cursor: pointer;

            &:before {
                content: '';
                background-color: #57d188;
                width: 10px;
                aspect-ratio: 1;
                position: absolute;
                border-radius: 50%;
                bottom: 2px;
                right: 0;
                border: 2px solid white;
            }

            &:hover {
                box-shadow: 0 0 0 5px rgba(var(--background-deep), 0.5);
            }
        }
    }

}
</style>
