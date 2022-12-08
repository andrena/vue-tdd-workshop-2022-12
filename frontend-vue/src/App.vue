<template>
  <header>
    <PageHeader />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import PageHeader from "./components/PageHeader.vue";
</script>

<style scoped>
header {
  height: 3rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
}

main {
  padding: 3rem 0;
}
</style>
