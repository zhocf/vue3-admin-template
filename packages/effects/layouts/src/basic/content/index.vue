<script lang="ts" setup>
defineOptions({
    name: "BasicContent"
})
</script>

<template>
    <div class="zbm-content">
        <router-view/>
    </div>

</template>

<style lang="scss" scoped>
.zbm-content {
    height: calc(100vh - var(--header-height) - var(--tababr-height));
    background: rgb(var(--overlay-content), 0.45);
}
</style>
