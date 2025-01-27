<script lang="ts" setup>
import BasicAside from "./aisde/index.vue"
import BasicHeader from "./header/index.vue";
import BasicTabbar from "./tabbar/index.vue";
import BasicContent from "./content/index.vue";


</script>

<template>
    <div class="zbm-container">
        <basic-aside/>
        <div class="zbm-main">
            <basic-header/>
            <basic-tabbar/>
            <basic-content/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.zbm-container {
    height: 100vh;
    display: flex;

    .zbm-main {
        flex: 1;
    }
}
</style>
