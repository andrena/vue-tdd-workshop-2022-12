<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <h2>Customer List</h2>
    <div class="content">
      <CustomerTable :customers="customerRepository.customers" />
      <AddCustomerForm />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import CustomerTable from "./components/CustomerTable.vue";
import AddCustomerForm from "./components/AddCustomerForm.vue";
import { injectOrThrow } from "../../services/injectOrThrow";
import { CustomerRepositoryKey } from "../../services/CustomerRepository";
import LoadingSpinner from "../../components/LoadingSpinner.vue";

const customerRepository = injectOrThrow(CustomerRepositoryKey);

const loading = ref(true);
onBeforeMount(async () => {
  await customerRepository.init();
  loading.value = false;
});
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
