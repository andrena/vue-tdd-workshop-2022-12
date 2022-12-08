<template>
  <tr>
    <td data-testid="name">
      {{ props.customer.firstName }} {{ props.customer.lastName }}
    </td>
    <td data-testid="email">{{ props.customer.emailAddress }}</td>
    <td data-testid="phone">{{ props.customer.phoneNumber }}</td>
    <td data-testid="status">{{ props.customer.status }}</td>
    <td class="button-cell">
      <ButtonWithLoading v-if="isInactive" :handler="sendActivation">
        Send activation
      </ButtonWithLoading>
      <ButtonWithLoading :handler="removeCustomer"> Remove </ButtonWithLoading>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { Customer } from "commons";
import { computed } from "vue";
import ButtonWithLoading from "../../../components/ButtonWithLoading.vue";
import { injectOrThrow } from "../../../services/injectOrThrow";
import {
  CustomerRepository,
  CustomerRepositoryKey,
} from "../../../services/CustomerRepository";

const props = defineProps<{ customer: Customer }>();
const repository = injectOrThrow<CustomerRepository>(CustomerRepositoryKey);

const isInactive = computed(() => props.customer.status === "inactive");

async function sendActivation() {
  await repository.startActivation(props.customer);
}

async function removeCustomer() {
  await repository.delete(props.customer);
}
</script>

<style scoped>
.button-cell {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>
