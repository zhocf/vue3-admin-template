<script lang="ts" setup>
import {useUserStore} from "@zbm/stores";

interface Props {
    size: number | string,
}

withDefaults(defineProps<Props>(), {
    size: 40,
})
const userStore = useUserStore()
</script>

<template>
    <div class="login_avatar">
        <el-avatar :src="userStore.avatar"
                   style="width: 100%;height: 100%"/>
    </div>
</template>

<style lang="scss" scoped>
.login_avatar {
    width: v-bind(size);
    height: v-bind(size);
    border-radius: 50%;
    position: relative;
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
</style>
