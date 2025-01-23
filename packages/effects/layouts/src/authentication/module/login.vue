<script setup lang="ts">
import {reactive, ref} from "vue";
import {SliderCaptcha} from "@zbm/common-ui"

const emit = defineEmits<{
    submit: [Record<string, string>];
}>();

const formRef = ref()
const formData = reactive({
    account: '',
    password: '',
})
//效验
const isDone = ref<boolean>(false)

// 自定义验证规则
const captchaValidator = (_: any, _1: any, callback: (error?: Error) => void) => {
    if (!isDone.value) {
        callback(new Error("请完成验证码验证"));
    } else {
        callback();
    }
};


const rules = reactive({
    account: [{required: true, message: '请输入用户名'}],
    password: [{required: true, message: '请输入密码'}],
    captcha: [{validator: captchaValidator, trigger: "change"}],
})
//效验完成
const captchaEnd = (value: boolean) => {
    isDone.value = value
    if (value) {
        formRef.value.clearValidate("captcha")
    }
}

//提交
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
                          show-password
                          size="large"/>
            </el-form-item>
            <el-form-item prop="captcha">
                <slider-captcha @end="captchaEnd"/>
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

    .l-title {
        font-weight: 700;
        font-size: 36px;
        margin-bottom: 20px;
    }

    .l-desc {
        color: var(--text-2);
        margin-bottom: 30px;
    }

    .el-form-item {
        margin-bottom: 20px;
    }

    .submit-button {
        width: 100%;
        margin-top: 30px;
    }
}
</style>
