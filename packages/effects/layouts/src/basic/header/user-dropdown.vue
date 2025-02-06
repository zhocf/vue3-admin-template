<script lang="ts" setup>
import Avatar from "./avatar.vue";
import Cell from "./cell.vue";
import {ref} from "vue";
import {useUserStore} from "@zbm/stores";
import type {HeaderProps} from "../type";

const userStore = useUserStore()

type Props = Pick<HeaderProps, "menu">
const props = withDefaults(defineProps<Props>(), {
    menu: []
})

//点击后关闭
const popoverRef = ref()
const hidePopover = () => {
    popoverRef.value.hide()
}

/**
 * 退出登陆
 */
const outLogin = () => {

}

</script>

<template>
    <el-popover ref="popoverRef"
                popper-class="info-popover"
                trigger="hover"
                width="250">
        <template #reference>
            <Avatar size="32px"/>
        </template>
        <template #default>
            <div @click="hidePopover">
                <div class="info-cell_group">
                    <div class="info_con flex-align">
                        <Avatar size="45px"/>
                        <div style="margin-left: 10px">
                            <div class="user-name">{{ userStore.name }}</div>
                            <div class="account">{{ userStore.account }}</div>
                        </div>
                    </div>
                </div>
                <div class="info-cell_group">
                    <Cell v-for="item in props.menu"
                          :key="item.title"
                          :handle="outLogin"
                          :icon="item.icon"
                          :title="item.title"/>
                </div>
                <div class="info-cell_group">
                    <Cell :handle="outLogin"
                          icon="lucide:log-in"
                          title="退出登陆"/>
                </div>
            </div>
        </template>
    </el-popover>
</template>

<style lang="scss" scoped>
.info-popover {
    .info_con {
        padding: 15px;

        .user-name {
            font-weight: 700;
            color: rgb(var(--text-1));
        }

        .account {
            color: var(--text-2);
            font-size: 12px;
        }
    }

    .info-cell_group {
        & + .info-cell_group {
            border-top: 1px solid var(--border);
            padding-top: 5px;
            margin-top: 5px;
        }
    }
}
</style>
<style>
.info-popover {
    --el-popover-padding: 0 0 5px 0;
}
</style>
