<script setup lang="ts">
import SloganIcon from "./icon/slogan.vue"

interface Props {
    title?: string,
}

const props = withDefaults(defineProps<Props>(), {
    title: '后台管理模版系统'
})

</script>

<template>
    <div class="login-container ">
        <div class="logo-box flex-align">
            <img src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp" class="logo"/>
            <span>Zmin Admin</span>
        </div>
        <div class="left-box ">
            <div class="slogan-wrapper flex-column-center">
                <slogan-icon class="slogan"/>
                <div class="title">{{ props.title }}</div>
            </div>
        </div>
        <div class="right-box flex-center">

            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;

    .logo-box {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 3;

        .logo {
            width: 40px;
        }

        span {
            margin-left: 10px;
            font-weight: 700;
            font-size: 20px;
        }
    }

    .left-box {
        flex: 1 1 0;
        position: relative;
        background-color: var(--main-bg-color);
        padding: 20px;
        overflow: hidden;

        &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: linear-gradient(154deg, #07070915 30%, #006be64d 48%, #07070915 64%);
            filter: blur(100px);
        }

        .slogan-wrapper {
            position: relative;
            z-index: 2;
            height: 100%;

            .slogan {
                width: 40%;
                margin-bottom: 20px;
                animation: float 5s linear infinite;
            }

            .title {
                font-size: 24px;
                color: rgba(var(--foreground), 0.9);
            }
        }

    }

    .right-box {
        width: 35%;
        flex: 0 1 auto;
        background-color: var(--background-bg);
        padding: 40px 32px;
    }
}

@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
