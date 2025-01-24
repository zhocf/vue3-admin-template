<script lang="ts" setup>
import {ref} from "vue";
import {preferences, updatePreferences} from "@zbm/preferences"
//预定颜色
const predefineColors = ref<string[]>([
    "#4E88F3",
    '#33bda3',
    '#ff8c00',
    '#4E6EF2',
    '#7251c7',
    '#00ced1',
    '#16BAA9',
    '#c71585',
    "#FF2D55"
])

//选中色
const themeColor = ref<string>(preferences.theme.themeColor)

//设置主题颜色
const changeThemeColor = (color?: string) => {
    if (color) {
        themeColor.value = color
        updatePreferences({
            theme: {
                themeColor: color
            }
        })
    }
}
</script>

<template>
    <el-color-picker
        v-model="themeColor"
        :predefine="predefineColors"
        size="small"
        @activeChange="changeThemeColor"/>
</template>

<style lang="scss" scoped>

</style>
