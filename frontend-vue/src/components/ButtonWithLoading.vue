<template>
  <button :disabled="loading" @click="callHandler">
    <LoadingSpinner v-if="loading" class="spinner" />
    <span :class="{ hidden: loading }"><slot></slot></span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const props = defineProps<{
  handler: () => void | Promise<void>;
}>();

const loading = ref(false);

async function callHandler() {
  loading.value = true;
  await props.handler();
  loading.value = false;
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
}

.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
}
</style>
