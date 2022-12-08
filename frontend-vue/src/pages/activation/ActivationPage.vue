<template>
  <LoadingSpinner v-if="!activatedCustomer" />
  <div v-else>
    {{ activatedCustomer.firstName }} {{ activatedCustomer.lastName }} &lt;{{
      activatedCustomer.emailAddress
    }}&gt; is now {{ activatedCustomer.status }}!
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { injectOrThrow } from "../../services/injectOrThrow";
import {
  CustomerRepository,
  CustomerRepositoryKey,
} from "../../services/CustomerRepository";
import type { Customer } from "commons";
import LoadingSpinner from "../../App.vue";

const props = defineProps<{ id: string }>();

const activatedCustomer = ref<Customer | null>(null);
const customerRepository = injectOrThrow<CustomerRepository>(
  CustomerRepositoryKey
);

onBeforeMount(async () => {
  activatedCustomer.value = await customerRepository.completeActivation(props.id);
});
</script>