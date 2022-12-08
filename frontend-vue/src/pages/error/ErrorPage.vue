<template>
  <h1>Unhandled Error</h1>
  <pre>{{ errorText }}</pre>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{ error: unknown }>();
const errorText = computed(
  () =>
    (props.error instanceof Error && props.error.stack) || String(props.error)
);
</script>
