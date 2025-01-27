<script lang="ts" setup>
import {ZbmDrawer} from "@zbm/common-ui"
import {computed, ref} from "vue";
import type {AsideLayoutType, ThemeModeType} from "@zbm/preferences";
import ViewOptions from "./module/view-options.vue";
import LayoutOptions from "./module/layout-options.vue";

defineOptions({
    name: 'preferencesAlert'
})

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['update:modelValue'])

//接受参数
const theme = defineModel<ThemeModeType>("themeMode")
const asideDark = defineModel<boolean>("asideDark")
const appRadius = defineModel<number>("appRadius")
const asideLayout = defineModel<AsideLayoutType>("asideLayout")

const visibility = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
})

const tabActive = ref<number>(0)

const onTabActive = (value: number) => {
    tabActive.value = value
}

</script>

<template>
    <zbm-drawer v-model="visibility"
                title="偏好设置"
                width="380">
        <div class="tab-list">
            <div :style="{left:tabActive *33.33 +'%'}" class="tab-active"></div>
            <div v-for="(item,index) in ['外观','布局','通用']"
                 :key="index"
                 class="tab-item"
                 @click="onTabActive(index)">
                {{ item }}
            </div>
        </div>
        <!--        外观配置-->
        <div v-show="tabActive == 0" class="preference-wrapper">
            <view-options
                v-model="theme"
                v-model:app-radius="appRadius"
                v-model:aside-dark="asideDark"/>
        </div>
        <!--        布局配置-->
        <div v-show="tabActive ==1" class="preference-wrapper">
            <layout-options v-model="asideLayout"/>
        </div>
    </zbm-drawer>
</template>

<style lang="scss" scoped>
$tabBgColor: rgb(var(--background-deep), 0.5);
.tab-list {
    display: flex;
    background: $tabBgColor;
    border-radius: var(--base-radius);
    color: var(--text-2);
    position: relative;
    margin-bottom: 20px;

    .tab-item {
        flex: 1;
        text-align: center;
        padding: 10px 0;
        cursor: pointer;
        font-size: 14px;
        z-index: 1;
    }

    .tab-active {
        position: absolute;
        height: 100%;
        width: 33.33%;
        top: 0;
        border: 5px solid $tabBgColor;
        background: rgba(var(--background-bg));
        border-radius: var(--base-radius);
        transition: left 0.3s;
    }
}


</style>
