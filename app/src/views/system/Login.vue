<script setup lang="ts">
import {LoginLayout, AuthLogin} from "@zmin/layouts"

const submit = (data: any) => {
    console.log(data)
}


</script>

<template>

<login-layout>
        <auth-login @submit="submit"/>
    </login-layout>
</template>

<style scoped lang="scss">

</style>
