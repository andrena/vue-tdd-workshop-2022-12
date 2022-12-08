<template>
  <div class="PageHeader">
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script lang="ts" setup>
const title = "TDD Workshop";
</script>

<style scoped>
.PageHeader {
  display: flex;
  justify-content: space-between;
  background-color: cadetblue;
  padding: 0.1rem 1rem;
  align-items: center;
  width: 100%;
}

.title {
  font-weight: 500;
  font-size: 2rem;
}
</style>
