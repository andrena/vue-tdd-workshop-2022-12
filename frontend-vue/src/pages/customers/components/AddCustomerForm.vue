<template>
  <form ref="form" title="Add a Customer">
    <h3>Add a Customer</h3>
    <section>
      <label for="firstName">First name</label>
      <input id="firstName" v-model="customer.firstName" required type="text" />
    </section>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { CustomerUnsaved } from "commons";

function getNewAddress() {
  return { streetAndNumber: "", zipCode: "", city: "", country: "" };
}

function getNewCustomer(): CustomerUnsaved {
  return {
    firstName: "",
    lastName: "",
    addresses: [getNewAddress()],
    emailAddress: "",
    phoneNumber: "",
  };
}

const customer = ref<CustomerUnsaved>(getNewCustomer());
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
</style>
