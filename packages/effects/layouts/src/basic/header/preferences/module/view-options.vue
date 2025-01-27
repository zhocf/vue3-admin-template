<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {reactive} from "vue";
import Cell from "../widgets/cell.vue";
import Block from "../widgets/block.vue";

const themeList = reactive([
    {
        icon: 'line-md:sunny',
        name: '浅色',
        value: 'light'
    },
    {
        icon: 'line-md:moon-alt-loop',
        name: '深色',
        value: 'dark'
    },
    {
        icon: 'lucide:sun-moon',
        name: '跟随系统',
        value: 'auto'
    }
])
//双向绑定
const modelValue = defineModel<string>({default: 'auto'});
const asideDark = defineModel<boolean>("asideDark")
const appRadius = defineModel<number>("appRadius")
/**
 * 修改主题
 * @param value
 */
const onChangeTheme = (value: any) => {
    modelValue.value = value
}
/**s
 * 设置深色侧栏
 */
const onChangeAsideDark = (value: boolean) => {
    asideDark.value = value
}
/**
 * 设置圆角
 */
const onChangeAppRadius = (value: number) => {
    appRadius.value = value
}

</script>

<template>
    <Block title="主题">
        <div class="theme-list">
            <div v-for="(item,index) in themeList"
                 :key="index"
                 :class="['t_item', 'flex-column-center',modelValue==item.value ? 'active' : '']"
                 @click="onChangeTheme(item.value)">
                <div class="t-con  flex-center">
                    <Icon :icon="item.icon"/>
                </div>
                <div class="t-tip">{{ item.name }}</div>
            </div>
        </div>
    </Block>
    <Block title="圆角">
        <div class="radius-list">
            <div v-for="item in [0,0.25,0.5,0.75,1]"
                 :key="item"
                 :class="{'r-item':true,'active':appRadius == item}"
                 @click="onChangeAppRadius(item)">
                {{ item }}
            </div>
        </div>
    </Block>

    <Cell title="深色侧栏">
        <el-switch v-model="asideDark"
                   :active-value="true"
                   :inactive-value="false"
                   @change="onChangeAsideDark"/>
    </Cell>
</template>

<style lang="scss" scoped>
.t-con {
    padding: 15px;
    font-size: 25px;
}

.theme-list {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(3, 1fr);

    .active {
        .t-con:before {
            transform: scale(1);
        }
    }

    .t_item {
        cursor: pointer;
        position: relative;

        &:hover {
            @extend .active;
        }
    }

    .t-con {
        width: 100%;
        border: 1px solid var(--border);
        border-radius: 6px;
        position: relative;

        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: 1px solid rgb(var(--primary));
            border-radius: inherit;
            transform: scale(0);
            transition: all 0.3s;
        }
    }

    .t-tip {
        font-size: 12px;
        margin-top: 5px;
        color: var(--text-2);
    }
}

.radius-list {
    gap: 10px;
    display: flex;

    .r-item {
        flex: 1;
        border: 1px solid var(--border);
        text-align: center;
        border-radius: var(--base-radius);
        padding: 5px 0;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background-color: rgb(var(--background-deep), 0.3);
        }
    }

    .active {
        background-color: rgb(var(--primary)) !important;
        color: white;
    }
}
</style>
