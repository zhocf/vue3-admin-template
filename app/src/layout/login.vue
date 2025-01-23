<script setup lang="ts">
import {LoginLayout, AuthLogin} from "@zbm/layouts"

const submit = (data: any) => {

}

</script>

<template>

    <login-layout>
        <auth-login @submit="submit"/>
    </login-layout>
</template>

<style scoped lang="scss">

</style>
