<script lang="ts" setup>
import {BasicLayout, UserDropDownType} from "@zbm/layouts";
import {computed} from "vue";

const menu = computed<UserDropDownType[]>(() => {
    return [
        {
            title: '测试内容',
            handle: () => {
                console.log('ds')
            }
        }
    ]
})

</script>

<template>
    <basic-layout
        logo="https://admin.taolive.top/img/vite.svg"
        :menu="menu"
        name="测试后台">

    </basic-layout>
</template>

<style lang="scss" scoped>

</style>
