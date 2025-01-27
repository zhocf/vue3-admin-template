<script lang="ts" setup>
import {ref, watch, computed} from "vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    width: {
        type: [String, Number],
        default: '35%'
    },
    modelValue: {
        type: Boolean,
        required: true
    },
    footer: {
        type: Boolean,
        default: false
    },
    footerText: {
        type: String,
        default: '确定'
    },
    options: {
        type: Object
    },
    drawer: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['update:modelValue', "confirm"])

const visible = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
})


let isDisabled = ref(false) //按钮是否禁用

function close() {
    visible.value = false
}

function confirm() {
    isDisabled.value = true
    setTimeout(() => {
        isDisabled.value = false
    }, 4000)
    emit("confirm")
}


watch(() => props.modelValue, (newValue: boolean) => {
    if (newValue) {
        isDisabled.value = false
    }
})
</script>
<template>
    <el-drawer v-model="visible"
               :size="width"
               :title="title"
               :width="width"
               v-bind="{...options}"
               @close="close">
        <template #header>
            <slot name="header"></slot>
        </template>

        <slot></slot>
        <template v-if="footer" #footer>
            <slot name="footer">
                <el-button size="large" @click="close">取消</el-button>
                <el-button :disabled="isDisabled" size="large" type="primary" @click="confirm">
                    {{ footerText }}
                </el-button>
            </slot>
        </template>
    </el-drawer>
</template>

<style lang="scss">
.el-drawer__header {
    border-bottom: 1px solid var(--border);
    padding: 15px 20px;
    margin-bottom: 0;

    .el-drawer__title {
        color: rgb(var(--text-1));

    }
}


//@media screen and (max-width: 1300px) {
//    .el-dialog {
//        width: 50% !important;
//    }
//}
//
//@media screen and (max-width: 1000px) {
//    .el-dialog {
//        .el-col {
//            max-width: 100%;
//            flex: 0 0 100%;
//        }
//    }
//}
//
//@media screen and (max-width: 500px) {
//    .el-dialog {
//        width: 80% !important;
//    }
//}
//
////侧栏
//@media screen and (max-width: 1100px) {
//    .el-drawer {
//        width: 70% !important;
//    }
//}
//
//@media screen and (max-width: 650px) {
//    .el-drawer {
//        width: 90% !important;
//    }
//}
</style>
