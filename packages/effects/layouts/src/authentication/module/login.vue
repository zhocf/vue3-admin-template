<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {SliderCaptcha} from "@zmin/common-ui"

const emit = defineEmits<{
    submit: [Record<string, string>];
}>();

const formRef = ref()
const formData = reactive({
    account: '',
    password: ''
})

const rules = reactive({
    account: [{required: true, message: '请输入用户名'}],
    password: [{required: true, message: '请输入密码'}]
})



const onSubmit = () => {
    formRef.value.validate((state: boolean) => {
        if (state) {
            emit("submit", {...formData})
        }
    })
}

</script>

<template>
    <div class="login-wrapper ">
        <div class="l-title">欢迎登录系统</div>
        <div class="l-desc">请输入您的账号信息开始管理项目</div>
        <el-form ref="formRef" :model="formData" :rules="rules">
            <el-form-item prop="account">
                <el-input placeholder="请输入用户名"
                          v-model="formData.account"
                          size="large"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入密码"
                          v-model="formData.password"
                          type="password"
                          size="large"/>
            </el-form-item>
            <el-form-item prop="code">
                <slider-captcha/>
            </el-form-item>
        </el-form>
        <el-button type="primary"
                   class="submit-button"
                   round
                   @click="onSubmit"
                   size="large">
            登录
        </el-button>
    </div>
</template>

<style scoped lang="scss">
.login-wrapper {
    width: 450px;

    .l-title {
        font-weight: 700;
        font-size: 36px;
        margin-bottom: 20px;
    }

    .l-desc {
        color: var(--text-2);
        margin-bottom: 30px;
    }


    .submit-button {
        width: 100%;
        margin-top: 30px;
    }
}
</style>
